//SPDX-License-Identifier: Unlicense
pragma solidity >=0.7.0 <0.9.0;

import "hardhat/console.sol";
import "./Math.sol";
import "./GamaCoin.sol";

contract GamaSail {

  // Instances/Libs
  using Math for uint256;

  // Properties
  uint256 public tokenPrice = 1 ether;
  uint256 public tokensSold;
  uint256 private balance;

  address public tokenAddress;
  address private tokenOwner;
  GamaCoin private gamaCoin;
  address payable private owner;
  address payable contractAddress = payable(address(this));

  // Modifiers
  modifier isOwner() {
    require(msg.sender == owner , "Sender is not owner!");
    _;
  }

  // Constructor
  constructor(address _token) {
    console.log("Deploying a GamaSail");
    owner = payable(msg.sender);
    tokenAddress = _token;
    gamaCoin = GamaCoin(tokenAddress);
    tokenOwner = gamaCoin.getOwner();
    balance = gamaCoin.balanceOf(address(this));
    requestBalance();
  }

  // Public Functions
  /*
  * @function Devolve a quantidade de tokens que pertencem ao contrato.
  */
  function getBalance() public view returns (uint256) {
    return gamaCoin.balanceOf(address(this));
  }

  /*
  * @function Devolve a quantidade de ethers que pertencem ao contrato.
  */
  function getBalanceEthers() public view returns (uint256){
    return address(this).balance;
  }

  /*
  * @function Compra tokens utilizando ethers enviados pelo msg.sender,
  * Retorna um valor booleano indicando se a operação foi bem sucedida.
  */
  function buyTokens() public payable returns(bool){
    require(msg.value.greaterThan(0, "Only positive values are accepted."));
    require(msg.value.greaterOrEqual(tokenPrice, "Insuficient amount"));
    uint256 value = msg.value.div(tokenPrice);
    require(gamaCoin.balanceOf(address(this)) >= value);
    require(gamaCoin.transfer(msg.sender, value));

    tokensSold += value;
    return true;
  }

  /*
  * @function Vende tokens enviados pelo msg.sender,
  * Retorna um valor booleano indicando se a operação foi bem sucedida.
  */
  function sellTokens(uint256 _tokensToSell) public returns(bool){
    require(_tokensToSell.greaterThan(0, "Only positive values are accepted."));
    uint256 value = _tokensToSell.mul(tokenPrice);
    require(getBalanceEthers() >= value, "Contract without sufficient balance.");
    require(gamaCoin.balanceOf(msg.sender) >= _tokensToSell, "Sender without sufficient balance.");
    require(gamaCoin.transferFrom(msg.sender, address(this), _tokensToSell));
    payable(msg.sender).transfer(value);
    //Sell(msg.sender, _numberOfTokens);
    return true;
  }

  /*
  * @function Transfere todos os ethers e tokens do contrato para carteira do owner,
  * requer que seja chamada pelo owner.
  * Retorna um valor booleano indicando se a operação foi bem sucedida.
  */
  function withdrawBalance() public isOwner returns(bool){
    require(gamaCoin.transfer(owner, gamaCoin.balanceOf(address(this))));
    owner.transfer(address(this).balance);
    return true;
  }

  function requestBalance() private isOwner {
    uint256 value = gamaCoin.getTotalSupply() * 1/2;
    require(gamaCoin.transferFrom(tokenOwner, address(this), value));
    balance = value;            
  }
}