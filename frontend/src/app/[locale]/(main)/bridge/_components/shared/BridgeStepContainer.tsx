'use client'

import Box from '@mui/material/Box'

type BridgeStepContainerProps = {
  children: React.ReactNode
}

export default function BridgeStepContainer({
  children
}: BridgeStepContainerProps) {
  return (
    <Box
      display="flex"
      flexDirection="column"
      gap={2}
      pt={2}
      sx={{ backgroundColor: '#1a1a1a', borderRadius: 1, p: 2, color: '#fff' }}
    >
      {children}
    </Box>
  )
}
