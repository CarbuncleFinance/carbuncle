// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.30;

import {Test, console} from 'forge-std/Test.sol';
import {Pool} from '../src/pool/Pool.sol';
import {LendingPoolCore} from '../src/pool/LendingPoolCore.sol';
import {MockPriceOracle} from '../src/pool/PriceOracle.sol';
import {CBX} from '../src/CBX.sol';

contract LendingPoolTest is Test {
    CBX public cbx;
    MockPriceOracle public mockPriceOracle;
    LendingPoolCore public lendingPoolCore;
    Pool public pool;

    address public owner;

    function setUp() public {
        owner = makeAddr('owner');

        vm.startPrank(owner);

        cbx = new CBX();
        mockPriceOracle = new MockPriceOracle();
        lendingPoolCore = new LendingPoolCore(address(cbx));
        pool = new Pool(address(lendingPoolCore), address(mockPriceOracle));

        vm.stopPrank();
    }

    function testName() public view {
        string memory expectedName = 'CBX';
        string memory actualName = cbx.name();
        assertEq(actualName, expectedName, 'Token name should be "CBX"');
    }
}
