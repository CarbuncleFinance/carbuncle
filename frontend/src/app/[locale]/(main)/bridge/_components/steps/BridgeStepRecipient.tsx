'use client'

import { useEffect } from 'react'
import { useTranslations } from 'next-intl'
import { useAccount } from 'wagmi'
import TextField from '@mui/material/TextField'
import BridgeStepContainer from '@/app/[locale]/(main)/bridge/_components/shared/BridgeStepContainer'
import BridgeStepDescription from '@/app/[locale]/(main)/bridge/_components/shared/BridgeStepDescription'
import BridgeStepNavigation from '@/app/[locale]/(main)/bridge/_components/shared/BridgeStepNavigation'
import WalletConnectEvnButton from '@/components/ui/buttons/WalletConnectEvnButton'
import { bridgeFormSchema } from '@/app/[locale]/(main)/bridge/_forms/bridgeFormSchema'
import type { BaseBridgeStepProps } from '@/app/[locale]/(main)/bridge/_types'
import {
  validateAndProceed,
  createFieldValidator
} from '@/app/[locale]/(main)/bridge/_utils/validation'

type BridgeStepRecipientProps = BaseBridgeStepProps

export default function BridgeStepRecipient({
  form,
  onBack,
  onNext
}: BridgeStepRecipientProps) {
  const t = useTranslations('Bridge.steps.recipient')

  const { isConnected, address } = useAccount()

  const tErrors = useTranslations('Errors')

  useEffect(() => {
    if (isConnected && address) {
      form.setFieldValue('address', address)
    }
  }, [isConnected, address, form])

  const handleNext = () => {
    validateAndProceed(form, 'address', onNext)
  }

  return (
    <BridgeStepContainer>
      <BridgeStepDescription
        namespace="bridge.steps.recipient"
        translationKey="description"
      />
      <form.Field
        name="address"
        validators={{
          onChange: createFieldValidator('address')
        }}
      >
        {(field: any) => (
          <TextField
            label={t('label')}
            size="medium"
            value={field.state.value}
            disabled={isConnected}
            error={field.state.meta.errors.length > 0}
            helperText={
              field.state.meta.errors.length > 0
                ? tErrors(field.state.meta.errors[0])
                : ''
            }
            onChange={(e) => field.handleChange(e.target.value)}
          />
        )}
      </form.Field>
      <WalletConnectEvnButton />
      <BridgeStepNavigation
        showBack={true}
        showNext={true}
        onBack={onBack}
        onNext={handleNext}
      />
    </BridgeStepContainer>
  )
}
