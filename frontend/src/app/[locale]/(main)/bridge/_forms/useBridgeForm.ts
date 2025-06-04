import { useState } from 'react'
import { xrpToDrops } from 'xrpl'
import type { SendPaymentRequest } from '@gemwallet/api'
import { useForm } from '@tanstack/react-form'
import { useDatabase } from '@/hooks/useDatabase'
import { createBridgeMemo, BridgeTypes } from '@/utils/bridge'
import {
  SQUID_ROUTER_CONTRACT,
  BRDGE_GAS_FEE_AMOUT_XRP,
  AXELAR_GATEWAY_WALLET
} from '@/constants/app'
import { AppErrorCode, WalletTypes } from '@/types/enums'
import { WalletFactory } from '@/libs/adapters/walletFactory'
import { useErrorHandler } from '@/hooks/useErrorHandler'

export type BridgeFormValues = {
  chain: string
  address: string
  amount: string
}

const defaultValues: BridgeFormValues = {
  chain: 'xrpl-evm',
  address: '',
  amount: ''
}

export function useBridgeForm() {
  const db = useDatabase()
  const { createError } = useErrorHandler()
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const form = useForm({
    defaultValues,
    onSubmit: async ({ value }) => {
      setIsLoading(true)
      setIsSuccess(false)
      try {
        const memos = createBridgeMemo({
          bridgeType: BridgeTypes.INTERCHAIN_TRANSFER,
          destinationAddress: SQUID_ROUTER_CONTRACT.address,
          destinationChain: value.chain,
          gasFeeAmount: xrpToDrops(BRDGE_GAS_FEE_AMOUT_XRP).toString(),
          toAddress: value.address
        })

        const transaction: SendPaymentRequest = {
          amount: xrpToDrops(
            Number(value.amount) + Number(BRDGE_GAS_FEE_AMOUT_XRP)
          ).toString(),
          destination: AXELAR_GATEWAY_WALLET.address,
          memos: memos
        }

        const adapter = WalletFactory.createAdapter(WalletTypes.GEM_WALLET)
        const result = await adapter.sendBridgeTransaction(transaction)

        if (result === undefined) {
          throw createError(AppErrorCode.BRIDGE_TRANSACTION_FAILED)
        }

        const wallet = await db.wallet.getOrCreate({ address: value.address })
        if (!wallet) {
          throw createError(AppErrorCode.DATABASE_ERROR)
        }

        const tx = await db.transactions.create({ walletId: wallet.id, hash: result.result.hash })
        if (!tx) {
          throw createError(AppErrorCode.DATABASE_ERROR)
        }

        setIsSuccess(true)
      } catch (error) {
        console.error(error)
        setIsSuccess(false)
        throw error
      } finally {
        setIsLoading(false)
      }
    }
  })

  return { form, isLoading, isSuccess, resetSuccess: () => setIsSuccess(false) }
}
