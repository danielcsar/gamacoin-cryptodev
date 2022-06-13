//SPDX-License-Identifier: Unlicense
pragma solidity >=0.7.0 <0.9.0;

import "hardhat/console.sol";
import "./Math.sol";
import "./IERC20.sol";

contract GamaCoin is IERC20 {

    // Instances/Libs
    using Math for uint256;

    // Enums
    enum Status { ACTIVE, PAUSED, CANCELLED }

    // Properties
    string private name = "GamaCoin";
    string private symbol = "GAMA";
    uint8 private decimals = 3;
    address private owner;
    uint256 private totalSupply;
    Status status;

    mapping (address => uint256) private addressToBalance;
    mapping (address => mapping (address => uint256)) private allowances;
    
    // Modifiers
    modifier isOwner() {
        require(msg.sender == owner , "Sender is not owner!");
        _;
    }
  
    // Constructor
    constructor(uint256 _inicialSupply) {
        console.log("Deploying a GamaCoin");
        totalSupply = _inicialSupply;
        owner = msg.sender;
        addressToBalance[owner] = _inicialSupply;
    }

    // Get Public Functions
    function getName() public view returns (string memory) {
        return name;
    }

    function getSymbol() public view returns (string memory) {
        return symbol;
    }

    function getDecimals() public view returns (uint8) {
        return decimals;
    }

    function getTotalSupply() external override view returns (uint256){
        return totalSupply;
    }

    function getOwner() public view returns(address) {
        return owner;
    }

    function balanceOf(address _account) external override view returns (uint256){
        return addressToBalance[_account];
    }

    function allowance(address _owner, address _spender) external override view returns (uint256){
        return allowances[_owner][_spender];
    }

    // Public Functions
    function transfer(address _to, uint256 _value) external override returns (bool){
        require(status == Status.ACTIVE, "The contract is not active.");
        require(addressToBalance[msg.sender] >= _value);

        addressToBalance[msg.sender] -= _value;
        addressToBalance[_to] += _value;

        emit Transfer(msg.sender, _to, _value);

        return true;
    }    

    function approve(address _spender, uint256 _value) external override returns (bool){
        require(status == Status.ACTIVE, "The contract is not active.");
        allowances[msg.sender][_spender] = _value;

        emit Approval(msg.sender, _spender, _value);

        return true;
    }

    function transferFrom(address _from, address _to, uint256 _value) external override returns (bool){
        require(status == Status.ACTIVE, "The contract is not active.");
        require(_value <= addressToBalance[_from]);
        require(_value <= allowances[_from][msg.sender]);

        addressToBalance[_from] -= _value;
        addressToBalance[_to] += _value;

        allowances[_from][msg.sender] -= _value;

        emit Transfer(_from, _to, _value);

        return true;
    }

    // Private Functions

    // Kill
    function kill() public isOwner payable {
        require(status == Status.CANCELLED, "Contract is not canceled.");
        selfdestruct(payable(owner));
    }  
}
