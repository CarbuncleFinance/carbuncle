// SPDX-License-Identifier: MIT
pragma solidity ^0.8.30;

/**
 * @title ReflectionMath
 * @dev Math for reflection token
 */
library ReflectionMath {
    /**
     * @dev Calculate tax fee
     * @param amount The amount to calculate tax fee
     * @param taxFee The tax fee
     * @return The tax fee
     */
    function calculateTaxFee(uint256 amount, uint8 taxFee) internal pure returns (uint256) {
        return (amount * taxFee) / 100;
    }

    /**
     * @dev Calculate rate
     * @param rSupply The r supply
     * @param tSupply The t supply
     * @return The rate
     */
    function calculateRate(uint256 rSupply, uint256 tSupply) internal pure returns (uint256) {
        return rSupply / tSupply;
    }

    /**
     * @dev Calculate reflection amount
     * @param tAmount The t amount
     * @param currentRate The current rate
     * @return The reflection amount
     */
    function calculateReflectionAmount(uint256 tAmount, uint256 currentRate) internal pure returns (uint256) {
        return tAmount * currentRate;
    }
}
