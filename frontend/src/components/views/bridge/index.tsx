'use client'

import { useState } from 'react'
import { useForm } from '@tanstack/react-form'
import Typography from '@mui/material/Typography'
import Stepper from '@mui/material/Stepper'
import Step from '@mui/material/Step'
import StepContent from '@mui/material/StepContent'
import StepLabel from '@mui/material/StepLabel'
import PageLayout from '@/components/features/layout/PageLayout'
import TransferMethodStep from './components/steps/TransferMethodStep'
import ChainSelectionStep from './components/steps/ChainSelectionStep'
import AddressInputStep from './components/steps/AddressInputStep'
import AmountInputStep from './components/steps/AmountInputStep'
import ConfirmationStep from './components/steps/ConfirmationStep'
import { Chain, ETHEREUM_MAINNET } from '@/domains/blockchain/types'

export type BridgeForm = {
  chain: Chain
  blockchain: string
  address: string
  amount: string
}

export default function BridgeView() {
  const [selectedChain, setSelectedChain] = useState<Chain>(ETHEREUM_MAINNET)
  const [activeStep, setActiveStep] = useState(0)

  const form = useForm({
    defaultValues: {
      chain: ETHEREUM_MAINNET,
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
      label: '振込方法の選択',
      component: <TransferMethodStep onNext={handleNext} />
    },
    {
      label: '振込先ネットワークの選択',
      component: (
        <ChainSelectionStep
          selectedChain={selectedChain}
          setSelectedChain={setSelectedChain}
          onBack={handleBack}
          onNext={handleNext}
        />
      )
    },
    {
      label: '振込先の入力',
      component: (
        <AddressInputStep form={form} onBack={handleBack} onNext={handleNext} />
      )
    },
    {
      label: '送金金額の入力',
      component: (
        <AmountInputStep form={form} onBack={handleBack} onNext={handleNext} />
      )
    },
    {
      label: '送金確認',
      component: (
        <ConfirmationStep
          bridgeForm={form.state.values as BridgeForm}
          onBack={handleBack}
          onExecute={() => {
            console.log('Transfer execution requested:', form.state.values)
          }}
        />
      )
    },
    {
      label: '送金完了',
      component: <div>送金完了</div>
    }
  ]

  return (
    <PageLayout maxWidth="sm">
      <Typography variant="h5" mb={2} sx={{ color: '#fff' }}>
        Bridge
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
