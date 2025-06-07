// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Script, console} from "forge-std/Script.sol";
import {CBX} from "../src/CBX.sol";
import {MockPriceOracle} from "../src/pool/PriceOracle.sol";
import {LendingPoolCore} from "../src/pool/LendingPoolCore.sol";
import {LendingPool} from "../src/LendingPool.sol";

contract DeployAllScript is Script {
  function run() public {
    vm.startBroadcast();

    // 1. CBX Token
    CBX cbx = new CBX();
    console.log("CBX deployed at:", address(cbx));

    // 2. MockPriceOracle
    MockPriceOracle oracle = new MockPriceOracle();
    console.log("MockPriceOracle deployed at:", address(oracle));

    // 3. LendingPoolCore
    LendingPoolCore core = new LendingPoolCore(address(cbx));
    console.log("LendingPoolCore deployed at:", address(core));

    // 4. LendingPool
    LendingPool pool = new LendingPool(address(core), address(oracle));
    console.log("LendingPool deployed at:", address(pool));

    vm.stopBroadcast();
  }
} 