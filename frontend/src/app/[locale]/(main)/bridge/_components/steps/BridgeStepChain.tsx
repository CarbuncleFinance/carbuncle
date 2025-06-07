'use client'

import { useTranslations } from 'next-intl'
import BridgeStepContainer from '@/app/[locale]/(main)/bridge/_components/shared/BridgeStepContainer'
import BridgeStepDescription from '@/app/[locale]/(main)/bridge/_components/shared/BridgeStepDescription'
import BridgeStepNavigation from '@/app/[locale]/(main)/bridge/_components/shared/BridgeStepNavigation'

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
  onBack: () => void
  onNext: () => void
}

const chainOptions: { value: string; label: string }[] = [
  {
    value: 'xrpl-evm',
    label: 'XRPL EVM'
  }
]

export default function BridgeStepChain({
  form,
  onBack,
  onNext
}: BridgeStepChainProps) {
  const t = useTranslations('Bridge.steps.chain')

  return (
    <BridgeStepContainer>
      <BridgeStepDescription
        namespace="bridge.steps.chain"
        translationKey="description"
      />
      <form.Field name="chain">
        {(field: any) => (
          <SelectForm
            label={t('label')}
            size="medium"
            options={chainOptions.map((opt) => ({
              value: opt.value,
              label: opt.label
            }))}
            selectedValue={field.state.value}
            setSelectedValue={(value: string) => field.handleChange(value)}
          />
        )}
      </form.Field>
      <BridgeStepNavigation
        showBack={false}
        showNext={true}
        onBack={onBack}
        onNext={onNext}
      />
    </BridgeStepContainer>
  )
}
