/*
const { expect } = require("chai");
const { BigNumber } = require("ethers");
const { ethers } = require("hardhat");

describe("Token", function () {
  it("", async function() {
    const [owner, wallet1, wallet2 ] = await ethers.getSigners();
    const Token = await ethers.getContractFactory("GamaCoin", owner);
    const token = await Token.deploy(1000);

    const Sail = await ethers.getContractFactory("GamaSail", owner);
    const sail = await Sail.deploy(token.address);
    const amount = ethers.utils.parseEther("1.0");

    //Transaction
    await token.connect(owner).transfer(sail.address, 1000);

    await sail.connect(wallet1).buyTokens({ value: amount });

    // const newOwnerBalance = await token.balanceOf(owner.address);
    const newWallet1Balance = await wallet1.getBalance();
    
    
    await sail.connect(wallet1).sellTokens(1);
    
    const sailBalance = await wallet1.getBalance();

    console.log(ethers.utils.formatUnits(sailBalance) - ethers.utils.formatUnits(newWallet1Balance));
  });
});
*/