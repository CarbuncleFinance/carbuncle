'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { APP_NAME } from '@/constants/app'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import { useSnackbar } from 'notistack'
import { useWalletConnect } from '@/hooks/useWalletConnect'
import { type WalletType, WalletTypes } from '@/types'

export default function SectionHero() {
  const { enqueueSnackbar } = useSnackbar()

  const { connect } = useWalletConnect()

  const firstMessages = [
    'さあ、次世代のサービスを体験してみましょう',
    'ワクワクのサービス体験をはじめましょう',
    'ドキドキの体験があなたを待ってますよ'
  ]

  const [firstMessage, setFirstMessage] = useState(firstMessages[0])

  /**
   * Connect to wallet
   */
  const handleConnect = async (chainType: WalletType) => {
    try {
      await connect(chainType)
      enqueueSnackbar('Connected to wallet', {
        variant: 'success'
      })
    } catch (error) {
      enqueueSnackbar('Failed to connect to wallet', {
        variant: 'error'
      })
    }
  }

  const showRandomMessage = () => {
    const randomIndex = Math.floor(Math.random() * firstMessages.length)
    setFirstMessage(firstMessages[randomIndex])
  }

  useEffect(() => {
    showRandomMessage()
  }, [])

  return (
    <Box sx={{ textAlign: 'center', my: 26 }}>
      <Typography variant="h6">{APP_NAME}</Typography>
      <Typography variant="h5" sx={{ mb: 4 }}>
        {firstMessage}
      </Typography>
      <Box
        my={2}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 1
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Image
            src="/icons/gemwallet.svg"
            alt="GemWallet"
            width={30}
            height={30}
            style={{ borderRadius: '10%' }}
          />
          <Button
            variant="outlined"
            color="primary"
            size="large"
            disableElevation
            sx={{ ml: 1, width: 400, textTransform: 'none' }}
            onClick={() => handleConnect(WalletTypes.GEM_WALLET)}
          >
            GemWallet
          </Button>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Image
            src="/icons/xumm.webp"
            alt="Xaman"
            width={30}
            height={30}
            style={{ borderRadius: '10%' }}
          />
          <Button
            variant="outlined"
            color="primary"
            size="large"
            disableElevation
            disabled
            sx={{ ml: 1, width: 400, textTransform: 'none' }}
          >
            Xaman
          </Button>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Image
            src="/icons/crossmark.png"
            alt="CROSSMARK"
            width={30}
            height={30}
            style={{ borderRadius: '10%' }}
          />
          <Button
            variant="outlined"
            color="primary"
            size="large"
            disableElevation
            disabled
            sx={{ ml: 1, width: 400, textTransform: 'none' }}
          >
            CROSSMARK
          </Button>
        </Box>
      </Box>
    </Box>
  )
}
