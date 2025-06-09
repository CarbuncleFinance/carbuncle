'use client'

import { useTranslations } from 'next-intl'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import BridgeStepContainer from '@/app/[locale]/(main)/bridge/_components/shared/BridgeStepContainer'
import BridgeStepDescription from '@/app/[locale]/(main)/bridge/_components/shared/BridgeStepDescription'
import BridgeStepNavigation from '@/app/[locale]/(main)/bridge/_components/shared/BridgeStepNavigation'
import { BRDGE_GAS_FEE_AMOUT_XRP } from '@/constants/app'
import { useWallet } from '@/hooks/useWallet'
import { useWalletBalance } from '@/hooks/useWalletBalance'
import { bridgeFormSchema } from '@/app/[locale]/(main)/bridge/_forms/bridgeFormSchema'
import BridgeFormAmountHeader from './BridgeFormAmountHeader'
import BridgeFormAmountInput from './BridgeFormAmountInput'
import BridgeFormAmountPercentageButton from './BridgeFormAmountPercentageButton'

import type { BaseBridgeStepProps } from '@/app/[locale]/(main)/bridge/_types'
import { validateAndProceed } from '@/app/[locale]/(main)/bridge/_utils/validation'

type BridgeStepAmountProps = BaseBridgeStepProps

export default function BridgeStepAmount({
  form,
  onBack,
  onNext
}: BridgeStepAmountProps) {
  const { address, isConnected } = useWallet()
  const t = useTranslations('Bridge.steps.amount')

  const {
    data: balance,
    isLoading: isBalanceLoading,
    refetch: refetchBalance
  } = useWalletBalance({ address: address || '' })

  const handleNext = () => {
    validateAndProceed(form, 'amount', onNext)
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
        <Typography variant="body2" color="text.secondary">
          {t('feeNotice', { fee: BRDGE_GAS_FEE_AMOUT_XRP })}
        </Typography>
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
