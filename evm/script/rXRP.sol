// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Script, console} from "forge-std/Script.sol";
import {rXRP} from "../src/rXRP.sol";

contract rXRPScript is Script {
    rXRP public rxrpInstance;

    function setUp() public {}

    function run() public {
        vm.startBroadcast();

        rxrpInstance = new rXRP();

        vm.stopBroadcast();
    }
}
