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

  // Modifiers
  modifier isOwner() {
    require(msg.sender == owner , "Sender is not owner!");
    _;
  }

  // Constructor
  constructor(address _token) {
    owner = payable(msg.sender);
    tokenAddress = _token;
    gamaCoin = GamaCoin(tokenAddress);
    tokenOwner = gamaCoin.getOwner();
    balance = gamaCoin.balanceOf(address(this));
    addTokens(gamaCoin.getTotalSupply().div(2));
  }

  // Getters and Setters
  /*
  * @function Retorna a quantidade de tokens que pertencem ao contrato.
  */
  function getBalance() public view returns (uint256) {
    return gamaCoin.balanceOf(address(this));
  }

  /*
  * @function Retorna a quantidade de tokens vendidos.
  */
  function getTokensSold() public view returns (uint256){
    return tokensSold;
  }

  /*
  * @function Retorna a quantidade de ethers que pertencem ao contrato.
  */
  function getBalanceEthers() public view returns (uint256){
    return address(this).balance;
  }

  /*
  * @function Retorna o preço de compra dos tokens.
  */
  function getTokenBuyPrice() public view returns (uint256){
    return tokenBuyPrice;
  }

  /*
  * @function Retorna o preço de venda dos tokens.
  */
  function getTokenSellPrice() public view returns (uint256){
    return tokenSellPrice;
  }

  /*
  * @function Altera o preço de compra dos tokens.
  * Retorna um valor booleano indicando se a operação foi bem sucedida.
  */
  function setTokenBuyPrice(uint256 _newPrice) public isOwner returns (bool){
    require(_newPrice.greaterThan(0, "Only positive values are accepted."));
    tokenBuyPrice = _newPrice;
    return true;
  }

  /*
  * @function Altera o preço de venda dos tokens.
  * Retorna um valor booleano indicando se a operação foi bem sucedida.
  */
  function setTokenSellPrice(uint256 _newPrice) public isOwner returns (bool){
    require(_newPrice.greaterThan(0, "Only positive values are accepted."));
    tokenSellPrice = _newPrice;
    return true;
  }

  // Public Functions
  /*
  * @function Compra tokens utilizando ethers enviados pelo msg.sender,
  * Retorna um valor booleano indicando se a operação foi bem sucedida.
  */
  function buyTokens() public payable returns(bool){
    require(msg.value.greaterThan(0, "Only positive values are accepted."));
    require(msg.value.greaterOrEqual(tokenBuyPrice, "Insuficient amount"));
    uint256 value = msg.value.div(tokenBuyPrice);
    require(gamaCoin.balanceOf(address(this)).greaterOrEqual(value,"Insuficient amount of tokens in contract"));
    require(gamaCoin.transfer(msg.sender, value));

    tokensSold += value;
    return true;
  }

  /*
  * @function Vende tokens enviados pelo msg.sender,
  * Returns a boolean value indicating whether the operation succeeded.
  */
  function sellTokens(uint256 _tokensToSell) public returns(bool){
    require(_tokensToSell.greaterThan(0, "Only positive values are accepted."));
    uint256 value = _tokensToSell.mul(tokenSellPrice);
    require(getBalanceEthers() >= value, "Contract without sufficient balance.");
    require(gamaCoin.balanceOf(msg.sender) >= _tokensToSell, "Sender without sufficient balance.");
    require(gamaCoin.transferFrom(msg.sender, address(this), _tokensToSell));
    payable(msg.sender).transfer(value);

    //emit Sell(msg.sender, _numberOfTokens);
    return true;
  }

  /*
  * @function Add Ethers in the contract.
  * Returns a boolean value indicating whether the operation succeeded.
  */
  function addEthers() public isOwner payable returns(bool){
    require(msg.value.greaterThan(0, "Only positive values are accepted."));
    return true;
  }

  /*
  * @function Add tokens in the contract.
  * Returns a boolean value indicating whether the operation succeeded.
  */
  function addTokens(uint256 _tokens) public isOwner {
    require(_tokens.greaterThan(0, "Only positive values are accepted."));
    require(gamaCoin.transferFrom(tokenOwner, address(this), _tokens));
    balance = _tokens;            
  }

  /*
  * @function Transfere todos os ethers e tokens do contrato para carteira do owner,
  * requer que seja chamada pelo owner.
  * Returns a boolean value indicating whether the operation succeeded.
  */
  function withdrawBalance() public isOwner returns(bool){
    require(gamaCoin.transfer(owner, gamaCoin.balanceOf(address(this))));
    owner.transfer(address(this).balance);
    return true;
  }
}