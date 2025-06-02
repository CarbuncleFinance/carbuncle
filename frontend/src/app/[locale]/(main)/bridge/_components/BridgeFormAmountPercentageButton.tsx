'use client'

import Button from '@mui/material/Button'

type BridgeFormAmountPercentageButtonProps = {
  percentage: number
  handlePercentageClick: (percentage: number) => void
  balance: number
  isBalanceLoading: boolean
}

export default function BridgeFormAmountPercentageButton({
  percentage,
  handlePercentageClick,
  balance,
  isBalanceLoading
}: BridgeFormAmountPercentageButtonProps) {
  return (
    <Button
      key={percentage}
      variant="outlined"
      size="small"
      onClick={() => handlePercentageClick(percentage)}
      disabled={!balance || isBalanceLoading}
    >
      {percentage}%
    </Button>
  )
}
