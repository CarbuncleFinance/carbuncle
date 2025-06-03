import { xrpToDrops } from 'xrpl'
import { useForm } from '@tanstack/react-form'
import { useSendTransaction } from '@/hooks/useSendTransaction'
import { createBridgeMemo, BridgeTypes } from '@/utils/bridge'
import { SQUID_ROUTER_CONTRACT, BRDGE_GAS_FEE_AMOUT_XRP } from '@/constants/app'

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
  const { sendTransaction } = useSendTransaction()

  const form = useForm({
    defaultValues,
    onSubmit: async ({ value }) => {
      try {
        const memo = createBridgeMemo({
          bridgeType: BridgeTypes.INTERCHAIN_TRANSFER,
          destinationAddress: SQUID_ROUTER_CONTRACT.address,
          destinationChain: value.chain,
          gasFeeAmount: xrpToDrops(BRDGE_GAS_FEE_AMOUT_XRP).toString(),
          toAddress: value.address
        })

        console.log('memo', memo)

        await sendTransaction(memo)
        console.log('onSubmit', value)
      } catch (error) {
        console.error(error)
        throw error
      }
    }
  })

  return { form }
}
