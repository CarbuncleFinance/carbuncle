import { useForm } from '@tanstack/react-form'

export type BridgeFormValues = {
  blockchain: string
  address: string
  amount: string
}

const defaultValues: BridgeFormValues = {
  blockchain: '',
  address: '',
  amount: ''
}

export function useBridgeForm() {
  const form = useForm({
    defaultValues
  })

  return { form }
}
