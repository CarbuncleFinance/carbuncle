'use client'

import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import CircularProgress from '@mui/material/CircularProgress'

type BridgeStepNavigationProps = {
  showBack?: boolean
  showNext?: boolean
  showExecute?: boolean
  nextDisabled?: boolean
  isLoading?: boolean
  onBack?: () => void
  onNext?: () => void
  onExecute?: () => void
}

export default function BridgeStepNavigation({
  showBack = false,
  showNext = false,
  showExecute = false,
  nextDisabled = false,
  isLoading = false,
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
          disabled={isLoading}
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
          disabled={isLoading}
          startIcon={
            isLoading ? (
              <CircularProgress size={16} color="inherit" />
            ) : undefined
          }
        >
          {isLoading ? 'Loading...' : 'Execute'}
        </Button>
      )}
    </Box>
  )
}
