pragma solidity ^0.4.21;

contract HouseChain {
  mapping (address => uint256) public balances;
  mapping (address => string) public house_addresses;

  uint256 totalSupply = 21000000;
  address public owner;
  event BalanceChanged(address indexed _address, uint256 _balance);

  constructor() public {
    balances[msg.sender] = totalSupply;        // Give the creator initially all the tokens
    owner = msg.sender;
  }

  function add_address(address _owner, string addr) public returns (string name) {
    house_addresses[_owner] = addr;
    name = house_addresses[_owner];
  }

  function verify_address(address _owner) public view returns (string addr) {
    addr = house_addresses[_owner];
    return addr;
  }

  function balanceOf(address _owner) public view returns (uint256 balance) {
    return balances[_owner];
  }
}