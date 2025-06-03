'use client'

import { useState } from 'react'
import { useTranslations } from 'next-intl'
import Box from '@mui/material/Box'
import Stepper from '@mui/material/Stepper'
import Step from '@mui/material/Step'
import StepContent from '@mui/material/StepContent'
import StepLabel from '@mui/material/StepLabel'
import BridgeStepChain from '@/app/[locale]/(main)/bridge/_components/steps/BridgeStepChain'
import BridgeStepRecipient from '@/app/[locale]/(main)/bridge/_components/steps/BridgeStepRecipient'
import BridgeStepAmount from '@/app/[locale]/(main)/bridge/_components/steps/BridgeStepAmount'
import BridgeStepConfirmation from '@/app/[locale]/(main)/bridge/_components/steps/BridgeStepConfirmation'
import { useBridgeForm } from '@/app/[locale]/(main)/bridge/_forms/useBridgeForm'

export default function BridgeStepper() {
  const tSteps = useTranslations('bridge.steps')

  /** Form */
  const { form: bridgeForm } = useBridgeForm()

  /** Stepper */
  const [activeStep, setActiveStep] = useState<number>(0)

  const handleNext = () => {
    setActiveStep(activeStep + 1)
  }

  const handleBack = () => {
    setActiveStep(activeStep - 1)
  }

  /** Stepper contents */
  const stepContents: { label: string; component: React.ReactNode }[] = [
    {
      label: tSteps('chain.title'),
      component: (
        <BridgeStepChain
          form={bridgeForm}
          onBack={handleBack}
          onNext={handleNext}
        />
      )
    },
    {
      label: tSteps('recipient.title'),
      component: (
        <BridgeStepRecipient
          form={bridgeForm}
          onBack={handleBack}
          onNext={handleNext}
        />
      )
    },
    {
      label: tSteps('amount.title'),
      component: (
        <BridgeStepAmount
          form={bridgeForm}
          onBack={handleBack}
          onNext={handleNext}
        />
      )
    },
    {
      label: tSteps('confirmation.title'),
      component: (
        <BridgeStepConfirmation
          form={bridgeForm}
          onBack={handleBack}
          onNext={handleNext}
        />
      )
    }
  ]

  return (
    <Box
      component="form"
      onSubmit={(e) => {
        e.preventDefault()
        bridgeForm.handleSubmit()
      }}
    >
      <Stepper activeStep={activeStep} orientation="vertical">
        {stepContents.map((step, index) => (
          <Step key={index}>
            <StepLabel>{step.label}</StepLabel>
            <StepContent>{step.component}</StepContent>
          </Step>
        ))}
      </Stepper>
    </Box>
  )
}
