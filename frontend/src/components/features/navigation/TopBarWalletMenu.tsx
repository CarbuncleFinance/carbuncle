'use client'

import { useTranslations } from 'next-intl'
// import Divider from '@mui/material/Divider'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import Typography from '@mui/material/Typography'
import { useWalletConnect } from '@/hooks/useWalletConnect'

interface TopBarWalletMenuProps {
  anchorEl: HTMLElement | null
  open: boolean
  onClose: () => void
}

export default function TopBarWalletMenu({
  anchorEl,
  open,
  onClose
}: TopBarWalletMenuProps) {
  const t = useTranslations('Menus.walletMenu')

  const { disconnect } = useWalletConnect()

  const handleLogout = () => {
    disconnect()
    onClose()
  }

  return (
    <Menu
      id="wallet-menu"
      anchorEl={anchorEl}
      open={open}
      onClose={onClose}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'left'
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'left'
      }}
      sx={{
        '& .MuiPaper-root': {
          backgroundColor: '#1a1a1a'
        }
      }}
    >
      <MenuItem dense>
        <Typography
          variant="inherit"
          sx={{ color: '#fff', cursor: 'pointer' }}
          onClick={handleLogout}
        >
          {t('logout')}
        </Typography>
      </MenuItem>
    </Menu>
  )
}
