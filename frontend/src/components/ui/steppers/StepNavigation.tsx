'use client'

import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import { StepNavigationProps } from '../../views/bridge/types'

export default function StepNavigation({
  showBack,
  showNext,
  showExecute = false,
  onBack,
  onNext,
  onExecute,
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
      {showExecute && (
        <Button
          variant="contained"
          color="primary"
          type="submit"
          disableElevation
        >
          Execute
        </Button>
      )}
    </Box>
  )
}
