// SPDX-License-Identifier: MIT
pragma solidity ^0.8.30;

import {Script, console} from 'forge-std/Script.sol';
import {LendingPool} from '../src/LendingPool.sol';

// forge script scripts/LendingPool.s.sol:LendingPoolScript --broadcast --private-key $PRIVATE_KEY
// forge verify-contract --verifier blockscout --verifier-url https://explorer.testnet.xrplevm.org/api 0xa55EC9E93137069245BE493521f747a914636bE5 src/LendingPool.sol:LendingPool --watch
contract LendingPoolScript is Script {
  LendingPool public lendingPool;

  // function setUp() public {}

  function run() public {
    vm.createSelectFork('testnet');

    address deployer = vm.envAddress('DEPLOYER');

    vm.startBroadcast(deployer);

    lendingPool = new LendingPool();

    vm.stopBroadcast();
  }
}
