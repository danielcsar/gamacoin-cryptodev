const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Token", function () {
  it("", async function() {
    const [owner, wallet1, wallet2 ] = await ethers.getSigners();
    const Token = await ethers.getContractFactory("GamaCoin", owner);
    const token = await Token.deploy(1000);

    const Sail = await ethers.getContractFactory("GamaSail", owner);
    const sail = await Token.deploy(token.address);

    expect().to.equal();

    const setGreetingTx = await greeter.setGreeting("Hola, mundo!");

    // wait until the transaction is mined
    await setGreetingTx.wait();

    expect(await greeter.greet()).to.equal("Hola, mundo!");
  });
});
