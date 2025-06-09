import type { ReactFormExtendedApi } from '@tanstack/react-form'
import type { BridgeFormValues } from '@/app/[locale]/(main)/bridge/_forms/useBridgeForm'

export type BridgeFormApi = ReactFormExtendedApi<
  BridgeFormValues,
  any,
  any,
  any,
  any,
  any,
  any,
  any,
  any,
  any
>

export interface BaseBridgeStepProps {
  form: BridgeFormApi
  onBack: () => void
  onNext: () => void
}

export interface BridgeStepWithExecuteProps extends BaseBridgeStepProps {
  onExecute: () => void
  isLoading?: boolean
}
