'use client'

import { useTranslations } from 'next-intl'
import BridgeStepContainer from '@/app/[locale]/(main)/bridge/_components/shared/BridgeStepContainer'
import BridgeStepDescription from '@/app/[locale]/(main)/bridge/_components/shared/BridgeStepDescription'
import BridgeStepNavigation from '@/app/[locale]/(main)/bridge/_components/shared/BridgeStepNavigation'
import { Chain, XRPLEVM_TESTNET } from '@/domains/blockchain/types'
import { SelectForm } from '@/components/ui/forms/SelectForm'
import type { ReactFormExtendedApi } from '@tanstack/react-form'
import type { BridgeFormValues } from '@/app/[locale]/(main)/bridge/_forms/useBridgeForm'

type BridgeStepChainProps = {
  form: ReactFormExtendedApi<
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
  selectedChain: Chain
  setSelectedChain: (chain: Chain) => void
  onBack: () => void
  onNext: () => void
}

const chainOptions: { value: string; label: string; chain: Chain }[] = [
  {
    value: 'xrpl-evm',
    label: 'XRPL EVM',
    chain: XRPLEVM_TESTNET
  }
]

export default function BridgeStepChain({
  selectedChain,
  setSelectedChain,
  onBack,
  onNext
}: BridgeStepChainProps) {
  const t = useTranslations('bridge.steps.chain')

  const selectedValue =
    chainOptions.find(
      (option) =>
        option.chain.protocol === selectedChain.protocol &&
        option.chain.name === selectedChain.name &&
        option.chain.network === selectedChain.network
    )?.value || 'xrpl-mainnet'

  const handleChange = (value: string) => {
    const option = chainOptions.find((opt) => opt.value === value)
    if (option) {
      setSelectedChain(option.chain)
    }
  }

  return (
    <BridgeStepContainer>
      <BridgeStepDescription
        namespace="bridge.steps.chain"
        translationKey="description"
      />
      <SelectForm
        label={t('label')}
        size="medium"
        options={chainOptions.map((opt) => ({
          value: opt.value,
          label: opt.label
        }))}
        selectedValue={selectedValue}
        setSelectedValue={handleChange}
      />
      <BridgeStepNavigation
        showBack={false}
        showNext={true}
        onBack={onBack}
        onNext={onNext}
      />
    </BridgeStepContainer>
  )
}
