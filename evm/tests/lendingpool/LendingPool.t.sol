// SPDX-License-Identifier: MIT
pragma solidity ^0.8.30;

// import {console} from 'forge-std/console.sol';
import {TestnetProcedures} from '../utils/TestnetProcedures.sol';

contract LendingPoolTests is TestnetProcedures {
    function setUp() public {
        initTestEnvironment();

        vm.startPrank(poolAdmin);
        poolCore.addToWhitelist(alice);
        poolCore.addToWhitelist(address(lendingPool));

        xcb.approve(address(poolCore), type(uint256).max);
        lendingPool.deposit(address(xcb), 10e18, poolAdmin); // 100 XCB
        lendingPool.deposit{value: 100 ether}(address(0), 100 ether, poolAdmin); // 100 XRP

        vm.stopPrank();
    }

    function test_deposit_cbx() public {
        vm.startPrank(alice);

        uint256 currentBalance = xcb.balanceOf(address(poolCore));

        xcb.approve(address(poolCore), type(uint256).max);

        uint256 depositAmount = 10e18; // 10 XCB
        lendingPool.deposit(address(xcb), depositAmount, alice);

        assertEq(xcb.balanceOf(address(poolCore)) - currentBalance, depositAmount);

        vm.stopPrank();
    }

    function test_deposit_xrp() public {
        vm.startPrank(alice);

        uint256 currentBalance = address(poolCore).balance;

        uint256 depositAmount = 10 ether;
        lendingPool.deposit{value: depositAmount}(address(0), depositAmount, alice); // 10 XRP

        assertEq(address(poolCore).balance - currentBalance, depositAmount);
        
        vm.stopPrank();
    }

    function test_borrow_cbx() public {
        initDeposit(address(0), 10 ether, bob);

        vm.startPrank(bob);

        uint256 currentBalance = xcb.balanceOf(address(bob));

        uint256 borrowAmount = 7.5e18; // 7.5 XCB
        lendingPool.borrow(address(xcb), borrowAmount);

        assertEq(xcb.balanceOf(address(bob)) - currentBalance, borrowAmount);

        vm.stopPrank();
    }

    function test_borrow_xrp() public {
        initDeposit(address(xcb), 10e18, bob);

        vm.startPrank(bob);

        uint256 currentBalance = address(bob).balance;

        uint256 borrowAmount = 3.75 ether;
        lendingPool.borrow(address(0), borrowAmount);

        assertEq(address(bob).balance - currentBalance, borrowAmount);

        vm.stopPrank();
    }
}
