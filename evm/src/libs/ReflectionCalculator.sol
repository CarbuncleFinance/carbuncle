// SPDX-License-Identifier: MIT
pragma solidity ^0.8.30;

import { ReflectionMath } from './ReflectionMath.sol';

/**
 * @title ReflectionCalculator
 * @dev Calculator for reflection token
 */
library ReflectionCalculator {
    using ReflectionMath for uint256;

    /**
     * @dev Values for reflection token
     */
    struct Values {
        uint256 rAmount;
        uint256 rTransferAmount;
        uint256 rFee;
        uint256 tTransferAmount;
        uint256 tFee;
    }

    /**
     * @dev Get values for reflection token
     * @param tAmount The t amount
     * @param taxFee The tax fee
     * @param currentRate The current rate
     * @return The values
     */
    function getValues(
        uint256 tAmount,
        uint8 taxFee,
        uint256 currentRate
    ) internal pure returns (Values memory) {
        Values memory values;
        values.tFee = tAmount.calculateTaxFee(taxFee);
        values.tTransferAmount = tAmount - values.tFee;
        values.rAmount = tAmount.calculateReflectionAmount(currentRate);
        values.rFee = values.tFee.calculateReflectionAmount(currentRate);
        values.rTransferAmount = values.rAmount - values.rFee;
        return values;
    }
}
