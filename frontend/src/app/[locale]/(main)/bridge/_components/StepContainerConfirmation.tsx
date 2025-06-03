'use client'

import { useTranslations } from 'next-intl'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import StepContainer from '@/components/ui/steppers/StepContainer'
import StepNavigation from '@/components/ui/steppers/StepNavigation'
import type { ReactFormExtendedApi } from '@tanstack/react-form'
import type { BridgeFormValues } from '../_forms/useBridgeForm'

type StepContainerConfirmationProps = {
  form: ReactFormExtendedApi<
    BridgeFormValues,
    any,
    any,
    any,
    any,
    any,
    any,
    any,
    any,
    any
  >
  onBack: () => void
  onNext: () => void
}

export default function StepContainerConfirmation({
  form,
  onBack,
  onNext
}: StepContainerConfirmationProps) {
  const t = useTranslations('BridgeContent')

  return (
    <StepContainer description="送金内容をご確認ください。">
      <Box display="flex" flexDirection="column" gap={2}>
        <Box>
          <Typography variant="caption" sx={{ color: '#aaa', fontSize: 12 }}>
            {t('destinationNetwork')}
          </Typography>
          <Typography variant="body1" sx={{ color: '#fff' }}>
            {form.state.values.chain}
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
            {form.state.values.address}
          </Typography>
        </Box>

        <Box>
          <Typography variant="caption" sx={{ color: '#aaa', fontSize: 12 }}>
            {t('amount')}
          </Typography>
          <Typography variant="body1" sx={{ color: '#fff' }}>
            {form.state.values.amount}
          </Typography>
        </Box>
      </Box>
      <StepNavigation
        showBack={false}
        showNext={false}
        showExecute={true}
        onBack={onBack}
        onNext={onNext}
      />
    </StepContainer>
  )
}
