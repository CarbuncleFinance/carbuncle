'use client'

import StepContainer from '../common/StepContainer'
import StepNavigation from '../common/StepNavigation'
import { SelectForm } from '@/components/ui/forms/SelectForm'
import { EvmChainType, EvmChainTypes, EvmChainTypeNames } from '@/types/enums'

const options = Object.values(EvmChainTypes).map((evmChainType) => ({
  value: evmChainType,
  label: EvmChainTypeNames[evmChainType]
}))

type ChainSelectionStepProps = {
  selectedChainType: EvmChainType
  setSelectedChainType: (chainType: EvmChainType) => void
  onBack: () => void
  onNext: () => void
}

export default function ChainSelectionStep({
  selectedChainType,
  setSelectedChainType,
  onBack,
  onNext
}: ChainSelectionStepProps) {
  return (
    <StepContainer title="ネットワークを選択してください。">
      <SelectForm
        label="ネットワーク"
        size="medium"
        options={options}
        selectedValue={selectedChainType}
        setSelectedValue={setSelectedChainType}
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
