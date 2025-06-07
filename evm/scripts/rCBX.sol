// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Script, console} from "forge-std/Script.sol";
import {rCBX} from "../src/rCBX.sol";

contract rCBXScript is Script {
    rCBX public rcbxInstance;

    function setUp() public {}

    function run() public {
        vm.startBroadcast();

        rcbxInstance = new rCBX();

        vm.stopBroadcast();
    }
}
