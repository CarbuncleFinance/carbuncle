import { xrpToDrops } from 'xrpl'
import type { SendPaymentRequest } from '@gemwallet/api'
import { useForm } from '@tanstack/react-form'
// import { useSendTransaction } from '@/hooks/useSendTransaction'
import { createBridgeMemo, BridgeTypes } from '@/utils/bridge'
import {
  SQUID_ROUTER_CONTRACT,
  BRDGE_GAS_FEE_AMOUT_XRP,
  AXELAR_GATEWAY_WALLET
} from '@/constants/app'
import { WalletTypes } from '@/types/enums'
import { WalletFactory } from '@/libs/adapters/walletFactory'

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
  // const { sendTransaction } = useSendTransaction()

  const form = useForm({
    defaultValues,
    onSubmit: async ({ value }) => {
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
          memos: memos as any
        }

        const adapter = WalletFactory.createAdapter(WalletTypes.GEM_WALLET)
        const result = await adapter.sendBridgeTransaction(transaction)

        console.log('result', result)

        // await sendTransaction(memo)
        console.log('onSubmit', value)
      } catch (error) {
        console.error(error)
        throw error
      }
    }
  })

  return { form }
}
