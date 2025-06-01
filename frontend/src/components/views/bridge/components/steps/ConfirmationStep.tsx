'use client'

import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import StepContainer from '../common/StepContainer'
import StepNavigation from '../common/StepNavigation'
import { ConfirmationStepProps } from '../../types'
import { EvmChainTypeNames } from '@/types/enums'

export default function ConfirmationStep({
  bridgeForm,
  onBack,
  onExecute
}: ConfirmationStepProps) {
  return (
    <StepContainer title="送金内容をご確認ください。">
      <Box display="flex" flexDirection="column" gap={2}>
        <Box>
          <Typography variant="caption" sx={{ color: '#aaa', fontSize: 12 }}>
            送金先ネットワーク
          </Typography>
          <Typography variant="body1" sx={{ color: '#fff' }}>
            {EvmChainTypeNames[bridgeForm.chainType]}
          </Typography>
        </Box>

        <Box>
          <Typography variant="caption" sx={{ color: '#aaa', fontSize: 12 }}>
            送金先アドレス
          </Typography>
          <Typography
            variant="body1"
            sx={{ color: '#fff', wordBreak: 'break-all' }}
          >
            {bridgeForm.address}
          </Typography>
        </Box>

        <Box>
          <Typography variant="caption" sx={{ color: '#aaa', fontSize: 12 }}>
            送金金額
          </Typography>
          <Typography variant="body1" sx={{ color: '#fff' }}>
            {bridgeForm.amount}
          </Typography>
        </Box>
      </Box>

      <StepNavigation
        showBack={true}
        showNext={true}
        onBack={onBack}
        onNext={onExecute}
      />
    </StepContainer>
  )
}
