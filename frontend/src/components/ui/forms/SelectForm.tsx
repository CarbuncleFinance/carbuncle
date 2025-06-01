'use client'

import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import Select, { SelectChangeEvent } from '@mui/material/Select'

type SelectFormProps<T extends string> = {
  label: string
  size?: 'small' | 'medium'
  options: { value: T; label: string }[]
  selectedValue: T
  setSelectedValue: (value: T) => void
}

export const SelectForm = <T extends string>({
  label,
  size = 'small',
  options,
  selectedValue,
  setSelectedValue
}: SelectFormProps<T>) => {
  const handleChange = (event: SelectChangeEvent<T>) => {
    setSelectedValue(event.target.value as T)
  }

  return (
    <FormControl fullWidth>
      <InputLabel>{label}</InputLabel>
      <Select
        variant="outlined"
        label={label}
        size={size}
        value={selectedValue}
        onChange={handleChange}
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
