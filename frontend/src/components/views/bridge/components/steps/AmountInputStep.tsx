'use client'

import { useState } from 'react'
import TextField from '@mui/material/TextField'
import StepContainer from '../common/StepContainer'
import StepNavigation from '../common/StepNavigation'
import { BridgeForm } from '../../index'

type AmountInputStepProps = {
  bridgeForm: BridgeForm
  setBridgeForm: (form: BridgeForm) => void
  onBack: () => void
  onNext: () => void
}

export default function AmountInputStep({
  bridgeForm,
  setBridgeForm,
  onBack,
  onNext
}: AmountInputStepProps) {
  const handleAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setBridgeForm({
      ...bridgeForm,
      amount: event.target.value
    })
  }

  return (
    <StepContainer title="">
      <TextField
        label="振込金額"
        type="number"
        fullWidth
        value={bridgeForm.amount}
        onChange={handleAmountChange}
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
