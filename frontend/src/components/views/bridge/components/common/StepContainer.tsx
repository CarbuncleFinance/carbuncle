'use client'

import { useTranslations } from 'next-intl'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { StepContainerProps } from '../../types'

export default function StepContainer({
  children,
  title,
  titleKey
}: StepContainerProps) {
  const t = useTranslations()

  const displayTitle = titleKey ? t(titleKey) : title

  return (
    <Box
      display="flex"
      flexDirection="column"
      gap={2}
      pt={2}
      sx={{ backgroundColor: '#1a1a1a', borderRadius: 1, p: 2, color: '#fff' }}
    >
      {displayTitle && (
        <Typography variant="caption" sx={{ fontSize: 14, pb: 2 }}>
          {displayTitle}
        </Typography>
      )}
      {children}
    </Box>
  )
}
