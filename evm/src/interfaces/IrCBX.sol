// SPDX-License-Identifier: MIT
pragma solidity ^0.8.30;

/**
 * @title IrCBX
 * @dev Interface for the rCBX reflection token contract
 */
interface IrCBX {
    /**
     * @notice Returns the balance of a given account (including reflection logic)
     */
    function balanceOf(address account) external view returns (uint256);

    /**
     * @notice Returns the total amount of fees collected by the contract
     */
    function totalFees() external view returns (uint256);

    /**
     * @notice Delivers tokens from the sender to be distributed as reflection
     * @param tAmount The amount of tokens to deliver
     */
    function deliver(uint256 tAmount) external;

    /**
     * @notice Returns true if the account is excluded from reward (reflection)
     */
    function isRewardExcluded(address account) external view returns (bool);

    /**
     * @notice Converts a reflected amount to the actual token amount
     * @param rAmount The reflected amount
     */
    function tokenFromReflection(uint256 rAmount) external view returns (uint256);

    /**
     * @notice Converts a token amount to the reflected amount, with optional fee deduction
     * @param tAmount The token amount
     * @param deductTransferFee Whether to deduct the transfer fee
     */
    function reflectionFromToken(uint256 tAmount, bool deductTransferFee) external view returns (uint256);

    /**
     * @notice Sets the tax fee percent (owner only)
     * @param taxFeePercent The new tax fee percent
     */
    function setTaxFeePercent(uint8 taxFeePercent) external;

    /**
     * @notice Sets the max transaction percent (owner only)
     * @param maxTxPercent The new max transaction percent
     */
    function setMaxTxPercent(uint256 maxTxPercent) external;

    /**
     * @notice Excludes an account from reward (owner only)
     * @param account The account to exclude
     */
    function excludeFromReward(address account) external;

    /**
     * @notice Includes an account in reward (owner only)
     * @param account The account to include
     */
    function includeInReward(address account) external;

    /**
     * @notice Excludes an account from fee (owner only)
     * @param account The account to exclude
     */
    function excludeFromFee(address account) external;

    /**
     * @notice Includes an account in fee (owner only)
     * @param account The account to include
     */
    function includeInFee(address account) external;
}
