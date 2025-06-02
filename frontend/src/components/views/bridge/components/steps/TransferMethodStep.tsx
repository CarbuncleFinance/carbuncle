'use client'

import { useTranslations } from 'next-intl'
import FormControl from '@mui/material/FormControl'
import FormControlLabel from '@mui/material/FormControlLabel'
import Radio from '@mui/material/Radio'
import RadioGroup from '@mui/material/RadioGroup'
import StepContainer from '../../../../ui/steppers/StepContainer'
import StepNavigation from '../../../../ui/steppers/StepNavigation'
import { TransferMethodStepProps } from '../../types'

export default function TransferMethodStep({
  onNext
}: TransferMethodStepProps) {
  const t = useTranslations('BridgeContent')

  return (
    <StepContainer title={t('newDestinationOnly')}>
      <FormControl>
        <RadioGroup
          aria-labelledby="demo-radio-buttons-group-label"
          defaultValue="new"
          name="radio-buttons-group"
        >
          <FormControlLabel
            value="new"
            control={<Radio />}
            label={t('newDestination')}
            checked
          />
          <FormControlLabel
            value="existing"
            control={<Radio />}
            label={t('existingDestination')}
            disabled
          />
        </RadioGroup>
      </FormControl>
      <StepNavigation showBack={false} showNext={true} onNext={onNext} />
    </StepContainer>
  )
}
