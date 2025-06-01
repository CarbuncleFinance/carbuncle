'use client'

import React from 'react'
import { useTranslations } from 'next-intl'
import { Chain, XRPLEVM_TESTNET } from '@/domains/blockchain/types'
import { SelectForm } from '@/components/ui/forms/SelectForm'

type SelectFormChainProps = {
  size?: 'small' | 'medium'
  selectedChain: Chain
  setSelectedChain: (chain: Chain) => void
}

const chainOptions: { value: string; label: string; chain: Chain }[] = [
  {
    value: 'xrpl-evm',
    label: 'XRPL EVM',
    chain: XRPLEVM_TESTNET
  }
]

export const SelectFormChain = ({
  size = 'small',
  selectedChain,
  setSelectedChain
}: SelectFormChainProps) => {
  const t = useTranslations('Forms.selectChainForm')

  const selectedValue =
    chainOptions.find(
      (option) =>
        option.chain.protocol === selectedChain.protocol &&
        option.chain.name === selectedChain.name &&
        option.chain.network === selectedChain.network
    )?.value || 'xrpl-mainnet'

  const handleChange = (value: string) => {
    const option = chainOptions.find((opt) => opt.value === value)
    if (option) {
      setSelectedChain(option.chain)
    }
  }

  return (
    <SelectForm
      label={t('label')}
      size={size}
      options={chainOptions.map((opt) => ({
        value: opt.value,
        label: opt.label
      }))}
      selectedValue={selectedValue}
      setSelectedValue={handleChange}
    />
  )
}
