'use client'

import { useState } from 'react'
import { useTranslations } from 'next-intl'
import { useSnackbar } from 'notistack'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import { SelectFormProtocol } from '@/components/ui/forms/SelectFormProtocol'
import { WalletConnectOptionButton } from '@/components/ui/buttons/WalletConnectOptionButton'
import { useWalletConnect } from '@/hooks/useWalletConnect'
import {
  ChainProtocol,
  getDefaultChainForProtocol,
  getSupportedWalletsForProtocol
} from '@/domains/blockchain/types'
import { WalletType, WalletTypeNames } from '@/types/enums'

type WalletSelectDialogProps = {
  open: boolean
  onClose: () => void
}

export default function WalletSelectDialog({
  open,
  onClose
}: WalletSelectDialogProps) {
  const t = useTranslations('Dialogs.walletSelectDialog')

  const { enqueueSnackbar } = useSnackbar()

  const { connectWithChain } = useWalletConnect()

  /** Select Protocol */
  const [selectedProtocol, setSelectedProtocol] = useState<ChainProtocol>(
    ChainProtocol.XRPL
  )

  /** Get supported wallets for selected protocol */
  const supportedWallets = getSupportedWalletsForProtocol(selectedProtocol)

  /** Connect to Wallet */
  const handleConnect = async (walletType: WalletType) => {
    try {
      const selectedChain = getDefaultChainForProtocol(selectedProtocol)
      await connectWithChain(selectedChain, walletType)
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
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, mt: 1 }}>
          <SelectFormProtocol
            selectedProtocol={selectedProtocol}
            setSelectedProtocol={setSelectedProtocol}
          />
          {supportedWallets.map((walletType: WalletType) => (
            <WalletConnectOptionButton
              key={walletType}
              walletName={WalletTypeNames[walletType]}
              onClick={() => handleConnect(walletType)}
            />
          ))}
          <Button variant="outlined" fullWidth onClick={onClose}>
            {t('closeButton')}
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  )
}
