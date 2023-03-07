pragma solidity ^0.8.9;
import "./Claims.sol";
import "./IdentityNFT.sol";

contract Events {
    // Claims status 0 = submitted-FirstClaim, 1 = submitted-ClassAction, 2 = Rejected, 3 = Accepted
    //Root cause 0= hack, 1=governance attack, 3=front-end
    struct Event {
        uint coverId;
        uint lossAmount;
        uint rootCauseId;
    }
    address public owner;
    Claims private claimsContract;
    IdentityNFT private identityNFTContract;

    Event[] internal Eventlist;

    constructor(address _claimsContractAddress, address _identityNFTContractAddress) {
        owner = msg.sender;
        claimsContract = Claims(_claimsContractAddress);
        identityNFTContract = IdentityNFT(_identityNFTContractAddress);
    }

    function addEvent(uint coverId, uint LossAmount, uint rootCauseId) external {
        console.log('reached Event contract');
        require(ownsNFT(msg.sender),"Only claims managers can add an event");
        Eventlist.push(Event(coverId, LossAmount, rootCauseId));
        console.log('Updating claims contract');
        claimsContract.processEvent(coverId, rootCauseId);
    }

    function ownsNFT(address eventCreatorAddress) private view returns (bool) {
        if (identityNFTContract.balanceOf(eventCreatorAddress)>=1) {
            return true;
        } else {
            return false;
        }
    }
    
    function getEvents() public view returns(Event[] memory) {
        return Eventlist;
    }
}