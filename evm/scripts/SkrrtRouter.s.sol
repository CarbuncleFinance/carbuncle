// SPDX-License-Identifier: MIT
pragma solidity ^0.8.30;

import {Script, console} from 'forge-std/Script.sol';
import {SkrrtRouter} from '../src/SkrrtRouter.sol';

// forge script scripts/SkrrtRouter.s.sol:SkrrtRouterScript --broadcast --private-key $PRIVATE_KEY
// forge verify-contract --verifier blockscout --verifier-url https://explorer.testnet.xrplevm.org/api 0xCBD911cB822Cd4Cd093AD493d2f5A7262ce58A68 src/SkrrtRouter.sol:SkrrtRouter --watch
contract SkrrtRouterScript is Script {
  address public constant LENDING_POOL = 0xa55EC9E93137069245BE493521f747a914636bE5;
  address public constant INTERCHAIN_TOKEN_SERVICE = 0xB5FB4BE02232B1bBA4dC8f81dc24C26980dE9e3C;

  SkrrtRouter public skrrtRouter;

  // function setUp() public {}

  function run() public {
    vm.createSelectFork('testnet');

    address deployer = vm.envAddress('DEPLOYER');

    vm.startBroadcast(deployer);

    skrrtRouter = new SkrrtRouter(
      LENDING_POOL,
      INTERCHAIN_TOKEN_SERVICE
    );

    vm.stopBroadcast();
  }
}
