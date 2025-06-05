// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Test, console} from "forge-std/Test.sol";
import {rCBX} from "../src/rCBX.sol";

contract rCBXTest is Test {
    rCBX public rcbxInstance;

    function setUp() public {
        rcbxInstance = new rCBX();
    }
}
