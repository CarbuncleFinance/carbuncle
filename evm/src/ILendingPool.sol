// SPDX-License-Identifier: MIT
pragma solidity ^0.8.30;

interface ILendingPool {
  function supply(address token, uint256 amount, address routerAddress, address myAddress) external;
}
