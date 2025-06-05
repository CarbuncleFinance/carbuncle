// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Test, console} from "forge-std/Test.sol";
import {rCBX} from "../src/rCBX.sol";

contract rCBXTest is Test {
    rCBX public rcbxInstance;
    address public owner;

    function setUp() public {
        owner = makeAddr("owner");
        vm.startPrank(owner);
        rcbxInstance = new rCBX();
        vm.stopPrank();
    }

    function testName() public view {
        string memory expectedName = "rCBX";
        string memory actualName = rcbxInstance.name();
        assertEq(actualName, expectedName, "Token name should be 'rCBX'");
    }
}
