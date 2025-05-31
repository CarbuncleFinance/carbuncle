'use client'

import { useState } from 'react'
import Typography from '@mui/material/Typography'
import Stepper from '@mui/material/Stepper'
import Step from '@mui/material/Step'
import StepContent from '@mui/material/StepContent'
import StepLabel from '@mui/material/StepLabel'
import PageLayout from '@/components/features/layout/PageLayout'
import TransferMethodStep from './components/steps/TransferMethodStep'
import BlockchainSelectionStep from './components/steps/BlockchainSelectionStep'
import AddressInputStep from './components/steps/AddressInputStep'
import AmountInputStep from './components/steps/AmountInputStep'

type BridgeForm = {
  transferMethod: string // 振込方法
  blockchain: string // ブロックチェーン
  address: string // アドレス
  amount: string // 金額
}

export default function BridgeView() {
  const [bridgeForm, setBridgeForm] = useState<BridgeForm>({
    transferMethod: 'xrp',
    blockchain: '',
    address: '',
    amount: ''
  })
  const [blockchain, setBlockchain] = useState('')
  const [activeStep, setActiveStep] = useState(0)

  const handleNext = () => {
    setActiveStep(activeStep + 1)
  }

  const handleBack = () => {
    setActiveStep(activeStep - 1)
  }

  const steps = [
    {
      label: '振込方法を選択してください。',
      component: <TransferMethodStep onNext={handleNext} />
    },
    {
      label: '振込先を選択してください。',
      component: (
        <BlockchainSelectionStep
          blockchain={blockchain}
          setBlockchain={setBlockchain}
          onBack={handleBack}
          onNext={handleNext}
        />
      )
    },
    {
      label: '振込先のアドレスを入力してください。',
      component: <AddressInputStep onBack={handleBack} onNext={handleNext} />
    },
    {
      label: '振込金額を入力してください。',
      component: <AmountInputStep onBack={handleBack} onNext={handleNext} />
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
