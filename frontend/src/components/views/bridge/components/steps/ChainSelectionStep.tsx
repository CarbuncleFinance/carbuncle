'use client'

import StepContainer from '../common/StepContainer'
import StepNavigation from '../common/StepNavigation'
import { SelectFormChain } from '@/components/ui/forms/SelectFormChain'
import { Chain } from '@/domains/blockchain/types'

type ChainSelectionStepProps = {
  selectedChain: Chain
  setSelectedChain: (chain: Chain) => void
  onBack: () => void
  onNext: () => void
}

export default function ChainSelectionStep({
  selectedChain,
  setSelectedChain,
  onBack,
  onNext
}: ChainSelectionStepProps) {
  return (
    <StepContainer title="ネットワークを選択してください。">
      <SelectFormChain
        selectedChain={selectedChain}
        setSelectedChain={setSelectedChain}
        size="medium"
      />
      <StepNavigation
        showBack={true}
        showNext={true}
        onBack={onBack}
        onNext={onNext}
      />
    </StepContainer>
  )
}
