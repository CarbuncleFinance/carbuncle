// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import { Context } from "lib/openzeppelin-contracts/contracts/utils/Context.sol";

contract rXRP is Context {
    uint256 public number;

    function setNumber(uint256 newNumber) public {
        number = newNumber;
    }

    function increment() public {
        number++;
    }
}
