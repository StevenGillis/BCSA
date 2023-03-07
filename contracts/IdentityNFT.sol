pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "hardhat/console.sol";

contract IdentityNFT is ERC721 {
    address public owner;
    address[] public ClaimsManagers;
    
    constructor(
        string memory tokenName,
        string memory tokenSymbol
    ) 
    ERC721(tokenName, tokenSymbol){
        owner = msg.sender;
        console.log("created NFT");
        //Address of creator on hardhat network
        mint(0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266);
    }

    function mint(address _to) public {
        _mint(_to, 1);
        console.log("minded NFT to");
        ClaimsManagers.push(_to);
    }

    function getClaimsManagers() external view returns (address[] memory) {
        return ClaimsManagers;
    }
}