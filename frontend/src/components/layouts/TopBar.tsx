'use client'

import { useState } from 'react'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/navigation'
import { useTranslations } from 'next-intl'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import { APP_NAME } from '@/constants/app'
import LangSwitchButton from '@/components/ui/buttons/LangSwitchButton'
import TopBarWalletMenu from '@/components/layouts/TopBarWalletMenu'
import TopBarWalletMenuButton from '@/components/layouts/TopBarWalletMenuButton'
import WalletSelectDialog from '@/components/ui/dialogs/WalletSelectDialog'
import { useWallet } from '@/hooks/useWallet'

const menus = [
  {
    href: '/bridge',
    label: 'bridge'
  },
  {
    href: '/dev',
    label: 'dev'
  }
]

const AppBar = dynamic(
  () => import('@mui/material/AppBar').then((mod) => mod.default),
  { ssr: false }
)

export default function TopBar() {
  const router = useRouter()

  const t = useTranslations('Navigation')

  /* Router */
  const handleGoTo = (path: string) => {
    router.push(path)
  }

  /* Wallet */
  const { isConnected } = useWallet()

  /* Wallet Menu */
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  /* Wallet Select Dialog */
  const [openWalletSelectDialog, setOpenWalletSelectDialog] = useState(false)

  const handleOpenWalletSelectDialog = (
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    e.currentTarget.blur()
    setOpenWalletSelectDialog(true)
  }

  const handleCloseWalletSelectDialog = () => {
    setOpenWalletSelectDialog(false)
  }

  /* UI Link Button */
  const LinkButton = ({ href, label }: { href: string; label: string }) => {
    return (
      <Button
        variant="text"
        color="inherit"
        sx={{ display: 'block' }}
        onClick={() => handleGoTo(href)}
      >
        {label}
      </Button>
    )
  }

  return (
    <AppBar position="fixed" elevation={0}>
      <Toolbar>
        <Typography
          variant="h6"
          sx={{ mr: 2, fontWeight: '200', cursor: 'pointer' }}
          onClick={() => handleGoTo('/')}
        >
          {APP_NAME}
        </Typography>
        <Box sx={{ flexGrow: 1, display: 'flex', gap: 1 }}>
          {menus.map(({ href, label }) => (
            <LinkButton key={href} href={href} label={label} />
          ))}
        </Box>
        <Box sx={{ display: 'flex', gap: 1 }}>
          <LangSwitchButton />
          {isConnected && (
            <>
              <TopBarWalletMenuButton onClick={handleClick} />
              <TopBarWalletMenu
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
              />
            </>
          )}
          {!isConnected && (
            <WalletSelectDialog
              open={openWalletSelectDialog}
              onOpen={(e) => handleOpenWalletSelectDialog(e)}
              onClose={handleCloseWalletSelectDialog}
            />
          )}
        </Box>
      </Toolbar>
    </AppBar>
  )
}
