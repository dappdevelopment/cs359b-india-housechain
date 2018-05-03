pragma solidity ^0.4.21;

contract HouseChain {
  mapping (address => uint256) public balances;
  uint256 totalSupply = 21000000;
  address public owner;
  event BalanceChanged(address indexed _address, uint256 _balance);

  function HouseChain() public {
    balances[msg.sender] = totalSupply;        // Give the creator initially all the tokens
    owner = msg.sender;
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