'use client'

import { useTranslations } from 'next-intl'
import { useSnackbar } from 'notistack'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import { useWalletConnect } from '@/hooks/useWalletConnect'
import { useMultiWalletConnect } from '@/hooks/useMultiWalletConnect'
import { XrplWalletTypes, XrplWalletType } from '@/types/enums'
import { WalletType } from '@/types/wallet'

interface WalletSelectDialogProps {
  open: boolean
  onClose: () => void
}

export default function WalletSelectDialog({
  open,
  onClose
}: WalletSelectDialogProps) {
  const t = useTranslations('Dialogs.walletSelectDialog')

  const { enqueueSnackbar } = useSnackbar()

  const { connect } = useWalletConnect()
  const { connect: multiConnect, getSupportedWallets } = useMultiWalletConnect()

  const handleConnect = async (walletType: XrplWalletType) => {
    try {
      await connect(walletType)
      enqueueSnackbar('Connected to wallet', {
        variant: 'success'
      })
    } catch (error) {
      console.error(error)
      enqueueSnackbar('Failed to connect to wallet', {
        variant: 'error'
      })
    } finally {
      onClose()
    }
  }

  const handleMultiWalletConnect = async (walletType: WalletType) => {
    try {
      await multiConnect(walletType)
      enqueueSnackbar('Connected to wallet', {
        variant: 'success'
      })
    } catch (error) {
      console.error(error)
      enqueueSnackbar('Failed to connect to wallet', {
        variant: 'error'
      })
    } finally {
      onClose()
    }
  }

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="xs"
      slotProps={{
        paper: {
          sx: {
            backgroundColor: '#1a1a1a'
          }
        }
      }}
    >
      <DialogTitle sx={{ color: '#fff', textAlign: 'center' }}>
        {t('title')}
      </DialogTitle>
      <DialogContent>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
          <Button
            variant="contained"
            fullWidth
            disableElevation
            onClick={() => handleConnect(XrplWalletTypes.GEM_WALLET)}
          >
            GemWallet (XRPL)
          </Button>
          <Button
            variant="contained"
            fullWidth
            disableElevation
            onClick={() => handleMultiWalletConnect(WalletType.EVM_INJECTED)}
          >
            MetaMask (EVM)
          </Button>
          <Button
            variant="contained"
            fullWidth
            disableElevation
            disabled
            onClick={() => handleMultiWalletConnect(WalletType.SUI_WALLET)}
          >
            Sui Wallet (Coming Soon)
          </Button>
          <Button variant="outlined" fullWidth onClick={onClose}>
            {t('closeButton')}
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  )
}
