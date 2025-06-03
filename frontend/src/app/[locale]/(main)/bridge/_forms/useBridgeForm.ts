import { useForm } from '@tanstack/react-form'

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
  const form = useForm({
    defaultValues,
    onSubmit: ({ value }) => {
      try {
        console.log('onSubmit', value)
      } catch (error) {
        console.error(error)
        throw error
      }
    }
  })

  return { form }
}
