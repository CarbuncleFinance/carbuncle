export interface StepNavigationProps {
  showBack: boolean
  showNext: boolean
  showExecute?: boolean
  onBack?: () => void
  onNext?: () => void
  onExecute?: () => void
  nextDisabled?: boolean
}

export interface TransferMethodStepProps {
  onNext: () => void
}

export interface BlockchainSelectionStepProps {
  blockchain: string
  setBlockchain: (value: string) => void
  onBack: () => void
  onNext: () => void
}

import { BridgeForm } from '../index'

export interface AddressInputStepProps {
  form: any
  onBack: () => void
  onNext: () => void
}

export interface AmountInputStepProps {
  form: any
  onBack: () => void
  onNext: () => void
}

export interface ConfirmationStepProps {
  bridgeForm: BridgeForm
  onBack: () => void
  onExecute: () => void
}
