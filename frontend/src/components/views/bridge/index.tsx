'use client'

import { useState } from 'react'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Stepper from '@mui/material/Stepper'
import Step from '@mui/material/Step'
import StepButton from '@mui/material/StepButton'
import StepContent from '@mui/material/StepContent'
import StepLabel from '@mui/material/StepLabel'
import Typography from '@mui/material/Typography'
import PageLayout from '@/components/features/layout/PageLayout'

export default function BridgeView() {
  const [activeStep, setActiveStep] = useState(0)

  return (
    <PageLayout maxWidth="sm">
      <div style={{ color: '#fff' }}>Bridge</div>
      <Stepper activeStep={activeStep} orientation="horizontal">
        <Step key={0}>
          <StepLabel>
            <Typography sx={{ fontSize: 14, color: '#fff' }}>Step 1</Typography>
          </StepLabel>
        </Step>

        <Step key={1}>
          <StepLabel>
            <Typography sx={{ fontSize: 14, color: '#fff' }}>Step 2</Typography>
          </StepLabel>
        </Step>

        <Step key={2}>
          <StepLabel>
            <Typography sx={{ fontSize: 14, color: '#fff' }}>Step 3</Typography>
          </StepLabel>
        </Step>
      </Stepper>

      {activeStep === 0 && (
        <Box sx={{ p: 2 }}>
          <Typography sx={{ fontSize: 14, color: '#fff' }}>
            Step 1 Content
          </Typography>
          <Button variant="contained" color="primary">
            Next
          </Button>
        </Box>
      )}
    </PageLayout>
  )
}
