// SPDX-License-Identifier: MIT
pragma solidity ^0.8.30;

import {Script, console} from 'forge-std/Script.sol';
import {XCB} from '../src/token/XCB.sol';

// forge script scripts/XCB.s.sol:XCBScript --broadcast --private-key $PRIVATE_KEY
// forge verify-contract --verifier blockscout --verifier-url https://explorer.testnet.xrplevm.org/api 0x5864Bb1BE322578c59E168AEee4DcC2DdE18d43d src/token/XCB.sol:XCB --watch
contract XCBScript is Script {
  XCB public xcb;

  // function setUp() public {}

  function run() public {
    vm.createSelectFork('testnet');

    address deployer = vm.envAddress('DEPLOYER');

    vm.startBroadcast(deployer);

    xcb = new XCB();

    vm.stopBroadcast();
  }
}
