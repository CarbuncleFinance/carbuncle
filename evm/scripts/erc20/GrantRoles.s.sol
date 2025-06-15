// SPDX-License-Identifier: MIT
pragma solidity ^0.8.30;

import {Script, console} from 'forge-std/Script.sol';
import {IAccessControl} from '@openzeppelin/contracts/access/IAccessControl.sol';

interface IERC20Token is IAccessControl {
  function MINTER_ROLE() external view returns (bytes32);
  function BURNER_ROLE() external view returns (bytes32);
}

// forge script scripts/erc20/GrantRoles.s.sol:GrantRolesScript --broadcast --private-key $PRIVATE_KEY --skip-simulation
contract GrantRolesScript is Script {
  address public constant INTERCHAIN_TOKEN_SERVICE = 0xB5FB4BE02232B1bBA4dC8f81dc24C26980dE9e3C;
  address public constant ERC20_TOKEN = 0xB10B78dB26432aEa276E1b5edAfd4C63913124c4;

  function run() public {
    vm.createSelectFork('testnet');

    address deployer = vm.envAddress('DEPLOYER');

    vm.startBroadcast(deployer);

    IERC20Token(ERC20_TOKEN).grantRole(IERC20Token(ERC20_TOKEN).MINTER_ROLE(), INTERCHAIN_TOKEN_SERVICE);
    IERC20Token(ERC20_TOKEN).grantRole(IERC20Token(ERC20_TOKEN).BURNER_ROLE(), INTERCHAIN_TOKEN_SERVICE);

    vm.stopBroadcast();
  }
} 