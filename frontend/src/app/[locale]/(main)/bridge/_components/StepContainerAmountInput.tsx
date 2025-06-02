'use client'

import { useTranslations } from 'next-intl'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import CircularProgress from '@mui/material/CircularProgress'
import IconButton from '@mui/material/IconButton'
import RefreshIcon from '@mui/icons-material/Refresh'
import StepContainer from '@/components/ui/steppers/StepContainer'
import StepNavigation from '@/components/ui/steppers/StepNavigation'
import { useWallet } from '@/hooks/useWallet'
import { useWalletBalance } from '@/hooks/useWalletBalance'
import { bridgeFormSchema } from '@/app/[locale]/(main)/bridge/_forms/bridgeFormSchema'
import BridgeFormAmountHeader from '@/app/[locale]/(main)/bridge/_components/BridgeFormAmountHeader'
import BridgeFormAmountInput from '@/app/[locale]/(main)/bridge/_components/BridgeFormAmountInput'
import BridgeFormAmountPercentageButton from '@/app/[locale]/(main)/bridge/_components/BridgeFormAmountPercentageButton'
import type { ReactFormExtendedApi } from '@tanstack/react-form'
import type { BridgeFormValues } from '@/app/[locale]/(main)/bridge/_forms/useBridgeForm'

type StepContainerAmountInputProps = {
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

export default function StepContainerAmountInput({
  form,
  onBack,
  onNext
}: StepContainerAmountInputProps) {
  const { address, isConnected } = useWallet()

  const tBridgeContent = useTranslations('BridgeContent')

  const {
    data: balance,
    isLoading: isBalanceLoading,
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

  const percentageButtons = [25, 50, 75, 100]

  return (
    <StepContainer title={tBridgeContent('amountInput')}>
      <Box display="flex" flexDirection="column" gap={1}>
        <BridgeFormAmountHeader
          balance={balance || 0}
          isBalanceLoading={isBalanceLoading}
          refetchBalance={refetchBalance}
          isConnected={isConnected}
        />
        <Box display="flex" gap={1} justifyContent="flex-end">
          {percentageButtons.map((percentage) => (
            <BridgeFormAmountPercentageButton
              key={percentage}
              percentage={percentage}
              handlePercentageClick={handlePercentageClick}
              balance={balance || 0}
              isBalanceLoading={isBalanceLoading}
            />
          ))}
        </Box>
        <BridgeFormAmountInput form={form} schema={bridgeFormSchema} />
      </Box>

      <StepNavigation
        showBack={true}
        showNext={true}
        onBack={onBack}
        onNext={handleNext}
      />
    </StepContainer>
  )
}
