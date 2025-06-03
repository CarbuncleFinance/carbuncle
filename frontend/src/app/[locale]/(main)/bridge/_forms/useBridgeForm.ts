import { useForm } from '@tanstack/react-form'
import { useSendTransaction } from '@/hooks/useSendTransaction'

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
        await sendTransaction(value)
        console.log('onSubmit', value)
      } catch (error) {
        console.error(error)
        throw error
      }
    }
  })

  return { form }
}
