'use client'

import { useMemo } from 'react'
import Button from '@mui/material/Button'
import { useWallet } from '@/hooks/useWallet'
import Avatar from '@mui/material/Avatar'
import { ChainTypes } from '@/types/enums'

interface TopBarWalletMenuButtonProps {
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void
}

export default function TopBarWalletMenuButton({
  onClick
}: TopBarWalletMenuButtonProps) {
  const { shortAddress, chainType } = useWallet()

  const walletIcon = useMemo(() => {
    switch (chainType) {
      case ChainTypes.XRPL:
        return '/images/xrpl-logo.png'
      case ChainTypes.EVM:
        return '/images/MetaMask-icon-fox.svg'
      default:
        return '/images/xrpl-logo.png'
    }
  }, [chainType])

  return (
    <Button
      variant="outlined"
      color="inherit"
      startIcon={
        <Avatar
          variant="square"
          src={walletIcon}
          sx={{ width: 24, height: 24 }}
        />
      }
      sx={{ textTransform: 'none' }}
      onClick={onClick}
    >
      {shortAddress}
    </Button>
  )
}
