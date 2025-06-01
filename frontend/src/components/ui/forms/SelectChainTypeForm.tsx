'use client'

import { useTranslations } from 'next-intl'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import { ChainTypes, ChainType, ChainTypeNames } from '@/types/enums'

type SelectChainTypeFormProps = {
  selectedChainType: ChainType
  handleChangeChainType: (event: SelectChangeEvent<ChainType>) => void
}

const options = Object.values(ChainTypes).map((chainType) => ({
  value: chainType,
  label: ChainTypeNames[chainType]
}))

export const SelectChainTypeForm = ({
  selectedChainType,
  handleChangeChainType
}: SelectChainTypeFormProps) => {
  const t = useTranslations('Forms.selectChainTypeForm')

  return (
    <FormControl fullWidth>
      <InputLabel id="chain-type-label">ChainType</InputLabel>
      <Select
        variant="outlined"
        label={t('label')}
        size="small"
        value={selectedChainType}
        onChange={handleChangeChainType}
      >
        {options.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  )
}
