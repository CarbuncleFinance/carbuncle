'use client'

import { useState } from 'react'
import { useTranslations } from 'next-intl'
import { useSnackbar } from 'notistack'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import { SelectChangeEvent } from '@mui/material/Select'
import { SelectChainTypeForm } from '@/components/ui/forms/SelectChainTypeForm'
import { WalletConnectOptionButton } from '@/components/ui/buttons/WalletConnectOptionButton'
import { useWalletConnect } from '@/hooks/useWalletConnect'
import {
  ChainTypes,
  ChainType,
  WalletTypes,
  WalletType,
  WalletTypeNames
} from '@/types/enums'

type WalletSelectDialogProps = {
  open: boolean
  onClose: () => void
}

const xrplWallets = [
  {
    chainType: ChainTypes.XRPL,
    walletType: WalletTypes.GEM_WALLET,
    name: WalletTypeNames[WalletTypes.GEM_WALLET]
  }
]

const evmWallets = [
  {
    chainType: ChainTypes.EVM,
    walletType: WalletTypes.METAMASK,
    name: WalletTypeNames[WalletTypes.METAMASK]
  }
]

export default function WalletSelectDialog({
  open,
  onClose
}: WalletSelectDialogProps) {
  const t = useTranslations('Dialogs.walletSelectDialog')

  const { enqueueSnackbar } = useSnackbar()

  const { connect } = useWalletConnect()

  /** Select Chain Type */
  const [selectedChainType, setSelectedChainType] = useState<ChainType>(
    ChainTypes.XRPL
  )

  const handleChangeChainType = (event: SelectChangeEvent<ChainType>) => {
    setSelectedChainType(event.target.value as ChainType)
  }

  /** Connect to Wallet */
  const handleConnect = async (walletType: WalletType) => {
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
          <SelectChainTypeForm
            selectedChainType={selectedChainType}
            handleChangeChainType={handleChangeChainType}
          />
          {selectedChainType === ChainTypes.XRPL && (
            <>
              {xrplWallets.map((wallet) => (
                <WalletConnectOptionButton
                  key={wallet.walletType}
                  walletName={wallet.name}
                  onClick={() => handleConnect(wallet.walletType)}
                />
              ))}
            </>
          )}
          {selectedChainType === ChainTypes.EVM && (
            <>
              {evmWallets.map((wallet) => (
                <WalletConnectOptionButton
                  key={wallet.walletType}
                  walletName={wallet.name}
                  onClick={() => handleConnect(wallet.walletType)}
                />
              ))}
            </>
          )}
          <Button variant="outlined" fullWidth onClick={onClose}>
            {t('closeButton')}
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  )
}
