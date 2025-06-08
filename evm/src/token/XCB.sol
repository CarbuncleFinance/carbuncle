// SPDX-License-Identifier: MIT
pragma solidity ^0.8.30;

import {ERC20} from '@openzeppelin/contracts/token/ERC20/ERC20.sol';
import {Ownable} from '@openzeppelin/contracts/access/Ownable.sol';
import {Pausable} from '@openzeppelin/contracts/utils/Pausable.sol';
import {IXCB} from '../interfaces/IXCB.sol';

/**
[SYSTEM INITIALIZATION] [XCB v1.0.0]
[STATUS: ONLINE]

[✓] NEURAL INTERFACE: CONNECTED
[✓] QUANTUM CORE: ACTIVATED
[✓] XRPL EVM SYNC: COMPLETE
[✓] DISTRIBUTION MATRIX: READY

  ██╗  ██╗ ██████╗██████╗ 
  ╚██╗██╔╝██╔════╝██╔══██╗
   ╚███╔╝ ██║     ██████╔╝
   ██╔██╗ ██║     ██╔══██╗
  ██╔╝ ██╗╚██████╗██████╔╝
  ╚═╝  ╚═╝ ╚═════╝╚═════╝ 

[SECURITY PROTOCOLS]
> WHITELIST MATRIX: ACTIVE
> ADMIN PRIVILEGES: ENABLED
> POWER CORE: OVERDRIVE

[SYSTEM MESSAGE]
"INJECTING BRILLIANCE INTO THE MATRIX"
*/
contract XCB is ERC20, Ownable, Pausable, IXCB {
  mapping(address => bool) public whitelistedAddresses;

  modifier onlyWhitelisted() {
    if (!whitelistedAddresses[msg.sender]) revert NotWhitelisted();
    _;
  }

  constructor() ERC20('XCB', 'XCB') Ownable(msg.sender) {
    _mint(msg.sender, 1000000e18);
  }

  function addToWhitelist(address account) external onlyOwner {
    if (whitelistedAddresses[account]) revert AlreadyWhitelisted();
  
    whitelistedAddresses[account] = true;
  
    emit AddressWhitelisted(account);
  }

  function removeFromWhitelist(address account) external onlyOwner {
    if (!whitelistedAddresses[account]) revert NotWhitelistedAddress();
  
    whitelistedAddresses[account] = false;
  
    emit AddressRemovedFromWhitelist(account);
  }

  function pause() external onlyOwner {
    _pause();
  }

  function unpause() external onlyOwner {
    _unpause();
  }

  function faucet(uint256 amount) external whenNotPaused {
    if (amount == 0) revert InvalidAmount();

    _mint(msg.sender, amount);

    emit Faucet(msg.sender, amount);
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
