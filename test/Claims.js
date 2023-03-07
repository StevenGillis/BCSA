// We import Chai to use its asserting functions here.
const { expect } = require("chai");

// We use `loadFixture` to share common setups (or fixtures) between tests.
// Using this simplifies your tests and makes them run faster, by taking
// advantage or Hardhat Network's snapshot functionality.
const { loadFixture } = require("@nomicfoundation/hardhat-network-helpers");

describe("Claims contract", function () {
    // We define a fixture to reuse the same setup in every test. We use
    // loadFixture to run this setup once, snapshot that state, and reset Hardhat
    // Network to that snapshot in every test.
    async function deployTokenFixture() {
      // Get the ContractFactory and Signers here.
      const Claims = await ethers.getContractFactory("Claims");
      const [owner, addr1, addr2] = await ethers.getSigners();
  
      // To deploy our contract, we just have to call Token.deploy() and await
      // for it to be deployed(), which happens onces its transaction has been
      // mined.
      const ClaimContract = await Claims.deploy();
  
      await ClaimContract.deployed();
  
      // Fixtures can return anything you consider useful for your tests
      return { Claims, ClaimContract, owner, addr1, addr2 };
    }

    describe("Deployment", function () {
        // `it` is another Mocha function. This is the one you use to define your
        // tests. It receives the test name, and a callback function.
    //
        // If the callback function is async, Mocha will `await` it.
        it("Should set the right owner", async function () {
        // We use loadFixture to setup our environment, and then assert that
        // things went well
        const { ClaimContract, owner } = await loadFixture(deployTokenFixture);

        // Expect receives a value and wraps it in an assertion object. These
        // objects have a lot of utility methods to assert values.

        // This test expects the owner variable stored in the contract to be
        // equal to our Signer's owner.
        expect(await ClaimContract.owner()).to.equal(owner.address);
        })
    });

    describe("Claimsubmission", function () {
        it("Should be able to submit a claim", async function () {
        const { ClaimContract, owner, addr1, addr2 } = await loadFixture(deployTokenFixture);
        console.log('test');
        // Submit a cliam
        await expect(ClaimContract.addClaim(2, addr1))
            console.log(await ClaimContract.getClaims());
            //then.to.equal(123, addr1);
        })
    });
});