'use client'

import Box from '@mui/material/Box'
import CircularProgress from '@mui/material/CircularProgress'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import RefreshIcon from '@mui/icons-material/Refresh'

type BridgeFormAmountHeaderProps = {
  balance: number
  isBalanceLoading: boolean
  refetchBalance: () => void
  isConnected: boolean
}

export default function BridgeFormAmountHeader({
  balance,
  isBalanceLoading,
  refetchBalance,
  isConnected
}: BridgeFormAmountHeaderProps) {
  return (
    <Box display="flex" justifyContent="space-between" alignItems="center">
      <Typography variant="caption" sx={{ color: '#aaa', fontSize: 12 }}>
        残高
      </Typography>
      <Box display="flex" alignItems="center" gap={1}>
        {isBalanceLoading ? (
          <CircularProgress size={16} sx={{ color: '#aaa' }} />
        ) : (
          <Typography variant="body2" sx={{ color: '#fff' }}>
            {balance !== undefined ? balance : '--'} XRP
          </Typography>
        )}
        <IconButton
          size="small"
          onClick={() => refetchBalance()}
          disabled={isBalanceLoading || !isConnected}
          sx={{ color: '#aaa', '&:hover': { color: '#fff' } }}
        >
          <RefreshIcon fontSize="small" />
        </IconButton>
      </Box>
    </Box>
  )
}
