import { useState } from 'react'
import { z } from 'zod'
import {
  sendPayment,
  isInstalled,
  type SendPaymentRequest,
  type Memo
} from '@gemwallet/api'
import { useForm } from '@tanstack/react-form'
import { xrpToDrops } from 'xrpl'
import {
  createRequestType,
  RequestTypes,
  createDestinationAddress,
  createDestinationChain,
  DestinationChains,
  createGasFeeAmount,
  // createPayload4CallContract,
  createPayload4InterchainTransfer
} from '@/utils/memo'
import {
  AXELAR_GATEWAY_WALLET,
  BRDGE_GAS_FEE_AMOUT_XRP,
  SQUID_ROUTER_CONTRACT,
  SKRRT_ROUTER_CONTRACT
} from '@/constants/app'

const schema = z.object({
  amount: z
    .string()
    .min(1, 'Amount is required')
    .refine((val) => !/[a-zA-Z]/.test(val), {
      message: 'アルファベットは使用できません'
    }),
  evmAddress: z.string().min(1, 'EVM address is required')
})

type SupplyFormValues = {
  amount: string
}

const defaultValues: SupplyFormValues = {
  amount: '2'
}

export const useSupplyForm = (
  address: string,
  onSuccess?: () => void,
  onError?: () => void
) => {
  const [isLoading, setIsLoading] = useState(false)

  const form = useForm({
    defaultValues,
    onSubmit: async ({ value }) => {
      setIsLoading(true)
      try {
        if (!address) {
          throw new Error('Address is required')
        }

        const installed = await isInstalled()

        if (!installed) {
          throw new Error('GemWallet is not installed')
        }

        // Create memos
        const memos: Memo[] = [
          // Request type
          createRequestType(RequestTypes.INTERCHAIN_TRANSFER),
          // Destination address
          createDestinationAddress(SKRRT_ROUTER_CONTRACT.address),
          // Destination chain
          createDestinationChain(DestinationChains.XRPL_EVM),
          // Gas fee amount
          createGasFeeAmount(xrpToDrops(BRDGE_GAS_FEE_AMOUT_XRP).toString()),
          // Payload
          createPayload4InterchainTransfer(address)
        ]

        // Amount
        const amount = xrpToDrops(
          Number(value.amount) + Number(BRDGE_GAS_FEE_AMOUT_XRP)
        ).toString()

        const transaction: SendPaymentRequest = {
          amount,
          destination: AXELAR_GATEWAY_WALLET.address,
          memos
        }

        console.log('transaction: ', transaction)

        const { type, result } = await sendPayment(transaction)

        if (type === 'reject') {
          throw new Error('Transaction failed')
        }

        console.log('result: ', result)

        if (onSuccess) {
          onSuccess()
        }
      } catch (error) {
        console.error('Error submitting form: ', error)
        if (onError) {
          onError()
        }
        throw error
      } finally {
        setIsLoading(false)
      }
    }
  })

  return {
    isLoading,
    form,
    schema
  }
}
