'use client'

import { useTranslations } from 'next-intl'
import { ChainTypes, ChainType, ChainTypeNames } from '@/types/enums'
import { SelectForm } from '@/components/ui/forms/SelectForm'

type SelectFormChainTypeProps = {
  size?: 'small' | 'medium'
  selectedChainType: ChainType
  setSelectedChainType: (chainType: ChainType) => void
}

const options = Object.values(ChainTypes).map((chainType) => ({
  value: chainType,
  label: ChainTypeNames[chainType]
}))

export const SelectFormChainType = ({
  size = 'small',
  selectedChainType,
  setSelectedChainType
}: SelectFormChainTypeProps) => {
  const t = useTranslations('Forms.selectChainTypeForm')

  return (
    <SelectForm
      label={t('label')}
      size={size}
      options={options}
      selectedValue={selectedChainType}
      setSelectedValue={setSelectedChainType}
    />
  )
}
