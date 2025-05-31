export interface StepContainerProps {
  children: React.ReactNode
  title: string
}

export interface StepNavigationProps {
  showBack: boolean
  showNext: boolean
  onBack?: () => void
  onNext?: () => void
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

export interface AddressInputStepProps {
  onBack: () => void
  onNext: () => void
}

export interface AmountInputStepProps {
  onBack: () => void
  onNext: () => void
}
