
const path = require("path");

async function main() {
  if (network.name === "hardhat") {
    console.warn(
      "You are trying to deploy a contract to the Hardhat Network, which" +
        "gets automatically created and destroyed every time. Use the Hardhat" +
        " option '--network localhost'"
    );
  }

  // ethers is available in the global scope
  const [deployer] = await ethers.getSigners();
  console.log(
    "Deploying the contracts with the account:",
    await deployer.getAddress()
  );

  console.log("Account balance:", (await deployer.getBalance()).toString());

  const Token = await ethers.getContractFactory("Token");
  const token = await Token.deploy();
  await token.deployed();

  console.log("Token contract address:", token.address);

  const Claims = await ethers.getContractFactory("Claims");
  const claims = await Claims.deploy();
  await claims.deployed();

  console.log("Claims contract address:", claims.address);

  const IdentityNFT = await ethers.getContractFactory("IdentityNFT");
  const identityNFT = await IdentityNFT.deploy("ClaimsmanagerIdentity", "CMI");
  await identityNFT.deployed();

  console.log("Identity NFT:", identityNFT.address);  

  const Events = await ethers.getContractFactory("Events");
  const events = await Events.deploy(claims.address, identityNFT.address);
  await events.deployed();

  console.log("Events contract address:", events.address);

  // We also save the contract's artifacts and address in the frontend directory
  saveFrontendFiles(token, claims, events, identityNFT);
}

function saveFrontendFiles(token, claims, events, identityNFT) {
  const fs = require("fs");
  const contractsDir = path.join(__dirname, "..", "frontend", "src", "contracts");

  if (!fs.existsSync(contractsDir)) {
    fs.mkdirSync(contractsDir);
  }

  fs.writeFileSync(
    path.join(contractsDir, "contract-address.json"),
    JSON.stringify({ 
      Token: token.address,
      Claims: claims.address,
      IdentityNFT: identityNFT.address,
      Events:  events.address
     }, undefined, 2) 
  );

  const TokenArtifact = artifacts.readArtifactSync("Token");
  const ClaimsArtifact = artifacts.readArtifactSync("Claims");
  const EventsArtifact = artifacts.readArtifactSync("Events");
  const IdentityNFTArtifact = artifacts.readArtifactSync("IdentityNFT");

  fs.writeFileSync(
    path.join(contractsDir, "Token.json"),
    JSON.stringify(TokenArtifact, null, 2)
  );

  fs.writeFileSync(
    path.join(contractsDir, "Claims.json"),
    JSON.stringify(ClaimsArtifact, null, 2)
  );

  fs.writeFileSync(
    path.join(contractsDir, "IdentityNFT.json"),
    JSON.stringify(IdentityNFTArtifact, null, 2)
  );

  fs.writeFileSync(
    path.join(contractsDir, "Events.json"),
    JSON.stringify(EventsArtifact, null, 2)
  );
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
