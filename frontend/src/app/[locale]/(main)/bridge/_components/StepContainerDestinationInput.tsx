'use client'

import { useEffect } from 'react'
import { useTranslations } from 'next-intl'
import { useAccount } from 'wagmi'
import StepContainer from '@/components/ui/steppers/StepContainer'
import StepNavigation from '@/components/ui/steppers/StepNavigation'
import WalletConnectEvnButton from '@/components/ui/buttons/WalletConnectEvnButton'
import { bridgeFormSchema } from '@/app/[locale]/(main)/bridge/_forms/bridgeFormSchema'
import TextField from '@mui/material/TextField'
import type { ReactFormExtendedApi } from '@tanstack/react-form'
import type { BridgeFormValues } from '@/app/[locale]/(main)/bridge/_forms/useBridgeForm'

type StepContainerDestinationInputProps = {
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

export default function StepContainerDestinationInput({
  form,
  onBack,
  onNext
}: StepContainerDestinationInputProps) {
  const { isConnected, address } = useAccount()

  const tBridgeContent = useTranslations('BridgeContent')
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
    <StepContainer description={tBridgeContent('selectDestination')}>
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
            label="宛先"
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
      <StepNavigation
        showBack={true}
        showNext={true}
        onBack={onBack}
        onNext={handleNext}
      />
    </StepContainer>
  )
}
