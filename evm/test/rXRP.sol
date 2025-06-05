// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Test, console} from "forge-std/Test.sol";
import {rXRP} from "../src/rXRP.sol";

contract rXRPTest is Test {
    rXRP public rxrpInstance;

    function setUp() public {
        rxrpInstance = new rXRP();
        rxrpInstance.setNumber(0);
    }

    function test_Increment() public {
        rxrpInstance.increment();
        assertEq(rxrpInstance.number(), 1);
    }

    function testFuzz_SetNumber(uint256 x) public {
        rxrpInstance.setNumber(x);
        assertEq(rxrpInstance.number(), x);
    }
}
