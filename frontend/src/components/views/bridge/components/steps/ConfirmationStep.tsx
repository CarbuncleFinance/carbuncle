'use client'

import { useTranslations } from 'next-intl'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import StepContainer from '../../../../ui/steppers/StepContainer'
import StepNavigation from '../../../../ui/steppers/StepNavigation'
import { ConfirmationStepProps } from '../../types'

export default function ConfirmationStep({
  bridgeForm,
  onBack,
  onExecute
}: ConfirmationStepProps) {
  const t = useTranslations('BridgeContent')

  return (
    <StepContainer title="送金内容をご確認ください。">
      <Box display="flex" flexDirection="column" gap={2}>
        <Box>
          <Typography variant="caption" sx={{ color: '#aaa', fontSize: 12 }}>
            {t('destinationNetwork')}
          </Typography>
          <Typography variant="body1" sx={{ color: '#fff' }}>
            {bridgeForm.chain.name} ({bridgeForm.chain.network})
          </Typography>
        </Box>

        <Box>
          <Typography variant="caption" sx={{ color: '#aaa', fontSize: 12 }}>
            {t('destinationAddress')}
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
            {t('amount')}
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
