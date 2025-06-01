'use client'

import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { StepContainerProps } from '../../types'

export default function StepContainer({ children, title }: StepContainerProps) {
  return (
    <Box
      display="flex"
      flexDirection="column"
      gap={2}
      pt={2}
      sx={{ backgroundColor: '#1a1a1a', borderRadius: 1, p: 2, color: '#fff' }}
    >
      <Typography variant="caption" sx={{ fontSize: 14, pb: 2 }}>
        {title}
      </Typography>
      {children}
    </Box>
  )
}
