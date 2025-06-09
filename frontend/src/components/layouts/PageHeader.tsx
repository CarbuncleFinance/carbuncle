'use client'

import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

interface PageHeaderProps {
  title: string
  description?: string
}

export default function PageHeader({ title, description }: PageHeaderProps) {
  return (
    <Box mt={2} mb={4}>
      <Typography variant="h4" sx={{ fontWeight: '400' }}>
        {title}
      </Typography>
      {description && (
        <Typography variant="body1" mt={1} sx={{ color: 'text.secondary' }}>
          {description}
        </Typography>
      )}
    </Box>
  )
}
