'use client'

import { useTranslations } from 'next-intl'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import BridgeStepContainer from '@/app/[locale]/(main)/bridge/_components/shared/BridgeStepContainer'
import BridgeStepDescription from '@/app/[locale]/(main)/bridge/_components/shared/BridgeStepDescription'
import BridgeStepNavigation from '@/app/[locale]/(main)/bridge/_components/shared/BridgeStepNavigation'

import type { BridgeStepWithExecuteProps } from '@/app/[locale]/(main)/bridge/_types'

type BridgeStepConfirmationProps = BridgeStepWithExecuteProps

export default function BridgeStepConfirmation({
  form,
  onBack,
  onNext,
  onExecute,
  isLoading = false
}: BridgeStepConfirmationProps) {
  const t = useTranslations('Bridge.steps.confirmation')

  return (
    <BridgeStepContainer>
      <BridgeStepDescription
        namespace="Bridge.steps.confirmation"
        translationKey="description"
      />
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
      <BridgeStepNavigation
        showBack={true}
        showNext={false}
        showExecute={true}
        onBack={onBack}
        onNext={onNext}
        onExecute={onExecute}
        isLoading={isLoading}
      />
    </BridgeStepContainer>
  )
}
