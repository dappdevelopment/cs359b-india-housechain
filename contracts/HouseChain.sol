pragma solidity ^0.4.21;

contract HouseChain {
  mapping (address => uint256) public balances;
  mapping (string => string) house_addresses;

  uint256 totalSupply = 21000000;
  address public owner;
  event BalanceChanged(address indexed _address, uint256 _balance);

  constructor() public {
    balances[msg.sender] = totalSupply;        // Give the creator initially all the tokens
    owner = msg.sender;
  }

  function add_address(string addr, string person) public returns (string name) {
    house_addresses[addr] = person;
    name = house_addresses[addr];
  }

  function verify_address(string addr) public view returns (string name) {
    name = house_addresses[addr];
  }

  function transfer(address _to, uint256 _value) public returns (bool success) {
    require(balances[msg.sender] >= _value);
    balances[msg.sender] -= _value;
    balances[_to] += _value;
    emit BalanceChanged(msg.sender, balances[msg.sender]);
    emit BalanceChanged(_to, balances[_to]);
    return true;
  }

  function balanceOf(address _owner) public view returns (uint256 balance) {
    return balances[_owner];
  }

  function mint(uint256 _value) public {
    assert(msg.sender == owner);
    balances[msg.sender] += _value;
    totalSupply += _value;
  }
}