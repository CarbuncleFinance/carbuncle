// SPDX-License-Identifier: MIT
pragma solidity ^0.8.30;

import {IERC20} from '@openzeppelin/contracts/token/ERC20/IERC20.sol';
import {SafeERC20} from '@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol';
import {InterchainTokenExecutable} from '@axelar-network/interchain-token-service/contracts/executable/InterchainTokenExpressExecutable.sol';
import {ILendingPool} from './ILendingPool.sol';

error InvalidPayload();

contract SkrrtRouter is
  InterchainTokenExecutable
{
  using SafeERC20 for IERC20;

  address public lendingPool;

  constructor(
    address lendingPool_,
    address interchainTokenService_
  ) InterchainTokenExecutable(interchainTokenService_) {
    lendingPool = lendingPool_;
  }

  event Executed(bytes payload, address token, uint256 amount);

  function _executeWithInterchainToken(
    bytes32,
    string calldata,
    bytes calldata,
    bytes calldata payload,
    bytes32,
    address token,
    uint256 amount
  ) internal override {
    _processPayload(payload, token, amount);
  }

  function _processPayload(bytes calldata payload, address token, uint256 amount) private {
    if (payload.length != 64) revert InvalidPayload();

    (address destinationAddress, ) = abi.decode(payload, (address, bytes32));
    IERC20(token).approve(lendingPool, amount);
    // IERC20(token).safeTransfer(address(this), amount);

    ILendingPool(lendingPool).supply(token, amount, address(this), destinationAddress);

    emit Executed(payload, token, amount);
  }
}
