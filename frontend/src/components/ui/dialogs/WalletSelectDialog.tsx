'use client'

import { useTranslations } from 'next-intl'
import Image from 'next/image'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import CardActionArea from '@mui/material/CardActionArea'
import Typography from '@mui/material/Typography'
import { useWalletConnect } from '@/hooks/useWalletConnect'
import IconButton from '@mui/material/IconButton'
import CloseIcon from '@mui/icons-material/Close'
import Grid from '@mui/material/Grid'
import BaseButton from '@/components/ui/buttons/BaseButton'
import { type WalletType, WalletTypes, WalletTypeNames } from '@/types'
import { useNotification, NotificationVariant } from '@/hooks/useNotification'

type WalletSelectDialogProps = {
  open: boolean
  onOpen: (e: React.MouseEvent<HTMLButtonElement>) => void
  onClose: () => void
}

export default function WalletSelectDialog({
  open,
  onOpen,
  onClose
}: WalletSelectDialogProps) {
  const t = useTranslations('Dialogs.walletSelectDialog')

  const { showNotification } = useNotification()

  const { connect } = useWalletConnect()

  /** Connect to Wallet */
  const handleConnect = async (walletType: WalletType) => {
    try {
      await connect(walletType)

      showNotification('Connected to wallet', NotificationVariant.SUCCESS)
    } catch (error) {
      console.error(error)
      showNotification('Failed to connect to wallet', NotificationVariant.ERROR)
    } finally {
      onClose()
    }
  }

  const WalletCardButton = ({
    type,
    icon,
    name
  }: { type: WalletType; icon: string; name: string }): React.ReactNode => {
    return (
      <Grid size={4}>
        <Card variant="outlined">
          <CardActionArea onClick={() => handleConnect(type)}>
            <CardContent
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 1,
                mt: 1
              }}
            >
              <Image src={icon} alt={name} width={30} height={30} />
              <Typography variant="body2" sx={{ fontWeight: 'semibold' }}>
                {name}
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      </Grid>
    )
  }

  return (
    <>
      <BaseButton
        label="Buttons.walletConnectButton"
        variant="outlined"
        color="inherit"
        onClick={onOpen}
      />
      <Dialog open={open} onClose={onClose} fullWidth maxWidth="xs">
        <DialogTitle sx={{ fontSize: 16 }}>{t('title')}</DialogTitle>
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8
          }}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent dividers>
          <Grid container spacing={1}>
            {[
              {
                type: WalletTypes.GEM_WALLET,
                icon: '/icons/gemwallet.svg',
                name: WalletTypeNames[WalletTypes.GEM_WALLET]
              },
              {
                type: WalletTypes.XUMM,
                icon: '/icons/xumm.webp',
                name: WalletTypeNames[WalletTypes.XUMM]
              },
              {
                type: WalletTypes.CROSSMARK,
                icon: '/icons/crossmark.png',
                name: WalletTypeNames[WalletTypes.CROSSMARK]
              }
            ].map((wallet) => (
              <WalletCardButton
                key={wallet.name}
                type={wallet.type}
                icon={wallet.icon}
                name={wallet.name}
              />
            ))}
          </Grid>
          <Box sx={{ mt: 2 }}>
            <Typography
              variant="body2"
              sx={{ textAlign: 'center', color: 'text.secondary' }}
            >
              Choosing to connect indicates that you have accepted
            </Typography>
            <Box sx={{ display: 'flex', gap: 1, justifyContent: 'center' }}>
              <Button variant="text" size="small" sx={{ px: 1 }}>
                Terms of Service
              </Button>
              <Button variant="text" size="small" sx={{ px: 1 }}>
                Privacy Policy
              </Button>
            </Box>
          </Box>
        </DialogContent>
      </Dialog>
    </>
  )
}
