'use client'

import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import StepContainer from '../common/StepContainer'
import StepNavigation from '../common/StepNavigation'
import { BlockchainSelectionStepProps } from '../../types'

export default function BlockchainSelectionStep({
  blockchain,
  setBlockchain,
  onBack,
  onNext
}: BlockchainSelectionStepProps) {
  return (
    <StepContainer title="振込先のブロックチェーンを選択してください。">
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
      <StepNavigation
        showBack={true}
        showNext={true}
        onBack={onBack}
        onNext={onNext}
      />
    </StepContainer>
  )
}
