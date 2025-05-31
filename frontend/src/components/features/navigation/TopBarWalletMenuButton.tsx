'use client'

import Button from '@mui/material/Button'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import { useWallet } from '@/hooks/useWallet'

interface TopBarWalletMenuButtonProps {
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void
}

export default function TopBarWalletMenuButton({
  onClick
}: TopBarWalletMenuButtonProps) {
  const { shortAddress } = useWallet()

  return (
    <Button
      variant="outlined"
      color="inherit"
      startIcon={<AccountCircleIcon />}
      sx={{ textTransform: 'none' }}
      onClick={onClick}
    >
      {shortAddress}
    </Button>
  )
}
