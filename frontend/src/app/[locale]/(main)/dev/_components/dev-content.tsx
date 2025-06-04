'use client'

import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import {
  isInstalled,
  type SendPaymentRequest,
  sendPayment
} from '@gemwallet/api'

export default function DevContent() {
  const handleClick = async () => {
    try {
      console.log('== handleClick ==')
      const installed = await isInstalled()
      if (!installed) {
        throw new Error('Wallet not installed')
      }

      const transaction: SendPaymentRequest = {
        amount: '1000000',
        destination: 'rLWQskMM8EoPxaLsmuQxE5rYeP4uX7dhym'
      }

      const result = await sendPayment(transaction)
      console.log('result', result)
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <Box>
      <Button variant="contained" color="primary" onClick={handleClick}>
        Test
      </Button>
    </Box>
  )
}
