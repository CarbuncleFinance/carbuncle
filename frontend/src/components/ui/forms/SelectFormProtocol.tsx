'use client'

import React from 'react'
import { useTranslations } from 'next-intl'
import { ChainProtocol } from '@/domains/blockchain/types'
import { SelectForm } from '@/components/ui/forms/SelectForm'

type SelectFormProtocolProps = {
  size?: 'small' | 'medium'
  selectedProtocol: ChainProtocol
  setSelectedProtocol: (protocol: ChainProtocol) => void
}

const protocolOptions: {
  value: string
  label: string
  protocol: ChainProtocol
}[] = [
  {
    value: 'xrpl',
    label: 'XRPL',
    protocol: ChainProtocol.XRPL
  },
  {
    value: 'evm',
    label: 'EVM',
    protocol: ChainProtocol.EVM
  }
]

export const SelectFormProtocol = ({
  size = 'small',
  selectedProtocol,
  setSelectedProtocol
}: SelectFormProtocolProps) => {
  const t = useTranslations('Forms.selectProtocolForm')

  const selectedValue =
    protocolOptions.find((option) => option.protocol === selectedProtocol)
      ?.value || 'xrpl'

  const handleChange = (value: string) => {
    const option = protocolOptions.find((opt) => opt.value === value)
    if (option) {
      setSelectedProtocol(option.protocol)
    }
  }

  return (
    <SelectForm
      label={t('label')}
      size={size}
      options={protocolOptions.map((opt) => ({
        value: opt.value,
        label: opt.label
      }))}
      selectedValue={selectedValue}
      setSelectedValue={handleChange}
    />
  )
}
