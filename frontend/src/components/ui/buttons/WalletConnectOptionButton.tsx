'use client'

import { useTranslations } from 'next-intl'
import Button from '@mui/material/Button'

type WalletConnectOptionButtonProps = {
  walletName: string
  onClick: () => void
}

export const WalletConnectOptionButton = ({
  walletName,
  onClick
}: WalletConnectOptionButtonProps) => {
  const t = useTranslations('Buttons.walletConnectOptionButton')

  return (
    <Button variant="contained" fullWidth disableElevation onClick={onClick}>
      {walletName}
    </Button>
  )
}
