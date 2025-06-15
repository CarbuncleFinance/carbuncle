// SPDX-License-Identifier: MIT
pragma solidity ^0.8.30;

import {Script, console} from 'forge-std/Script.sol';
import {ERC20Token} from '../../src/token/ERC20Token.sol';

// forge script scripts/erc20/Deploy.s.sol:DeployScript --broadcast --private-key $PRIVATE_KEY
// forge verify-contract --verifier blockscout --verifier-url https://explorer.testnet.xrplevm.org/api 0xB10B78dB26432aEa276E1b5edAfd4C63913124c4 src/token/ERC20Token.sol:ERC20Token --watch
contract DeployScript is Script {
  ERC20Token    public erc20Token;

  // function setUp() public {}

  function run() public {
    vm.createSelectFork('testnet');

    address deployer = vm.envAddress('DEPLOYER');

    vm.startBroadcast(deployer);

    erc20Token = new ERC20Token('MockToken', 'MTK');

    vm.stopBroadcast();
  }
}
