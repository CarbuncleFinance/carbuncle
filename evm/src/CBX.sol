// SPDX-License-Identifier: MIT
pragma solidity ^0.8.30;

import { ERC20 } from 'lib/openzeppelin-contracts/contracts/token/ERC20/ERC20.sol';
import { Ownable } from 'lib/openzeppelin-contracts/contracts/access/Ownable.sol';

/**
BOOTING... [CBX]

[ OK ] Loading Solidity Engine
[ OK ] Initializing Carbuncle Core
[ OK ] Syncing XRPL EVM
[ OK ] Token Distribution Queue: ACTIVE

   ██████╗ ██████╗ ██╗  ██╗
  ██╔════╝██╔═══██╗╚██╗██╔╝
  ██║     ██║   ██║ ╚███╔╝ 
  ██║     ██║   ██║ ██╔██╗ 
  ╚██████╗╚██████╔╝██╔╝ ██╗
   ╚═════╝ ╚═════╝ ╚═╝  ╚═╝

Whitelist Control: ENABLED
Owner Mint/Burn: ENABLED
Power Level: MAXIMUM
Emit Sparkles. Execute Brilliance.
*/
contract CBX is ERC20, Ownable {
  mapping(address => bool) public whitelistedAddresses;

  event AddressWhitelisted(address indexed account);
  event AddressRemovedFromWhitelist(address indexed account);

  modifier onlyWhitelisted() {
    require(whitelistedAddresses[msg.sender], 'Caller is not whitelisted');
    _;
  }

  constructor() ERC20('CBX', 'CBX') Ownable(msg.sender) {
    _mint(msg.sender, 1000000000000000000000000000);
  }

  function addToWhitelist(address account) external onlyOwner {
    require(!whitelistedAddresses[account], 'Address already whitelisted');
    whitelistedAddresses[account] = true;
    emit AddressWhitelisted(account);
  }

  function removeFromWhitelist(address account) external onlyOwner {
    require(whitelistedAddresses[account], 'Address not whitelisted');
    whitelistedAddresses[account] = false;
    emit AddressRemovedFromWhitelist(account);
  }

  function mint(address user, uint256 amount) external onlyWhitelisted {
    _mint(user, amount);
  }

  function burn(address user, uint256 amount) external onlyWhitelisted {
    _burn(user, amount);
  }

  function ownerMint(address user, uint256 amount) external onlyOwner {
    _mint(user, amount);
  }
}
