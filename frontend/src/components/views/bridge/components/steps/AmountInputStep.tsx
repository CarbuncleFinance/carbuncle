'use client'

import { useTranslations } from 'next-intl'
import TextField from '@mui/material/TextField'
import StepContainer from '../common/StepContainer'
import StepNavigation from '../common/StepNavigation'
import { AmountInputStepProps } from '../../types'
import { bridgeFormSchema } from '../../validation'

export default function AmountInputStep({
  form,
  onBack,
  onNext
}: AmountInputStepProps) {
  const t = useTranslations('Errors')

  const handleNext = () => {
    form.validateField('amount', 'change')
    const amountField = form.getFieldMeta('amount')
    if (!amountField?.errors?.length) {
      onNext()
    }
  }

  return (
    <StepContainer title="">
      <form.Field
        name="amount"
        validators={{
          onChange: ({ value }: { value: string }) => {
            const result = bridgeFormSchema.shape.amount.safeParse(value)
            return result.success ? undefined : result.error.issues[0]?.message
          }
        }}
      >
        {(field: any) => (
          <TextField
            label="振込金額"
            type="text"
            fullWidth
            value={field.state.value}
            error={field.state.meta.errors.length > 0}
            helperText={
              field.state.meta.errors.length > 0
                ? t(field.state.meta.errors[0])
                : ''
            }
            onChange={(e) => field.handleChange(e.target.value)}
          />
        )}
      </form.Field>
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
