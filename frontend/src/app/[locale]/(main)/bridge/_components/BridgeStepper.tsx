'use client'

import { useState, useEffect } from 'react'
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
import BridgeStepCompletion from '@/app/[locale]/(main)/bridge/_components/steps/BridgeStepCompletion'
import { useBridgeForm } from '@/app/[locale]/(main)/bridge/_forms/useBridgeForm'
import { useWallet } from '@/hooks/useWallet'

export default function BridgeStepper() {
  const tSteps = useTranslations('Bridge.steps')

  const { address } = useWallet()

  /** Form */
  const {
    form: bridgeForm,
    isLoading,
    isSuccess,
    resetSuccess
  } = useBridgeForm(address)

  /** Stepper */
  const [activeStep, setActiveStep] = useState<number>(0)

  useEffect(() => {
    if (isSuccess && activeStep === 3) {
      setActiveStep(4)
    }
  }, [isSuccess, activeStep])

  const handleNext = () => {
    setActiveStep(activeStep + 1)
  }

  const handleBack = () => {
    setActiveStep(activeStep - 1)
  }

  const handleNewTransaction = () => {
    setActiveStep(0)
    resetSuccess()
    bridgeForm.reset()
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
          onExecute={() => bridgeForm.handleSubmit()}
          isLoading={isLoading}
        />
      )
    },
    {
      label: tSteps('completion'),
      component: (
        <BridgeStepCompletion onNewTransaction={handleNewTransaction} />
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
