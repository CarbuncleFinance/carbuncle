// SPDX-License-Identifier: MIT
pragma solidity ^0.8.30;

import { ERC20 } from "lib/openzeppelin-contracts/contracts/token/ERC20/ERC20.sol";
import { Ownable } from "lib/openzeppelin-contracts/contracts/access/Ownable.sol";

contract CBX is ERC20, Ownable {
  constructor() ERC20("CBX", "CBX") Ownable(msg.sender) {
    _mint(msg.sender, 1000000000000000000000000000);
  }

  function mint(address to, uint256 amount) external onlyOwner {
    _mint(to, amount);
  }
}
