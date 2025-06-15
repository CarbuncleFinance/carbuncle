// SPDX-License-Identifier: MIT
pragma solidity ^0.8.30;

import {IERC20} from '@openzeppelin/contracts/token/ERC20/IERC20.sol';
import {SafeERC20} from '@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol';
import {ILendingPool} from './ILendingPool.sol';

contract LendingPool is ILendingPool {
  using SafeERC20 for IERC20;

  mapping(address => uint256) public userDeposits;

  function supply(address token, uint256 amount, address routerAddress, address myAddress) external {
    IERC20(token).safeTransferFrom(routerAddress, address(this), amount);

    userDeposits[myAddress] += amount;
  }
}
