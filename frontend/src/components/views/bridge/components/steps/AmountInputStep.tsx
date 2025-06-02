'use client'

import { useTranslations } from 'next-intl'
import TextField from '@mui/material/TextField'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import CircularProgress from '@mui/material/CircularProgress'
import RefreshIcon from '@mui/icons-material/Refresh'
import StepContainer from '../common/StepContainer'
import StepNavigation from '../common/StepNavigation'
import { AmountInputStepProps } from '../../types'
import { bridgeFormSchema } from '../../validation'
import { useWallet } from '@/hooks/useWallet'
import { useWalletBalance } from '@/hooks/useWalletBalance'

export default function AmountInputStep({
  form,
  onBack,
  onNext
}: AmountInputStepProps) {
  const t = useTranslations('Errors')
  const { address, isConnected } = useWallet()

  const {
    data: balance,
    isLoading: isBalanceLoading,
    error: balanceError,
    refetch: refetchBalance
  } = useWalletBalance({ address: address || '' })

  const handleNext = () => {
    form.validateField('amount', 'change')
    const amountField = form.getFieldMeta('amount')
    if (!amountField?.errors?.length) {
      onNext()
    }
  }

  const handlePercentageClick = (percentage: number) => {
    if (balance) {
      const amount = ((balance * percentage) / 100).toString()
      form.setFieldValue('amount', amount)
    }
  }

  const formatBalance = (balance: number) => {
    return balance.toFixed(6)
  }

  const percentageButtons = [25, 50, 75, 100]

  return (
    <StepContainer title="">
      <Box display="flex" flexDirection="column" gap={1} mb={2}>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="caption" sx={{ color: '#aaa', fontSize: 12 }}>
            残高
          </Typography>
          <Box display="flex" alignItems="center" gap={1}>
            {isBalanceLoading ? (
              <CircularProgress size={16} sx={{ color: '#aaa' }} />
            ) : (
              <Typography variant="body2" sx={{ color: '#fff' }}>
                {balance !== undefined ? formatBalance(balance) : '--'} XRP
              </Typography>
            )}
            <IconButton
              size="small"
              onClick={() => refetchBalance()}
              disabled={isBalanceLoading || !isConnected}
              sx={{ color: '#aaa', '&:hover': { color: '#fff' } }}
            >
              <RefreshIcon fontSize="small" />
            </IconButton>
          </Box>
        </Box>

        <Box display="flex" gap={1} justifyContent="flex-end">
          {percentageButtons.map((percentage) => (
            <Button
              key={percentage}
              variant="outlined"
              size="small"
              onClick={() => handlePercentageClick(percentage)}
              disabled={!balance || isBalanceLoading}
              sx={{
                minWidth: 'auto',
                px: 1,
                py: 0.5,
                fontSize: 12,
                borderColor: '#444',
                color: '#aaa',
                '&:hover': {
                  borderColor: '#666',
                  backgroundColor: 'rgba(255, 255, 255, 0.05)'
                }
              }}
            >
              {percentage}%
            </Button>
          ))}
        </Box>
      </Box>

      <form.Field
        name="amount"
        validators={{
          onChange: ({ value }: { value: string }) => {
            const result = bridgeFormSchema.shape.amount.safeParse(value)
            return result.success ? undefined : result.error.issues[0]?.message
          }
        }}
      >
        {(field: any) => (
          <TextField
            label="振込金額"
            type="text"
            fullWidth
            value={field.state.value}
            error={field.state.meta.errors.length > 0}
            helperText={
              field.state.meta.errors.length > 0
                ? t(field.state.meta.errors[0])
                : ''
            }
            onChange={(e) => field.handleChange(e.target.value)}
            sx={{
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: '#444'
                },
                '&:hover fieldset': {
                  borderColor: '#666'
                },
                '&.Mui-focused fieldset': {
                  borderColor: '#1976d2'
                }
              },
              '& .MuiInputLabel-root': {
                color: '#aaa'
              },
              '& .MuiOutlinedInput-input': {
                color: '#fff'
              }
            }}
          />
        )}
      </form.Field>

      <StepNavigation
        showBack={true}
        showNext={true}
        nextDisabled={false}
        onBack={onBack}
        onNext={handleNext}
      />
    </StepContainer>
  )
}
