'use client'

import { useTranslations } from 'next-intl'
import Box from '@mui/material/Box'
import BridgeStepContainer from '@/app/[locale]/(main)/bridge/_components/shared/BridgeStepContainer'
import BridgeStepDescription from '@/app/[locale]/(main)/bridge/_components/shared/BridgeStepDescription'
import BridgeStepNavigation from '@/app/[locale]/(main)/bridge/_components/shared/BridgeStepNavigation'
import { useWallet } from '@/hooks/useWallet'
import { useWalletBalance } from '@/hooks/useWalletBalance'
import { bridgeFormSchema } from '@/app/[locale]/(main)/bridge/_forms/bridgeFormSchema'
import BridgeFormAmountHeader from './BridgeFormAmountHeader'
import BridgeFormAmountInput from './BridgeFormAmountInput'
import BridgeFormAmountPercentageButton from './BridgeFormAmountPercentageButton'

import type { ReactFormExtendedApi } from '@tanstack/react-form'
import type { BridgeFormValues } from '@/app/[locale]/(main)/bridge/_forms/useBridgeForm'

type BridgeStepAmountProps = {
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

export default function BridgeStepAmount({
  form,
  onBack,
  onNext
}: BridgeStepAmountProps) {
  const { address, isConnected } = useWallet()

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
    <BridgeStepContainer>
      <BridgeStepDescription
        namespace="bridge.steps.amount"
        translationKey="description"
      />
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
      <BridgeStepNavigation
        showBack={true}
        showNext={true}
        onBack={onBack}
        onNext={handleNext}
      />
    </BridgeStepContainer>
  )
}
