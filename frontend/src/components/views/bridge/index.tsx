'use client'

import { useState, useEffect } from 'react'
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
import { EvmChainType, EvmChainTypes } from '@/types/enums'
import { useWallet } from '@/hooks/useWallet'

export type BridgeForm = {
  chainType: EvmChainType
  blockchain: string // ブロックチェーン
  address: string // アドレス
  amount: string // 金額
}

export default function BridgeView() {
  const { chainType } = useWallet()

  const [bridgeForm, setBridgeForm] = useState<BridgeForm>({
    chainType: EvmChainTypes.XRPL_EVM,
    blockchain: '',
    address: '',
    amount: ''
  })

  const [selectedChainType, setSelectedChainType] = useState(
    EvmChainTypes.XRPL_EVM
  )
  const [activeStep, setActiveStep] = useState(0)

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
          selectedChainType={selectedChainType}
          setSelectedChainType={setSelectedChainType}
          onBack={handleBack}
          onNext={handleNext}
        />
      )
    },
    {
      label: '振込先の入力',
      component: (
        <AddressInputStep
          setBridgeForm={setBridgeForm}
          onBack={handleBack}
          onNext={handleNext}
        />
      )
    },
    {
      label: '送金金額の入力',
      component: <AmountInputStep onBack={handleBack} onNext={handleNext} />
    },
    {
      label: '送金確認',
      component: (
        <ConfirmationStep
          bridgeForm={bridgeForm}
          onBack={handleBack}
          onExecute={() => {
            console.log('Transfer execution requested:', bridgeForm)
          }}
        />
      )
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
