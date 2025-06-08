// SPDX-License-Identifier: MIT
pragma solidity ^0.8.30;

interface IXCB {
  // Errors
  error NotWhitelisted();
  error AlreadyWhitelisted();
  error NotWhitelistedAddress();
  error InvalidAmount();

  // Events
  event AddressWhitelisted(address indexed account);
  event AddressRemovedFromWhitelist(address indexed account);
  event Faucet(address indexed user, uint256 amount);

  // Public state variables
  function whitelistedAddresses(address) external view returns (bool);

  // External functions
  function addToWhitelist(address account) external;
  function removeFromWhitelist(address account) external;
  function pause() external;
  function unpause() external;
  function faucet(uint256 amount) external;
  function mint(address user, uint256 amount) external;
  function burn(address user, uint256 amount) external;
  function ownerMint(address user, uint256 amount) external;
}
