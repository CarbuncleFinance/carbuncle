// SPDX-License-Identifier: MIT
pragma solidity ^0.8.30;

import {Test} from 'forge-std/Test.sol';
import {Upgrades} from '../../lib/openzeppelin-foundry-upgrades/src/Upgrades.sol';
import {XCB} from '../../src/token/XCB.sol';
import {PriceOracle} from '../../src/mocks/PriceOracle.sol';
import {LendingPoolCore} from '../../src/lendingpool/LendingPoolCore.sol';
import {LendingPool} from '../../src/lendingpool/LendingPool.sol';

contract TestnetProcedures is Test {
  address internal poolAdmin;

  address internal alice;
  address internal bob;
  address internal carol;

  uint256 internal alicePrivateKey;
  uint256 internal bobPrivateKey;
  uint256 internal carolPrivateKey;

  XCB internal xcb;
  PriceOracle public mockPriceOracle;
  LendingPoolCore public poolCore;
  LendingPool public lendingPool;

  function _initTestEnvironment() internal {
    poolAdmin = makeAddr('POOL_ADMIN');

    vm.startPrank(poolAdmin);

    // Contracts
    xcb = new XCB();

    mockPriceOracle = new PriceOracle();
    poolCore = new LendingPoolCore(address(xcb));

    address proxy = Upgrades.deployTransparentProxy(
      'LendingPool.sol',
      poolAdmin,
      ''
    );

    lendingPool = LendingPool(payable(proxy));
    lendingPool.initialize(address(poolCore), address(mockPriceOracle));

    // Set up contracts
    xcb.addToWhitelist(address(poolAdmin));
    poolCore.transferOwnership(poolAdmin);

    mockPriceOracle.setAssetPrice(address(0), 1e18); // 1 XRP = 1 USD
    mockPriceOracle.setAssetPrice(address(xcb), 0.5e18); // 1 XCB = 0.5 USD

    alicePrivateKey = 0xA11CE;
    bobPrivateKey = 0xB0B;
    carolPrivateKey = 0xCA801;

    alice = vm.addr(alicePrivateKey);
    bob = vm.addr(bobPrivateKey);
    carol = vm.addr(carolPrivateKey);

    vm.label(alice, 'alice');
    vm.label(bob, 'bob');
    vm.label(carol, 'carol');

    address[] memory users = new address[](4);
    users[0] = alice;
    users[1] = bob;
    users[2] = carol;
    users[3] = address(poolAdmin);

    for (uint256 x; x < users.length; x++) {
      address user = users[x];
      xcb.mint(user, 100e18);
      vm.deal(user, 100 ether);
    }

    vm.stopPrank();
  }

  function initTestEnvironment() public {
    _initTestEnvironment();
  }

  function initDeposit(address asset, uint256 amount, address user) public {
    vm.startPrank(user);

    if (asset == address(0)) {
      lendingPool.deposit{value: amount}(address(0), amount, user);
    } else {
      xcb.approve(address(poolCore), amount);
      lendingPool.deposit(asset, amount, user);
    }

    vm.stopPrank();
  }
}
