'use client'

import { useTranslations } from 'next-intl'
import BaseButton from '@/components/ui/buttons/BaseButton'

export default function WalletConnectButton() {
  const t = useTranslations('WalletConnectButton')

  return (
    <BaseButton
      translations="WalletConnectButton"
      label="label"
      variant="outlined"
      color="inherit"
    />
  )
}
