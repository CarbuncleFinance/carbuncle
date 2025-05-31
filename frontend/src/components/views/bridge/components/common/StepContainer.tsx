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
      sx={{ backgroundColor: '#fbfaf5', borderRadius: 1, p: 2 }}
    >
      <Typography variant="caption" sx={{ fontSize: 14, color: '#000' }}>
        {title}
      </Typography>
      {children}
    </Box>
  )
}
