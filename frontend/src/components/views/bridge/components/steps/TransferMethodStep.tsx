'use client'

import FormControl from '@mui/material/FormControl'
import FormControlLabel from '@mui/material/FormControlLabel'
import Radio from '@mui/material/Radio'
import RadioGroup from '@mui/material/RadioGroup'
import StepContainer from '../common/StepContainer'
import StepNavigation from '../common/StepNavigation'
import { TransferMethodStepProps } from '../../types'

export default function TransferMethodStep({
  onNext
}: TransferMethodStepProps) {
  return (
    <StepContainer title="現在は新しい振込先のみ利用可能です。">
      <FormControl>
        <RadioGroup
          aria-labelledby="demo-radio-buttons-group-label"
          defaultValue="new"
          name="radio-buttons-group"
        >
          <FormControlLabel
            value="new"
            control={<Radio />}
            label="新しい振込先"
            checked
          />
          <FormControlLabel
            value="existing"
            control={<Radio />}
            label="既存の振込先"
            disabled
          />
        </RadioGroup>
      </FormControl>
      <StepNavigation showBack={false} showNext={true} onNext={onNext} />
    </StepContainer>
  )
}
