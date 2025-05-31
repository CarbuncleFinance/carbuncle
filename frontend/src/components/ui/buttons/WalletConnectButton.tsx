'use client'

import BaseButton from '@/components/ui/buttons/BaseButton'

interface WalletConnectButtonProps {
  onClick: () => void
}

export default function WalletConnectButton({
  onClick
}: WalletConnectButtonProps) {
  return (
    <BaseButton
      label="Buttons.walletConnectButton"
      variant="outlined"
      color="inherit"
      onClick={onClick}
    />
  )
}
