'use client'

import { useTranslations } from 'next-intl'
import { SelectFormChain } from '@/components/ui/forms/SelectFormChain'
import StepContainer from '@/components/ui/steppers/StepContainer'
import StepNavigation from '@/components/ui/steppers/StepNavigation'
import { Chain } from '@/domains/blockchain/types'

type StepContainerChainInputProps = {
  selectedChain: Chain
  setSelectedChain: (chain: Chain) => void
  onBack: () => void
  onNext: () => void
}

export default function StepContainerChainInput({
  selectedChain,
  setSelectedChain,
  onBack,
  onNext
}: StepContainerChainInputProps) {
  const t = useTranslations('BridgeContent')

  return (
    <StepContainer title={t('selectNetwork')}>
      <SelectFormChain
        selectedChain={selectedChain}
        setSelectedChain={setSelectedChain}
        size="medium"
      />
      <StepNavigation
        showBack={false}
        showNext={true}
        onBack={onBack}
        onNext={onNext}
      />
    </StepContainer>
  )
}
