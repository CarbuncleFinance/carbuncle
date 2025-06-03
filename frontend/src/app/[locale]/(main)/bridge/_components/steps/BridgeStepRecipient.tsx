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

import type { ReactFormExtendedApi } from '@tanstack/react-form'
import type { BridgeFormValues } from '@/app/[locale]/(main)/bridge/_forms/useBridgeForm'

type BridgeStepRecipientProps = {
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

export default function BridgeStepRecipient({
  form,
  onBack,
  onNext
}: BridgeStepRecipientProps) {
  const t = useTranslations('bridge.steps.recipient')

  const { isConnected, address } = useAccount()

  const tErrors = useTranslations('Errors')

  useEffect(() => {
    if (isConnected && address) {
      form.setFieldValue('address', address)
    }
  }, [isConnected, address, form])

  const handleNext = () => {
    form.validateField('address', 'change')
    const addressField = form.getFieldMeta('address')
    if (!addressField?.errors?.length) {
      onNext()
    }
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
          onChange: ({ value }: { value: string }) => {
            const result = bridgeFormSchema.shape.address.safeParse(value)
            return result.success ? undefined : result.error.issues[0]?.message
          }
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
