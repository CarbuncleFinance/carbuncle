'use client'

import { useTranslations } from 'next-intl'
import Button from '@mui/material/Button'
import InputAdornment from '@mui/material/InputAdornment'
import InputLabel from '@mui/material/InputLabel'
import FormControl from '@mui/material/FormControl'
import FormHelperText from '@mui/material/FormHelperText'
import OutlinedInput from '@mui/material/OutlinedInput'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import type { ReactFormExtendedApi } from '@tanstack/react-form'
import type { BridgeFormSchema } from '@/app/[locale]/(main)/bridge/_forms/bridgeFormSchema'
import type { BridgeFormValues } from '@/app/[locale]/(main)/bridge/_forms/useBridgeForm'

type BridgeFormAmountInputProps = {
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
  schema: BridgeFormSchema
  symbol?: string
}

export default function BridgeFormAmountInput({
  form,
  schema,
  symbol = 'XRP'
}: BridgeFormAmountInputProps) {
  const t = useTranslations('bridge.steps.amount')
  const tErrors = useTranslations('Errors')

  return (
    <form.Field
      name="amount"
      validators={{
        onChange: ({ value }: { value: string }) => {
          const result = schema.shape.amount.safeParse(value)
          return result.success ? undefined : result.error.issues[0]?.message
        }
      }}
    >
      {(field) => (
        <FormControl
          error={field.state.meta.errors.length > 0}
          variant="outlined"
        >
          <InputLabel htmlFor="bridge-amount-input">{t('label')}</InputLabel>
          <OutlinedInput
            label={t('label')}
            id="bridge-amount-input"
            type="text"
            autoFocus={false}
            value={field.state.value}
            onChange={(e) => field.handleChange(e.target.value)}
            startAdornment={
              <InputAdornment position="start">
                <img
                  src={`/icons/${symbol}.png`}
                  alt={symbol}
                  width={24}
                  height={24}
                />
              </InputAdornment>
            }
            endAdornment={
              <InputAdornment position="end">
                <Button variant="text" endIcon={<ExpandMoreIcon />}>
                  {symbol}
                </Button>
              </InputAdornment>
            }
            aria-describedby="bridge-amount-input-helper-text"
            inputProps={{
              'aria-label': 'bridge-amount-input'
            }}
          />
          <FormHelperText>
            {field.state.meta.errors.length > 0
              ? tErrors(field.state.meta.errors[0])
              : ''}
          </FormHelperText>
        </FormControl>
      )}
    </form.Field>
  )
}
