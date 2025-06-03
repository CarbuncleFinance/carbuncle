'use client'

import { useState } from 'react'
import { useForm } from '@tanstack/react-form'
import { useTranslations } from 'next-intl'
import Typography from '@mui/material/Typography'
import Stepper from '@mui/material/Stepper'
import Step from '@mui/material/Step'
import StepContent from '@mui/material/StepContent'
import StepLabel from '@mui/material/StepLabel'
import PageLayout from '@/components/features/layout/PageLayout'
import { Chain, XRPLEVM_TESTNET } from '@/domains/blockchain/types'

export type BridgeForm = {
  chain: Chain
  blockchain: string
  address: string
  amount: string
}

export default function BridgeView() {
  const [selectedChain, setSelectedChain] = useState<Chain>(XRPLEVM_TESTNET)
  const [activeStep, setActiveStep] = useState(0)
  const tSteps = useTranslations('BridgeSteps')
  const tPages = useTranslations('Pages')

  const form = useForm({
    defaultValues: {
      chain: XRPLEVM_TESTNET,
      blockchain: '',
      address: '',
      amount: ''
    }
  })

  const handleNext = () => {
    setActiveStep(activeStep + 1)
  }

  const handleBack = () => {
    setActiveStep(activeStep - 1)
  }

  const steps = [
    {
      label: tSteps('transferMethodSelection'),
      component: <></>
    }
  ]

  return (
    <PageLayout maxWidth="sm">
      <Typography variant="h5" mb={2} sx={{ color: '#fff' }}>
        {tPages('bridge')}
      </Typography>
      <Stepper activeStep={activeStep} orientation="vertical">
        {steps.map((step, index) => (
          <Step key={index}>
            <StepLabel>
              <Typography
                variant="caption"
                sx={{ fontSize: 14, color: '#fff' }}
              >
                {step.label}
              </Typography>
            </StepLabel>
            <StepContent>{step.component}</StepContent>
          </Step>
        ))}
      </Stepper>
    </PageLayout>
  )
}
