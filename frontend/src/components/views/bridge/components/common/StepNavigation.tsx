'use client'

import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import { StepNavigationProps } from '../../types'

export default function StepNavigation({
  showBack,
  showNext,
  onBack,
  onNext,
  nextDisabled = false
}: StepNavigationProps) {
  return (
    <Box display="flex" justifyContent="flex-end" gap={1}>
      {showBack && (
        <Button
          variant="outlined"
          color="primary"
          onClick={onBack}
          disableElevation
        >
          Back
        </Button>
      )}
      {showNext && (
        <Button
          variant="contained"
          color="primary"
          onClick={onNext}
          disableElevation
          disabled={nextDisabled}
        >
          Next
        </Button>
      )}
    </Box>
  )
}
