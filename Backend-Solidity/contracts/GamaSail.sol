//SPDX-License-Identifier: Unlicense
pragma solidity >=0.7.0 <0.9.0;

import "./Math.sol";
import "./GamaCoin.sol";

contract GamaSail {

  // Instances/Libs
  using Math for uint256;

  // Properties
  uint256 public tokenPrice = 10;
  uint256 public tokensSold;
  uint256 private balance;

  address public tokenAddress;
  address private tokenOwner;

  address private owner;
  address payable contractAddress = payable(address(this));

  // Modifiers
  modifier isOwner() {
    require(msg.sender == owner , "Sender is not owner!");
    _;
  }

  // Constructor
  constructor(address token) {
    owner = payable(msg.sender);
    tokenAddress = token;
    tokenOwner = GamaCoin(tokenAddress).getOwner();
    requestBalance();
    balance = GamaCoin(tokenAddress).balanceOf(address(this));
  }

  // Public Functions
  function getBalance() public view returns (uint256) {
    return GamaCoin(tokenAddress).balanceOf(address(this));
  }

  function getBalanceEthers() public view returns (uint256) {
    return address(this).balance;
  }

  function buyTokens(uint256 _numberOfTokens) public payable {
    //msg.value > 0
    //require(msg.value == _numberOfTokens * tokenPrice);
    require(GamaCoin(tokenAddress).balanceOf(address(this)) >= _numberOfTokens);
    require(GamaCoin(tokenAddress).transfer(msg.sender, _numberOfTokens));

    tokensSold += _numberOfTokens;

    //Sell(msg.sender, _numberOfTokens);
  }

  function sellTokens(uint256 _numberOfTokens) public {
    uint256 value = _numberOfTokens / tokenPrice;
    value = 1 ether / value;
    require(getBalanceEthers() <= value);
    require(GamaCoin(tokenAddress).balanceOf(msg.sender) >= _numberOfTokens);
    require(GamaCoin(tokenAddress).transferFrom(msg.sender, address(this), _numberOfTokens));
    //require(payable(msg.sender));
    //tokensSold += _numberOfTokens;
    payable(msg.sender).transfer(value);
    console.log(value);
    //Sell(msg.sender, _numberOfTokens);
  }

  function requestBalance() private isOwner {
    uint256 value = GamaCoin(tokenAddress).getTotalSupply() * 1/2;
    require(GamaCoin(tokenAddress).transferFrom(tokenOwner, address(this), value));
    balance = value;            
  }
}