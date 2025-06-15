// SPDX-License-Identifier: MIT
pragma solidity ^0.8.30;

import {ERC20} from '@openzeppelin/contracts/token/ERC20/ERC20.sol';
import {AccessControl} from '@openzeppelin/contracts/access/AccessControl.sol';

contract ERC20Token is ERC20, AccessControl {
  bytes32 public constant MINTER_ROLE = keccak256('MINTER_ROLE');
  bytes32 public constant BURNER_ROLE = keccak256('BURNER_ROLE');

  constructor(string memory name, string memory symbol) ERC20(name, symbol) {
    _mint(msg.sender, 1000000e18);

    _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
    _grantRole(MINTER_ROLE, msg.sender);
    _grantRole(BURNER_ROLE, msg.sender);
  }

  function mint(address user, uint256 amount) external onlyRole(MINTER_ROLE) {
    _mint(user, amount);
  }

  function burn(address user, uint256 amount) external onlyRole(BURNER_ROLE) {
    _burn(user, amount);
  }
}
