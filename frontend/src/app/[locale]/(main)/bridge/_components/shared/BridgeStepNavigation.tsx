'use client'

import Box from '@mui/material/Box'
import Button from '@mui/material/Button'

type BridgeStepNavigationProps = {
  showBack?: boolean
  showNext?: boolean
  showExecute?: boolean
  nextDisabled?: boolean
  onBack?: () => void
  onNext?: () => void
  onExecute?: () => void
}

export default function BridgeStepNavigation({
  showBack = false,
  showNext = false,
  showExecute = false,
  nextDisabled = false,
  onBack,
  onNext,
  onExecute
}: BridgeStepNavigationProps) {
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
          onClick={onExecute}
          disableElevation
        >
          Execute
        </Button>
      )}
    </Box>
  )
}
