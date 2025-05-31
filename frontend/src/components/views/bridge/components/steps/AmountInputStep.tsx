'use client'

import TextField from '@mui/material/TextField'
import StepContainer from '../common/StepContainer'
import StepNavigation from '../common/StepNavigation'
import { AmountInputStepProps } from '../../types'

export default function AmountInputStep({
  onBack,
  onNext
}: AmountInputStepProps) {
  return (
    <StepContainer title="">
      <TextField label="振込金額" type="number" fullWidth />
      <StepNavigation
        showBack={true}
        showNext={true}
        onBack={onBack}
        onNext={onNext}
      />
    </StepContainer>
  )
}
