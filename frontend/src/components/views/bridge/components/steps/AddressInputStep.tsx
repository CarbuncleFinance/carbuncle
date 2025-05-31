'use client'

import Typography from '@mui/material/Typography'
import { useAccount } from 'wagmi'
import WalletConnectEvnButton from '@/components/ui/buttons/WalletConnectEvnButton'
import StepContainer from '../common/StepContainer'
import StepNavigation from '../common/StepNavigation'
import { AddressInputStepProps } from '../../types'

export default function AddressInputStep({
  onBack,
  onNext
}: AddressInputStepProps) {
  const { isConnected, address } = useAccount()

  return (
    <StepContainer title="">
      {isConnected && (
        <Typography variant="caption" sx={{ fontSize: 14, color: '#000' }}>
          宛先: {address}
        </Typography>
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
