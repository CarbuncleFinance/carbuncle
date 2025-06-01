'use client'

import React from 'react'
import { useTranslations } from 'next-intl'
import { Chain, ETHEREUM_MAINNET, ETHEREUM_SEPOLIA, POLYGON_MAINNET, POLYGON_AMOY } from '@/domains/blockchain/types'
import { SelectForm } from '@/components/ui/forms/SelectForm'

type SelectFormChainProps = {
  size?: 'small' | 'medium'
  selectedChain: Chain
  setSelectedChain: (chain: Chain) => void
}

const chainOptions: { value: string; label: string; chain: Chain }[] = [
  {
    value: 'ethereum-mainnet',
    label: 'Ethereum Mainnet',
    chain: ETHEREUM_MAINNET
  },
  {
    value: 'ethereum-sepolia',
    label: 'Ethereum Sepolia',
    chain: ETHEREUM_SEPOLIA
  },
  {
    value: 'polygon-mainnet',
    label: 'Polygon Mainnet',
    chain: POLYGON_MAINNET
  },
  {
    value: 'polygon-amoy',
    label: 'Polygon Amoy',
    chain: POLYGON_AMOY
  }
]

export const SelectFormChain = ({
  size = 'small',
  selectedChain,
  setSelectedChain
}: SelectFormChainProps) => {
  const t = useTranslations('Forms.selectChainForm')

  const selectedValue = chainOptions.find(option => 
    option.chain.protocol === selectedChain.protocol &&
    option.chain.name === selectedChain.name &&
    option.chain.network === selectedChain.network
  )?.value || 'ethereum-mainnet'

  const handleChange = (value: string) => {
    const option = chainOptions.find(opt => opt.value === value)
    if (option) {
      setSelectedChain(option.chain)
    }
  }

  return (
    <SelectForm
      label={t('label')}
      size={size}
      options={chainOptions.map(opt => ({ value: opt.value, label: opt.label }))}
      selectedValue={selectedValue}
      setSelectedValue={handleChange}
    />
  )
}
