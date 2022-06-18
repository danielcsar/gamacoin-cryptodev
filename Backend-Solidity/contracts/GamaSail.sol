//SPDX-License-Identifier: Unlicense
pragma solidity >=0.7.0 <0.9.0;

import "hardhat/console.sol";
import "./Math.sol";
import "./GamaCoin.sol";

contract GamaSail {

  // Instances/Libs
  using Math for uint256;

  // Properties
  uint256 public tokenBuyPrice = 1 ether;
  uint256 public tokenSellPrice = 1 ether;
  uint256 public tokensSold;
  uint256 private balance;
  address payable private owner;

  address public tokenAddress;
  address private tokenOwner;
  GamaCoin private gamaCoin;
  address payable contractAddress = payable(address(this));

  // Events
  event Sell(address indexed _sender, uint256 _numberOfTokens);
  event Buy(address indexed _sender, uint256 value);

  // Modifiers
  modifier isOwner() {
    require(msg.sender == owner , "Sender is not owner!");
    _;
  }

  modifier isPositive() {
    require(msg.value.greaterThan(0, "Only positive values are accepted."));
    _;
  }

  modifier isValuePositive(uint256 _value) {
    require(_value.greaterThan(0, "Only positive values are accepted."));
    _;
  }

  // Constructor
  constructor(address _token) {
    owner = payable(msg.sender);
    tokenAddress = _token;
    gamaCoin = GamaCoin(tokenAddress);
    tokenOwner = gamaCoin.getOwner();
    balance = gamaCoin.balanceOf(address(this));    
  }

  // Getters and Setters
  /*
  * @function Returns the quantity of tokens that belong to the contract.
  */
  function getBalance() public view returns (uint256) {
    return gamaCoin.balanceOf(address(this));
  }

  /*
  * @function Returns the amount of tokens sold.
  */
  function getTokensSold() public view returns (uint256){
    return tokensSold;
  }

  /*
  * @function Returns the quantity of ethers that belong to the contract.
  */
  function getBalanceEthers() public view returns (uint256){
    return address(this).balance;
  }

  /*
  * @function Returns the purchase price of the tokens.
  */
  function getTokenBuyPrice() public view returns (uint256){
    return tokenBuyPrice;
  }

  /*
  * @function Returns the selling price of the tokens.
  */
  function getTokenSellPrice() public view returns (uint256){
    return tokenSellPrice;
  }

  /*
  * @function Changes the purchase price of the tokens.
  * Returns a boolean value indicating whether the operation was successful.
  */
  function setTokenBuyPrice(uint256 _newPrice) public isOwner isValuePositive(_newPrice) returns (bool){
    tokenBuyPrice = _newPrice;
    return true;
  }

  /*
  * @function Changes the selling price of tokens.
  * Returns a boolean value indicating whether the operation was successful.
  */
  function setTokenSellPrice(uint256 _newPrice) public isOwner isValuePositive(_newPrice) returns (bool){
    tokenSellPrice = _newPrice;
    return true;
  }

  // Public Functions
  /*
  * @function Purchases tokens using ethers sent by msg.sender.
  * Returns a boolean value indicating whether the operation was successful.
  */
  function buyTokens() public isPositive payable returns(bool){
    require(msg.value.greaterOrEqual(tokenBuyPrice, "Insuficient amount"));
    uint256 value = msg.value.div(tokenBuyPrice);
    require(gamaCoin.balanceOf(address(this)).greaterOrEqual(value,"Insuficient amount of tokens in contract"));
    require(gamaCoin.transfer(msg.sender, value));
    tokensSold += value;

    emit Buy(msg.sender, value);
    return true;
  }

  /*
  * @function Sells tokens sent by msg.sender.
  * Returns a boolean value indicating whether the operation was successful.
  */
  function sellTokens(uint256 _tokensToSell) public isValuePositive(_tokensToSell) returns(bool){
    uint256 value = _tokensToSell.mul(tokenSellPrice);
    require(getBalanceEthers() >= value, "Contract without sufficient balance.");
    require(gamaCoin.balanceOf(msg.sender) >= _tokensToSell, "Sender without sufficient balance.");
    require(gamaCoin.transferFrom(msg.sender, address(this), _tokensToSell));
    payable(msg.sender).transfer(value);

    emit Sell(msg.sender, _tokensToSell);
    return true;
  }

  /*
  * @function Add Ethers in the contract.
  * Returns a boolean value indicating whether the operation was successful.
  */
  function addEthers() public isOwner isPositive payable returns(bool){
    return true;
  }

  /*
  * @function Add tokens in the contract.
  * Returns a boolean value indicating whether the operation succeeded.
  */
  function addTokens(uint256 _tokens) public isOwner isValuePositive(_tokens) {
    require(gamaCoin.transferFrom(tokenOwner, address(this), _tokens));
    balance = _tokens;            
  }

  /*
  * @function Transfers all ethers and tokens from contract to owner's wallet,
  * requires that it be called by the owner.
  * Returns a boolean value indicating whether the operation succeeded.
  */
  function withdrawBalance() public isOwner returns(bool){
    require(gamaCoin.transfer(owner, gamaCoin.balanceOf(address(this))));
    owner.transfer(address(this).balance);
    return true;
  }
}