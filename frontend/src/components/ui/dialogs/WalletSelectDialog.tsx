'use client'

import { useState } from 'react'
import { useTranslations } from 'next-intl'
import { useSnackbar } from 'notistack'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import { SelectFormChain } from '@/components/ui/forms/SelectFormChain'
import { WalletConnectOptionButton } from '@/components/ui/buttons/WalletConnectOptionButton'
import { useWalletConnect } from '@/hooks/useWalletConnect'
import { Chain, ETHEREUM_MAINNET } from '@/domains/blockchain/types'
import { WalletFactory } from '@/libs/adapters/walletFactory'
import {
  WalletTypes,
  WalletType,
  WalletTypeNames
} from '@/types/enums'

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

  /** Select Chain */
  const [selectedChain, setSelectedChain] = useState<Chain>(ETHEREUM_MAINNET)

  /** Get supported wallets for selected chain */
  const supportedWallets = WalletFactory.getSupportedWalletsForChain(selectedChain)

  /** Connect to Wallet */
  const handleConnect = async (walletType: WalletType) => {
    try {
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
          <SelectFormChain
            selectedChain={selectedChain}
            setSelectedChain={setSelectedChain}
          />
          {supportedWallets.map((walletType) => (
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
