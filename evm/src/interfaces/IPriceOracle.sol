// SPDX-License-Identifier: MIT
pragma solidity ^0.8.30;

interface IPriceOracle {
  function setAssetPrice(address token, uint256 price) external;

  function getAssetPrice(address token) external view returns (uint256);
}
