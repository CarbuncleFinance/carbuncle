// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Script, console} from "forge-std/Script.sol";
import {CBX} from "../src/CBX.sol";

contract CBXScript is Script {
  CBX public cbxInstance;

  function setUp() public {}

  function run() public {
    vm.startBroadcast();

    cbxInstance = new CBX();

    vm.stopBroadcast();
  }
}
