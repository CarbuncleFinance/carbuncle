'use client'

import { useState } from 'react'
import { useTranslations } from 'next-intl'
import Box from '@mui/material/Box'
import Stepper from '@mui/material/Stepper'
import Step from '@mui/material/Step'
import StepContent from '@mui/material/StepContent'
import StepLabel from '@mui/material/StepLabel'
import BridgeStepChain from '@/app/[locale]/(main)/bridge/_components/steps/BridgeStepChain'
import StepContainerAmountInput from '@/app/[locale]/(main)/bridge/_components/StepContainerAmountInput'
import StepContainerConfirmation from '@/app/[locale]/(main)/bridge/_components/StepContainerConfirmation'
import StepContainerDestinationInput from '@/app/[locale]/(main)/bridge/_components/StepContainerDestinationInput'
import { useBridgeForm } from '@/app/[locale]/(main)/bridge/_forms/useBridgeForm'
import { Chain, XRPLEVM_TESTNET } from '@/domains/blockchain/types'

export default function BridgeStepper() {
  const tSteps = useTranslations('BridgeSteps')

  const [selectedChain, setSelectedChain] = useState<Chain>(XRPLEVM_TESTNET)

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
      label: tSteps('chainInput'),
      component: (
        <BridgeStepChain
          form={bridgeForm}
          selectedChain={selectedChain}
          setSelectedChain={setSelectedChain}
          onBack={handleBack}
          onNext={handleNext}
        />
      )
    },
    {
      label: tSteps('destinationInput'),
      component: (
        <StepContainerDestinationInput
          form={bridgeForm}
          onBack={handleBack}
          onNext={handleNext}
        />
      )
    },
    {
      label: tSteps('amountInput'),
      component: (
        <StepContainerAmountInput
          form={bridgeForm}
          onBack={handleBack}
          onNext={handleNext}
        />
      )
    },
    {
      label: tSteps('confirmation'),
      component: (
        <StepContainerConfirmation
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
