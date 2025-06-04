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
import TopBarChainModeText from '@/components/features/navigation/TopBarChainModeText'
import TopBarWalletMenu from '@/components/features/navigation/TopBarWalletMenu'
import TopBarWalletMenuButton from '@/components/features/navigation/TopBarWalletMenuButton'
import WalletConnectButton from '@/components/ui/buttons/WalletConnectButton'
import WalletSelectDialog from '@/components/ui/dialogs/WalletSelectDialog'
import { useWallet } from '@/hooks/useWallet'

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
    <AppBar position="fixed" elevation={0} sx={{ backgroundColor: '#000000' }}>
      <Toolbar>
        <Typography
          variant="h6"
          sx={{ mr: 2, cursor: 'pointer' }}
          onClick={() => handleGoTo('/')}
        >
          {APP_NAME}
        </Typography>
        <Box sx={{ flexGrow: 1, display: 'flex', gap: 1 }}>
          {[
            {
              href: '/bridge',
              label: t('bridge')
            },
            {
              href: '/dev',
              label: t('dev')
            }
          ].map(({ href, label }) => (
            <LinkButton key={href} href={href} label={label} />
          ))}
        </Box>
        <Box sx={{ display: 'flex', gap: 1 }}>
          {isConnected && <TopBarChainModeText />}
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
            <>
              <WalletConnectButton
                onClick={(e) => handleOpenWalletSelectDialog(e)}
              />
              <WalletSelectDialog
                open={openWalletSelectDialog}
                onClose={handleCloseWalletSelectDialog}
              />
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  )
}
