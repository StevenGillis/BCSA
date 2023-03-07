pragma solidity ^0.8.9;

// We import this library to be able to use console.log
import "hardhat/console.sol";

// This is the main building block for smart contracts.
contract Claims {
    // Claims status 1 = submitted-FirstClaim, 2= submitted-ClassAction, 3 = Accepted, 4 = rejected
    //Root cause 0= hack, 1=governance attack, 3=front-end
    //Insurer 1=nexus mutual, 2 InsurAce 3=Ease
    struct Claim {
        uint coverId;
        uint insurerId;
        address coverBuyer;
        uint submissionTime;
        uint status;
    }
    address public owner;

    Claim[] internal Claimslist;

    struct insurerRootCause {
        uint insurerId;
        uint rootCauseId;
        bool covered;
    }

    insurerRootCause[] internal insurerRootCauseList;

    constructor() {
        owner = msg.sender;
        initializeCovers();
        }

    function addClaim(uint coverId, uint insurerId, address coverBuyer) external {
        console.log('reached claims contract');
        // If a claim already exist for the same cover and has been approved
        Claimslist.push(Claim(coverId, insurerId, coverBuyer, block.timestamp, checkIfExists(coverId, insurerId)));
        console.log('pushed claims');
    }

    function checkIfExists(uint coverId, uint insurerId) public view returns (uint) {
        for (uint i = 0; i < Claimslist.length; i++) {
            // If a claim already exist for the same cover and has been approved
            if (Claimslist[i].coverId == coverId && Claimslist[i].status == 3 && Claimslist[i].insurerId==insurerId) {
                return 3;
                } 
                //Reject if another claim from the same insurance provider has been rejected 
                //ToDo: Case where it's the first claim for that specific provider
            if (Claimslist[i].coverId == coverId && Claimslist[i].status == 4 && Claimslist[i].insurerId==insurerId) {
            return 4;
            } 
                //If a claims for the same cover already exists make it class action
            if (Claimslist[i].coverId == coverId) {
                return 2;
                } 
                //If it's the first claim
            }
            return 1;
        }

    function processEvent(uint coverId, uint rootCauseId) public{
        //Check that this is called by the Event contract only 
        for (uint i = 0; i < Claimslist.length; i++) {
            //Approve claim if it's for the same cover ID as the event AND checkIfcovered = true
            if (Claimslist[i].coverId == coverId && checkIfCovered(Claimslist[i].insurerId, rootCauseId)) 
            {
                Claimslist[i].status = 3;
            } if (Claimslist[i].coverId == coverId && !checkIfCovered(Claimslist[i].insurerId, rootCauseId)) 
            {
                Claimslist[i].status = 4;
            }
            //Else error message
        }
    }

    function getClaims() public view returns(Claim[] memory) {
        return Claimslist;
    }

    function getInsurerRootCauseList() public view returns(insurerRootCause[] memory) {
        return insurerRootCauseList;
    }

    //ToDoMake this owner only
    function AddInsurerRootCause(uint insurerId, uint rootCauseId, bool covered) public {
        insurerRootCauseList.push(insurerRootCause(insurerId, rootCauseId, covered));
    }

    function initializeCovers() private {
        AddInsurerRootCause(1,1,true);// Nexus Mutual, hack, true
        AddInsurerRootCause(1,2,true);// Nexus Mutual, Governance, false
        AddInsurerRootCause(1,3,false);// Nexus Mutual, front-end hack, false
        AddInsurerRootCause(2,1,true);// InsurAce, hack, true
        AddInsurerRootCause(2,2,false);// InsurAce, Governance, false
        AddInsurerRootCause(2,3,false);// InsurAce front-end hack, false
        AddInsurerRootCause(3,1,true);// Ease, hack, true
        AddInsurerRootCause(3,3,true);// Ease, Governance, false
        AddInsurerRootCause(3,3,true);// Ease front-end hack, false
    }

    function checkIfCovered(uint insurerId, uint rootCauseId) public view returns (bool){
        for (uint i = 0; i < insurerRootCauseList.length; i++) {
            if ((insurerRootCauseList[i].insurerId == insurerId)&& (insurerRootCauseList[i].rootCauseId==rootCauseId)) {
                return insurerRootCauseList[i].covered; 
            } 
        }
        return false;
    }
}