import { useState } from 'react'
import { useForm } from '@tanstack/react-form'
import { LIST_ASSETS } from '@/constants/app'
import { useWallet } from '@/hooks/useWallet'
import { XrplClient } from '@/libs/xrplClient'
import { createBridgeMemo, BridgeTypes } from '@/utils/bridge'
import {
  SQUID_ROUTER_CONTRACT,
  BRDGE_GAS_FEE_AMOUT_XRP,
  AXELAR_GATEWAY_WALLET
} from '@/constants/app'
import { xrpToDrops } from 'xrpl'
import { z } from 'zod'
import { SendPaymentRequest } from '@gemwallet/api'
import { isInstalled, sendPayment } from '@gemwallet/api'

type Tokens = {
  name: string
  symbol: string
  icon: string
  address: string
  apy: number
  collateral: boolean
  healthFactor: number
  balance: number
}

type LendingSupplyFormValues = {
  amount: string
  evmAddress: string
}

const formSchema = z.object({
  amount: z
    .string()
    .min(1, 'Amount is required')
    .refine((val) => !/[a-zA-Z]/.test(val), {
      message: 'アルファベットは使用できません'
    }),
  evmAddress: z.string().min(1, 'EVM address is required')
})

const defaultValues: LendingSupplyFormValues = {
  amount: '1',
  evmAddress: '0xEE36B95F8282936E75037C88BDddAa20e15482D1'
}

export const useLendingSupply = (onSuccess?: () => void, onError?: () => void) => {
  const [data, setData] = useState<Tokens[]>([])
  const [isLoading, setIsLoading] = useState(false)

  const { address } = useWallet()

  const form = useForm({
    defaultValues,
    onSubmit: async ({ value }) => {
      setIsLoading(true)
      try {
        const memos = createBridgeMemo({
          bridgeType: BridgeTypes.INTERCHAIN_TRANSFER,
          destinationAddress: SQUID_ROUTER_CONTRACT.address,
          destinationChain: 'xrpl-evm',
          gasFeeAmount: xrpToDrops(BRDGE_GAS_FEE_AMOUT_XRP).toString(),
          toAddress: value.evmAddress
        })

        const transaction: SendPaymentRequest = {
          amount: xrpToDrops(
            Number(value.amount) + Number(BRDGE_GAS_FEE_AMOUT_XRP)
          ).toString(),
          destination: AXELAR_GATEWAY_WALLET.address,
          memos: memos
        }

        const installed = await isInstalled()
        if (!installed) {
          throw new Error('GemWallet is not installed')
        }

        const { type, result } = await sendPayment(transaction)

        if (type === 'reject') {
          throw new Error('Transaction failed')
        }

        console.log('result: ', result)
        
        if (onSuccess) {
          onSuccess()
        }
      } catch (error) {
        console.error(error)
        if (onError) {
          onError()
        }
        throw error
      } finally {
        setIsLoading(false)
      }
    }
  })

  const fetchData = async () => {
    console.log('address: ', address)

    const xrplClient = new XrplClient()
    const balances = await xrplClient.getAllBalances(address)

    const tokens = LIST_ASSETS.map((token) => {
      let balance = 0

      if (token.symbol === 'XRP') {
        balance =
          balances.find((balance: any) => balance.symbol === 'XRP')?.balance ??
          0
      } else {
        balance =
          balances.find((balance: any) => balance.symbol === token.symbol)
            ?.balance ?? 0
      }

      return {
        ...token,
        apy: 0,
        collateral: true,
        healthFactor: 0,
        balance: balance ?? 0
      }
    })

    setData(tokens)
  }

  return {
    data,
    form,
    formSchema,
    isLoading,
    fetchData
  }
}
