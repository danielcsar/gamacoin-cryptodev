const { expect, assert } = require("chai");
const { ethers } = require("hardhat");

describe("GamaSail", async function () {

  it("Get name of the GamaCoin contract", async function() {
    // Instances
    const Token = await ethers.getContractFactory("GamaCoin");
    const token = await Token.deploy(2000);

    // Assertions
    assert.equal(await token.getName(), "GamaCoin");
  }),

  it("Get symbol of the GamaCoin contract", async function() {
    // Instances
    const Token = await ethers.getContractFactory("GamaCoin");
    const token = await Token.deploy(2000);

    // Assertions
    assert.equal(await token.getSymbol(), "GAMA");
  }),

  it("Get decimals of the GamaCoin contract", async function() {
    // Instances
    const Token = await ethers.getContractFactory("GamaCoin");
    const token = await Token.deploy(2000);

    // Assertions
    assert.equal(await token.getDecimals(), 3);
  }),

  it("Should return the correct total supply of the GamaCoin contract", async function() {
    const Token = await ethers.getContractFactory("GamaCoin");
    const token = await Token.deploy(2000);

    const totalSupplyExpected = 2000;
    const totalSupplyResult = await token.getTotalSupply();

    expect(totalSupplyExpected).to.equal(totalSupplyResult);
  });

  it("Should return the correct owner of the GamaCoin contract", async function() {
    const [owner] = await ethers.getSigners();
    const Token = await ethers.getContractFactory("GamaCoin", owner);
    const token = await Token.deploy(2000);

    const ownerExpected = owner.address;
    const ownerResult = await token.getOwner();

    expect(ownerExpected).to.equal(ownerResult);
  });

  it("Should return the correct balance", async function() {
    const [owner, wallet1] = await ethers.getSigners();
    const Token = await ethers.getContractFactory("GamaCoin", owner);
    const token = await Token.deploy(480);

    const ownerBalanceExpected = 480;
    const ownerBalance = await token.balanceOf(owner.address);

    expect(ownerBalanceExpected).to.equal(ownerBalance);

    const wallet1BalanceExpected = 0;
    const wallet1Balance = await token.balanceOf(wallet1.address);

    expect(wallet1BalanceExpected).to.equal(wallet1Balance);
  });

  it("Check Allowance and Aprove of the GamaCoin contract", async function() {
    const [owner, wallet1] = await ethers.getSigners();
    const Token = await ethers.getContractFactory("GamaCoin", owner);
    const token = await Token.deploy(2000);

    const allowanceBefore = await token.allowance(owner.address, wallet1.address);
    
    expect(allowanceBefore).to.equal(0);

    await token.approve(wallet1.address, 10);
    
    const allowanceAfter = await token.allowance(owner.address, wallet1.address);

    expect(allowanceAfter).to.equal(10);
  });

  it("Should transfer the correct value", async function() {
    const [owner, wallet1] = await ethers.getSigners();
    const Token = await ethers.getContractFactory("GamaCoin", owner);
    const token = await Token.deploy(2000);
    await token.deployed();

    const ownerBalanceExpected = 2000;
    const transferedValue = 20;
    
    const ownerBalance = await token.balanceOf(owner.address);

    expect(ownerBalanceExpected).to.equal(ownerBalance);

    const wallet1BalanceExpected = 0;
    const wallet1Balance = await token.balanceOf(wallet1.address);

    expect(wallet1BalanceExpected).to.equal(wallet1Balance);

    //Transaction
    await token.connect(owner).transfer(wallet1.address, transferedValue);

    const newOwnerBalance = await token.balanceOf(owner.address);
    const newWallet1Balance = await token.balanceOf(wallet1.address);

    expect(newOwnerBalance).to.equal(ownerBalanceExpected - transferedValue);
    expect(newWallet1Balance).to.equal(transferedValue);
  }),

  it("Change status of the GamaCoin contract", async function() {
    const [owner] = await ethers.getSigners();
    const Token = await ethers.getContractFactory("GamaCoin", owner);
    const token = await Token.deploy(2000);

    const status0 = await token.getStatus();
    
    expect(status0).to.equal(0);

    await token.connect(owner).changeStatus(1);
    
    const status1 = await token.getStatus();

    expect(status1).to.equal(1);

    await token.connect(owner).changeStatus(2);
    
    const status2 = await token.getStatus();

    expect(status2).to.equal(2);
  });
});