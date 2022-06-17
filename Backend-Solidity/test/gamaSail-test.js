const { expect, assert } = require("chai");
const { ethers } = require("hardhat");

describe("GamaSail", async function () {
  
  it("Get token balance of the GamaSail contract", async function() {
    // Instances
    const Token = await ethers.getContractFactory("GamaCoin");
    const token = await Token.deploy(2000);
    const Sail = await ethers.getContractFactory("GamaSail");
    const sail = await Sail.deploy(token.address);

    // Assertions
    assert.notEqual(await sail.getBalance(), 0);
    assert.equal(await sail.getBalance(), 1000);
  }),

  it("Get total tokens sold by the GamaSail contract", async function() {
    //Instances
    const [owner, wallet1] = await ethers.getSigners();
    const Token = await ethers.getContractFactory("GamaCoin", owner);
    const token = await Token.deploy(2000);
    const Sail = await ethers.getContractFactory("GamaSail", owner);
    const sail = await Sail.deploy(token.address);

    // Assertions
    assert.equal(await sail.getTokensSold(), 0);
    
    // Buying 1 token;
    const amount = ethers.utils.parseEther("1.0");
    await sail.connect(wallet1).buyTokens({ value: amount });

    // Assertions
    assert.equal(await sail.getTokensSold(), 1);
  }),

  it("Get ethers balance of the GamaSail contract", async function() {
    //Instances
    const [owner] = await ethers.getSigners();
    const Token = await ethers.getContractFactory("GamaCoin", owner);
    const token = await Token.deploy(2000);
    const Sail = await ethers.getContractFactory("GamaSail", owner);
    const sail = await Sail.deploy(token.address);
    
    // Assertions
    const zero = ethers.utils.parseEther("0");
    const balanceBefore = await sail.getBalanceEthers();

    expect(balanceBefore).to.be.equals(zero);
    
    // Buying 1 token;
    const amount = ethers.utils.parseEther("1.0");
    await sail.connect(owner).addEthers({ value: amount })

    // Assertions
    const balanceAfter = await sail.getBalanceEthers();
    
    expect(balanceAfter).to.be.equals(amount);
  }),

  it("Getters and Setters TokenPrices", async () => {
    // Instances
    const [owner] = await ethers.getSigners();
    const Token = await ethers.getContractFactory("GamaCoin", owner);
    const token = await Token.deploy(2000);
    const Sail = await ethers.getContractFactory("GamaSail", owner);
    const sail = await Sail.deploy(token.address);

    // Variables
    const oneEther = ethers.utils.parseEther("1.0");
    const twoEthers = ethers.utils.parseEther("2.0");
    const buyPriceBefore = await sail.getTokenBuyPrice();
    const sellPriceBefore = await sail.getTokenSellPrice();

    // Assertions getters
    expect(buyPriceBefore).to.be.equals(oneEther);
    expect(sellPriceBefore).to.be.equals(oneEther);

    // Setting new prices
    await sail.setTokenBuyPrice(twoEthers);
    await sail.setTokenSellPrice(twoEthers);

    // Assertions setters
    const buyPriceAfter = await sail.getTokenBuyPrice();
    const sellPriceAfter = await sail.getTokenSellPrice();
    assert.notEqual(buyPriceBefore, buyPriceAfter);
    assert.notEqual(sellPriceBefore, sellPriceAfter);
  }),

  it("Buying Tokens", async function() {
    //Instances
    const [owner, wallet1] = await ethers.getSigners();
    const Token = await ethers.getContractFactory("GamaCoin", owner);
    const token = await Token.deploy(2000);

    const Sail = await ethers.getContractFactory("GamaSail", owner);
    const sail = await Sail.deploy(token.address);
    
    // Trying to buy with 0 ethers
    expect(sail.connect(wallet1).buyTokens({ value: 0 }))
      .to.be.revertedWith("Only positive values are accepted.");

    // Trying to buy with fewer ethers than the token price
    const amountMinor = ethers.utils.parseEther("0.5");
    expect(sail.connect(wallet1).buyTokens({ value: amountMinor }))
      .to.be.revertedWith("Insuficient amount");

    // Buying with correct value
    const amount = ethers.utils.parseEther("1.0");
    const wallet1Before = await token.connect(owner).balanceOf(wallet1.address);
    await sail.connect(wallet1).buyTokens({ value: amount });
    const wallet1After = await token.connect(owner).balanceOf(wallet1.address);

    // Assertion
    assert.notEqual(wallet1Before, wallet1After);
  }),

  it("Selling Tokens", async function() {
    //Instances
    const [owner, wallet1, wallet2 ] = await ethers.getSigners();
    const Token = await ethers.getContractFactory("GamaCoin", owner);
    const token = await Token.deploy(2000);

    const Sail = await ethers.getContractFactory("GamaSail", owner);
    const sail = await Sail.deploy(token.address);

    const amount = ethers.utils.parseEther("2.0");
    await sail.connect(wallet1).buyTokens({ value: amount });
    await token.connect(owner).transfer(wallet2.address, 10);

    // Trying to Sell with 0 tokens
    expect(sail.connect(wallet2).sellTokens(0))
      .to.be.revertedWith("Only positive values are accepted.");

    // Selling with correct value
    const wallet2Before = await wallet2.getBalance();
    await sail.connect(wallet2).sellTokens(1);
    const wallet2After = await wallet2.getBalance();

    // Assertion
    assert.notEqual(wallet2After, wallet2Before);
  }),
  
  it("Add Ethers in the contract", async function() {
    //Instances
    const [owner] = await ethers.getSigners();
    const Token = await ethers.getContractFactory("GamaCoin", owner);
    const token = await Token.deploy(2000);

    const Sail = await ethers.getContractFactory("GamaSail", owner);
    const sail = await Sail.deploy(token.address);
    const balanceBefore = await sail.getBalanceEthers();
    
    // Trying to send 0 ethers.
    expect(sail.connect(owner).addEthers({ value: 0 }))
      .to.be.revertedWith("Only positive values are accepted.");

    // Adding Ethers
    const amount = ethers.utils.parseEther("2.0");
    await sail.connect(owner).addEthers({ value: amount });
    
    const balanceAfter = await sail.getBalanceEthers();

    // Assertion
    assert.notEqual(balanceBefore, balanceAfter);
  }),

  it("Add tokens in the contract", async function() {
    //Instances
    const [owner] = await ethers.getSigners();
    const Token = await ethers.getContractFactory("GamaCoin", owner);
    const token = await Token.deploy(2000);

    const Sail = await ethers.getContractFactory("GamaSail", owner);
    const sail = await Sail.deploy(token.address);
    const balanceBefore = await sail.getBalance();

    // Trying to send 0 ethers.
    expect(sail.connect(owner).addTokens(0))
      .to.be.revertedWith("Only positive values are accepted.");

    // Adding Tokens;
    await sail.connect(owner).addTokens(10);
    
    const balanceAfter = await sail.getBalance();

    // Assertion
    assert.notEqual(balanceBefore, balanceAfter);
  }),

  it("Withdraw funds of the contract", async function() {
    //Instances
    const [owner] = await ethers.getSigners();
    const Token = await ethers.getContractFactory("GamaCoin", owner);
    const token = await Token.deploy(2000);

    const Sail = await ethers.getContractFactory("GamaSail", owner);
    const sail = await Sail.deploy(token.address);
    const tokensBefore = await sail.getBalance();
    const ethersBefore = await sail.getBalanceEthers();

    // Adding Ethers
    const amount = ethers.utils.parseEther("2.0");
    await sail.connect(owner).addEthers({ value: amount });

    // Withdrawing funds;
    await sail.connect(owner).withdrawBalance();

    const tokensAfter = await sail.getBalance();
    const ethersAfter = await sail.getBalanceEthers();

    // Assertion
    assert.notEqual(tokensBefore, tokensAfter);
    assert.notEqual(ethersBefore, ethersAfter);
  });
});