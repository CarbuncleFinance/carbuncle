'use client'

import Button from '@mui/material/Button'

type WalletConnectOptionButtonProps = {
  walletName: string
  onClick: () => void
}

export const WalletConnectOptionButton = ({
  walletName,
  onClick
}: WalletConnectOptionButtonProps) => {
  return (
    <Button variant="contained" fullWidth disableElevation onClick={onClick}>
      {walletName}
    </Button>
  )
}
