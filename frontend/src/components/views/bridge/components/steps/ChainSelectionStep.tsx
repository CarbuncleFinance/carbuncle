'use client'

import { useTranslations } from 'next-intl'
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
  const t = useTranslations('BridgeContent')

  return (
    <StepContainer title={t('selectNetwork')}>
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
