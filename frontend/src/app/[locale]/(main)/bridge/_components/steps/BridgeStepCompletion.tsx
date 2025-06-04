'use client'

import { useTranslations } from 'next-intl'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import BridgeStepContainer from '@/app/[locale]/(main)/bridge/_components/shared/BridgeStepContainer'

type BridgeStepCompletionProps = {
  onNewTransaction: () => void
}

export default function BridgeStepCompletion({
  onNewTransaction
}: BridgeStepCompletionProps) {
  const t = useTranslations('BridgeSteps')

  return (
    <BridgeStepContainer>
      <Box display="flex" flexDirection="column" alignItems="center" gap={3}>
        <CheckCircleIcon
          sx={{
            fontSize: 64,
            color: '#4caf50'
          }}
        />
        <Typography
          variant="h5"
          sx={{
            color: '#fff',
            textAlign: 'center',
            fontWeight: 'bold'
          }}
        >
          {t('completion')}
        </Typography>
        <Typography
          variant="body1"
          sx={{
            color: '#aaa',
            textAlign: 'center'
          }}
        >
          送金が正常に完了しました。
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={onNewTransaction}
          disableElevation
          sx={{ mt: 2 }}
        >
          新しい送金を開始
        </Button>
      </Box>
    </BridgeStepContainer>
  )
}
