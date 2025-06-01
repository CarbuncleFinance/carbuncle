'use client'

import { useEffect } from 'react'
import { useAccount } from 'wagmi'
import { useTranslations } from 'next-intl'
import WalletConnectEvnButton from '@/components/ui/buttons/WalletConnectEvnButton'
import StepContainer from '../common/StepContainer'
import StepNavigation from '../common/StepNavigation'
import { AddressInputStepProps } from '../../types'
import { bridgeFormSchema } from '../../validation'
import TextField from '@mui/material/TextField'

export default function AddressInputStep({
  form,
  onBack,
  onNext
}: AddressInputStepProps) {
  const { isConnected, address } = useAccount()
  const t = useTranslations('Errors')

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
    <StepContainer title="">
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
                ? t(field.state.meta.errors[0])
                : ''
            }
            onChange={(e) => field.handleChange(e.target.value)}
            InputProps={{
              sx: {
                color: '#fff',
                '& .MuiOutlinedInput-notchedOutline': {
                  borderColor: 'rgba(255, 255, 255, 0.23)'
                },
                '&:hover .MuiOutlinedInput-notchedOutline': {
                  borderColor: 'rgba(255, 255, 255, 0.5)'
                }
              }
            }}
            InputLabelProps={{
              sx: {
                color: 'rgba(255, 255, 255, 0.7)'
              }
            }}
            FormHelperTextProps={{
              sx: {
                color: '#f44336'
              }
            }}
          />
        )}
      </form.Field>
      <WalletConnectEvnButton />
      <StepNavigation
        showBack={true}
        showNext={true}
        nextDisabled={false}
        onBack={onBack}
        onNext={handleNext}
      />
    </StepContainer>
  )
}
