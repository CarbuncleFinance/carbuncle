'use client'

import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import {
  isInstalled,
  setAccount,
  setTrustline,
  type SetAccountRequest,
  type SendPaymentRequest,
  type SetTrustlineRequest,
  sendPayment
} from '@gemwallet/api'
import { Wallet } from 'xrpl'
import { XrplClient } from '@/libs/xrplClient'

export default function DevContent() {
  const handleSetAccount = async () => {
    try {
      const { result: isInstalledResult } = await isInstalled()

      if (!isInstalledResult) {
        throw new Error('Wallet not installed')
      }

      const request: SetAccountRequest = {
        setFlag: 8
      }

      const { result: setAccountResult } = await setAccount(request)

      console.log('setAccountResult', setAccountResult)
    } catch (error) {
      console.error(error)
    }
  }

  const handleSetTrust = async () => {
    try {
      const response: SetTrustlineRequest = {
        limitAmount: {
          currency: 'XCB',
          issuer: 'rN72avu22PqxSCRSzP4BRRHUCNodoeCnD5',
          value: '1000000000000000000000'
        }
      }

      const { result: setTrustlineResult } = await setTrustline(response)

      console.log('setTrustlineResult', setTrustlineResult)
    } catch (error) {
      console.error(error)
    }
  }

  const handleFaucet = async () => {
    try {
      console.log('== handleClick ==')
      const installed = await isInstalled()
      if (!installed) {
        throw new Error('Wallet not installed')
      }

      const transaction: SendPaymentRequest = {
        amount: {
          currency: 'XCB',
          issuer: 'rN72avu22PqxSCRSzP4BRRHUCNodoeCnD5',
          value: '99800'
        },
        destination: 'rMX17FBE5svy7d8DMraRFHRcUUniH3Heqx'
      }

      const result = await sendPayment(transaction)
      console.log('result', result)
    } catch (error) {
      console.error(error)
    }
  }

  const handleSendMessage = async () => {
    try {
      console.log('== handleSendMessage ==')
      const wallet = Wallet.generate()
      console.log('wallet', wallet)

      const xrplClient = new XrplClient()
      const fundedWallet = await xrplClient.fundWallet(
        'rnjyMRQTM2eYJcrjm1hXdfaUY6vhjAk4pC',
        wallet
      )
      console.log('fundedWallet', fundedWallet)

      const balance = await xrplClient.getNativeBalance(wallet.address)
      console.log('balance', balance)
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <>
      <Box>ウォレット接続テスト</Box>
      <Box sx={{ display: 'flex', gap: 2 }}>
        <Button
          variant="contained"
          color="primary"
          disableElevation
          onClick={handleSetAccount}
        >
          Set Account
        </Button>
        <Button
          variant="contained"
          color="primary"
          disableElevation
          onClick={handleSetTrust}
        >
          Set Trust
        </Button>
        <Button
          variant="contained"
          color="primary"
          disableElevation
          onClick={handleFaucet}
        >
          Faucet
        </Button>
        <Button
          variant="contained"
          color="primary"
          disableElevation
          onClick={handleSendMessage}
        >
          Send Message
        </Button>
      </Box>
    </>
  )
}
