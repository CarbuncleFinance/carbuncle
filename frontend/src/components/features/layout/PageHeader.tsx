'use client'

import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

interface PageHeaderProps {
  title: string
}

export default function PageHeader({ title }: PageHeaderProps) {
  return (
    <Box mb={1}>
      <Typography variant="h5" sx={{ fontWeight: 'bold', color: '#fff' }}>
        {title}
      </Typography>
    </Box>
  )
}
