import type { BridgeFormApi } from '@/app/[locale]/(main)/bridge/_types'
import { bridgeFormSchema } from '@/app/[locale]/(main)/bridge/_forms/bridgeFormSchema'

export const validateAndProceed = (
  form: BridgeFormApi,
  fieldName: keyof typeof bridgeFormSchema.shape,
  onNext: () => void
) => {
  form.validateField(fieldName, 'change')
  const field = form.getFieldMeta(fieldName)
  if (!field?.errors?.length) {
    onNext()
  }
}

export const createFieldValidator = (
  fieldName: keyof typeof bridgeFormSchema.shape
) => {
  return ({ value }: { value: string }) => {
    const result = bridgeFormSchema.shape[fieldName].safeParse(value)
    return result.success ? undefined : result.error.issues[0]?.message
  }
}
