const { expect, assert } = require("chai");
const { ethers } = require("hardhat");

describe("GamaSale", async function () {
  
  it("Get token balance of the GamaSale contract", async function() {
    // Instances
    const [owner] = await ethers.getSigners();
    const Token = await ethers.getContractFactory("GamaCoin", owner);
    const token = await Token.deploy(2000);
    const Sale = await ethers.getContractFactory("GamaSale", owner);
    const sale = await Sale.deploy(token.address);
    await token.connect(owner).transfer(sale.address, 1000);

    // Assertions
    assert.notEqual(await sale.getBalance(), 0);
    assert.equal(await sale.getBalance(), 1000);
  }),

  it("Get total tokens sold by the GamaSale contract", async function() {
    //Instances
    const [owner, wallet1] = await ethers.getSigners();
    const Token = await ethers.getContractFactory("GamaCoin", owner);
    const token = await Token.deploy(2000);
    const Sale = await ethers.getContractFactory("GamaSale", owner);
    const sale = await Sale.deploy(token.address);
    await token.connect(owner).transfer(sale.address, 1000);

    // Assertions
    assert.equal(await sale.getTokensSold(), 0);
    
    // Buying 1 token;
    const amount = ethers.utils.parseEther("1.0");
    await sale.connect(wallet1).buyTokens({ value: amount });

    // Assertions
    assert.equal(await sale.getTokensSold(), 1);
  }),

  it("Get ethers balance of the GamaSale contract", async function() {
    //Instances
    const [owner] = await ethers.getSigners();
    const Token = await ethers.getContractFactory("GamaCoin", owner);
    const token = await Token.deploy(2000);
    const Sale = await ethers.getContractFactory("GamaSale", owner);
    const sale = await Sale.deploy(token.address);
    
    // Assertions
    const zero = ethers.utils.parseEther("0");
    const balanceBefore = await sale.getBalanceEthers();

    expect(balanceBefore).to.be.equals(zero);
    
    // Buying 1 token;
    const amount = ethers.utils.parseEther("1.0");
    await sale.connect(owner).addEthers({ value: amount })

    // Assertions
    const balanceAfter = await sale.getBalanceEthers();
    
    expect(balanceAfter).to.be.equals(amount);
  }),

  it("Getters and Setters TokenPrices", async () => {
    // Instances
    const [owner] = await ethers.getSigners();
    const Token = await ethers.getContractFactory("GamaCoin", owner);
    const token = await Token.deploy(2000);
    const Sale = await ethers.getContractFactory("GamaSale", owner);
    const sale = await Sale.deploy(token.address);

    // Variables
    const oneEther = ethers.utils.parseEther("1.0");
    const twoEthers = ethers.utils.parseEther("2.0");
    const buyPriceBefore = await sale.getTokenBuyPrice();
    const sellPriceBefore = await sale.getTokenSellPrice();

    // Assertions getters
    expect(buyPriceBefore).to.be.equals(oneEther);
    expect(sellPriceBefore).to.be.equals(oneEther);

    // Setting new prices
    await sale.setTokenBuyPrice(twoEthers);
    await sale.setTokenSellPrice(twoEthers);

    // Assertions setters
    const buyPriceAfter = await sale.getTokenBuyPrice();
    const sellPriceAfter = await sale.getTokenSellPrice();
    assert.notEqual(buyPriceBefore, buyPriceAfter);
    assert.notEqual(sellPriceBefore, sellPriceAfter);
  }),

  it("Buying Tokens", async function() {
    //Instances
    const [owner, wallet1] = await ethers.getSigners();
    const Token = await ethers.getContractFactory("GamaCoin", owner);
    const token = await Token.deploy(2000);

    const Sale = await ethers.getContractFactory("GamaSale", owner);
    const sale = await Sale.deploy(token.address);
    await token.connect(owner).transfer(sale.address, 1000);

    // Trying to buy with 0 ethers
    expect(sale.connect(wallet1).buyTokens({ value: 0 }))
      .to.be.revertedWith("Only positive values are accepted.");

    // Trying to buy with fewer ethers than the token price
    const amountMinor = ethers.utils.parseEther("0.5");
    expect(sale.connect(wallet1).buyTokens({ value: amountMinor }))
      .to.be.revertedWith("Insuficient amount");

    // Buying with correct value
    const amount = ethers.utils.parseEther("1.0");
    const wallet1Before = await token.connect(owner).balanceOf(wallet1.address);
    await sale.connect(wallet1).buyTokens({ value: amount });
    const wallet1After = await token.connect(owner).balanceOf(wallet1.address);

    // Assertion
    assert.notEqual(wallet1Before, wallet1After);
  }),

  it("Selling Tokens", async function() {
    //Instances
    const [owner, wallet1, wallet2 ] = await ethers.getSigners();
    const Token = await ethers.getContractFactory("GamaCoin", owner);
    const token = await Token.deploy(2000);

    const Sale = await ethers.getContractFactory("GamaSale", owner);
    const sale = await Sale.deploy(token.address);
    // 
    await token.connect(owner).transfer(sale.address,1000);

    const amount = ethers.utils.parseEther("2.0");
    await sale.connect(owner).addEthers({ value: amount });

    //Comprando tokens 
    await sale.connect(wallet1).buyTokens({ value: amount });
    await token.connect(wallet1).approve(sale.address, 2); 

    // Trying to Sell with 0 tokens
    expect(sale.connect(wallet2).sellTokens(0))
      .to.be.revertedWith("Only positive values are accepted.");

    // Selling with correct value
    expect(await sale.connect(wallet1).sellTokens(1)).to.be.changeEtherBalance(wallet1, 1);
  }),
  
  it("Add Ethers in the contract", async function() {
    //Instances
    const [owner] = await ethers.getSigners();
    const Token = await ethers.getContractFactory("GamaCoin", owner);
    const token = await Token.deploy(2000);

    const Sale = await ethers.getContractFactory("GamaSale", owner);
    const sale = await Sale.deploy(token.address);
    const balanceBefore = await sale.getBalanceEthers();
    
    // Trying to send 0 ethers.
    expect(sale.connect(owner).addEthers({ value: 0 }))
      .to.be.revertedWith("Only positive values are accepted.");

    // Adding Ethers
    const amount = ethers.utils.parseEther("2.0");
    await sale.connect(owner).addEthers({ value: amount });
    
    const balanceAfter = await sale.getBalanceEthers();

    // Assertion
    assert.notEqual(balanceBefore, balanceAfter);
  }),

  it("Add tokens in the contract", async function() {
    //Instances
    const [owner] = await ethers.getSigners();
    const Token = await ethers.getContractFactory("GamaCoin", owner);
    const token = await Token.deploy(2000);

    const Sale = await ethers.getContractFactory("GamaSale", owner);
    const sale = await Sale.deploy(token.address);
    await token.connect(owner).approve(sale.address, 2000);
    await sale.connect(owner).addTokens(1000);
    const balanceBefore = await sale.getBalance();

    // Trying to send 0 ethers.
    expect(sale.connect(owner).addTokens(0))
      .to.be.revertedWith("Only positive values are accepted.");

    // Adding Tokens;
    await sale.connect(owner).addTokens(10);
    
    const balanceAfter = await sale.getBalance();

    // Assertion
    assert.notEqual(balanceBefore, balanceAfter);
  }),

  it("Withdraw funds of the contract", async function() {
    //Instances
    const [owner] = await ethers.getSigners();
    const Token = await ethers.getContractFactory("GamaCoin", owner);
    const token = await Token.deploy(2000);

    const Sale = await ethers.getContractFactory("GamaSale", owner);
    const sale = await Sale.deploy(token.address);
    const tokensBefore = await sale.getBalance();
    const ethersBefore = await sale.getBalanceEthers();

    // Adding Ethers
    const amount = ethers.utils.parseEther("2.0");
    await sale.connect(owner).addEthers({ value: amount });

    // Withdrawing funds;
    await sale.connect(owner).withdrawBalance();

    const tokensAfter = await sale.getBalance();
    const ethersAfter = await sale.getBalanceEthers();

    // Assertion
    assert.notEqual(tokensBefore, tokensAfter);
    assert.notEqual(ethersBefore, ethersAfter);
  });
});