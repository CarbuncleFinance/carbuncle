'use client'

import { useEffect } from 'react'
import { useAccount } from 'wagmi'
import WalletConnectEvnButton from '@/components/ui/buttons/WalletConnectEvnButton'
import StepContainer from '../common/StepContainer'
import StepNavigation from '../common/StepNavigation'
import { BridgeForm } from '../../index'
import TextField from '@mui/material/TextField'

type AddressInputStepProps = {
  setBridgeForm: React.Dispatch<React.SetStateAction<BridgeForm>>
  onBack: () => void
  onNext: () => void
}

export default function AddressInputStep({
  setBridgeForm,
  onBack,
  onNext
}: AddressInputStepProps) {
  const { isConnected, address } = useAccount()

  useEffect(() => {
    if (isConnected) {
      setBridgeForm((prev) => {
        return {
          ...prev,
          address: address ?? ''
        }
      })
    }
  }, [isConnected, address, setBridgeForm])

  return (
    <StepContainer title="">
      {isConnected && (
        <TextField
          label="宛先"
          size="medium"
          value={address}
          disabled
          onChange={(e) => {
            setBridgeForm((prev) => {
              return {
                ...prev,
                address: e.target.value
              }
            })
          }}
        />
      )}
      <WalletConnectEvnButton />
      <StepNavigation
        showBack={true}
        showNext={true}
        onBack={onBack}
        onNext={onNext}
      />
    </StepContainer>
  )
}
