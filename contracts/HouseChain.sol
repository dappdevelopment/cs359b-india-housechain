pragma solidity ^0.4.21;

contract HouseChain {
    
  struct Home{
      string addr;
      string owner_name;
      string owner_email;
      string owner_phone;
  }
  
  Home [] homes;
  uint256 home_index;

  mapping (address => uint256) public balances;
  mapping (bytes32 => uint256) public address_to_name;

  uint256 totalSupply = 21000000;
  event BalanceChanged(address indexed _address, uint256 _balance);

  constructor() public {
    balances[msg.sender] = totalSupply;        // Give the creator initially all the tokens
    home_index = 1;                            //Important to prevent null index lookup
    homes.push(Home("blank", "blank", "blank", "blank"));
  }

  function add_address(string _owner_name, string addr, string _owner_email,
                    string _owner_phone) public returns (bool success) {
    address_to_name[sha256(addr)] = home_index;
    homes.push(Home(addr, _owner_name, _owner_email, _owner_phone));
    home_index++;
    success = true;
  }

  function verify_address(string addr) public view returns
        (bool found, string owner, string email, string phone) {
    uint256 addr_index = address_to_name[sha256(addr)];
    found = (addr_index > 0);
    owner = homes[addr_index].owner_name;
    email = homes[addr_index].owner_email;
    phone = homes[addr_index].owner_phone;
  }

  function balanceOf(address _owner) public view returns (uint256 balance) {
    return balances[_owner];
  }
}