'use client'

import { useState } from 'react'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import FormControl from '@mui/material/FormControl'
import FormControlLabel from '@mui/material/FormControlLabel'
import InputLabel from '@mui/material/InputLabel'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import Radio from '@mui/material/Radio'
import RadioGroup from '@mui/material/RadioGroup'
import Stepper from '@mui/material/Stepper'
import Step from '@mui/material/Step'
import StepContent from '@mui/material/StepContent'
import StepLabel from '@mui/material/StepLabel'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import PageLayout from '@/components/features/layout/PageLayout'
import WalletConnectEvnButton from '@/components/ui/buttons/WalletConnectEvnButton'
import { useAccount } from 'wagmi'

export default function BridgeView() {
  const [blockchain, setBlockchain] = useState('')

  const { isConnected, address } = useAccount()

  const [activeStep, setActiveStep] = useState(0)

  const handleNext = () => {
    setActiveStep(activeStep + 1)
  }

  const handleBack = () => {
    setActiveStep(activeStep - 1)
  }

  return (
    <PageLayout maxWidth="sm">
      <Typography variant="h5" mb={2} sx={{ color: '#fff' }}>
        Bridge
      </Typography>
      <Stepper activeStep={activeStep} orientation="vertical">
        <Step key={0}>
          <StepLabel>
            <Typography variant="caption" sx={{ fontSize: 14, color: '#fff' }}>
              振込方法を選択してください。
            </Typography>
          </StepLabel>
          <StepContent>
            <Box
              display="flex"
              flexDirection="column"
              gap={2}
              pt={2}
              sx={{ backgroundColor: '#fbfaf5', borderRadius: 1, p: 2 }}
            >
              <Typography
                variant="caption"
                sx={{ fontSize: 14, color: '#000' }}
              >
                現在は新しい振込先のみ利用可能です。
              </Typography>
              <FormControl>
                <RadioGroup
                  aria-labelledby="demo-radio-buttons-group-label"
                  defaultValue="female"
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
              <Box display="flex" justifyContent="flex-end">
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleNext}
                  disableElevation
                >
                  Next
                </Button>
              </Box>
            </Box>
          </StepContent>
        </Step>

        <Step key={1}>
          <StepLabel>
            <Typography variant="caption" sx={{ fontSize: 14, color: '#fff' }}>
              振込先を選択してください。
            </Typography>
          </StepLabel>
          <StepContent>
            <Box
              display="flex"
              flexDirection="column"
              gap={2}
              pt={2}
              sx={{ backgroundColor: '#fbfaf5', borderRadius: 1, p: 2 }}
            >
              <Typography
                variant="caption"
                sx={{ fontSize: 14, color: '#000' }}
              >
                振込先のブロックチェーンを選択してください。
              </Typography>
              <FormControl fullWidth>
                <InputLabel id="blockchain-select-label">Blockchain</InputLabel>
                <Select
                  labelId="blockchain-select-label"
                  id="blockchain-select"
                  value={blockchain}
                  label="Blockchain"
                  onChange={(e) => setBlockchain(e.target.value)}
                >
                  <MenuItem value="xrpl-evm">XRPL EVM</MenuItem>
                </Select>
              </FormControl>
              <Box display="flex" justifyContent="flex-end" gap={1}>
                <Button
                  variant="outlined"
                  color="primary"
                  onClick={handleBack}
                  disableElevation
                >
                  Back
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleNext}
                  disableElevation
                >
                  Next
                </Button>
              </Box>
            </Box>
          </StepContent>
        </Step>

        <Step key={2}>
          <StepLabel>
            <Typography variant="caption" sx={{ fontSize: 14, color: '#fff' }}>
              振込先のアドレスを入力してください。
            </Typography>
          </StepLabel>
          <StepContent>
            <Box
              display="flex"
              flexDirection="column"
              gap={2}
              pt={2}
              sx={{ backgroundColor: '#fbfaf5', borderRadius: 1, p: 2 }}
            >
              {isConnected && (
                <Typography
                  variant="caption"
                  sx={{ fontSize: 14, color: '#000' }}
                >
                  宛先: {address}
                </Typography>
              )}
              <WalletConnectEvnButton />
              <Box display="flex" justifyContent="flex-end" gap={1}>
                <Button
                  variant="outlined"
                  color="primary"
                  onClick={handleBack}
                  disableElevation
                >
                  Back
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleNext}
                  disableElevation
                >
                  Next
                </Button>
              </Box>
            </Box>
          </StepContent>
        </Step>

        <Step key={3}>
          <StepLabel>
            <Typography variant="caption" sx={{ fontSize: 14, color: '#fff' }}>
              振込金額を入力してください。
            </Typography>
          </StepLabel>
          <StepContent>
            <Box
              display="flex"
              flexDirection="column"
              gap={2}
              pt={2}
              sx={{ backgroundColor: '#fbfaf5', borderRadius: 1, p: 2 }}
            >
              <TextField
                label="振込金額"
                type="number"
                fullWidth
              />
            </Box>
          </StepContent>
        </Step>
      </Stepper>
    </PageLayout>
  )
}
