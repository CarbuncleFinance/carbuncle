'use client'

import { Card as MuiCard, CardProps as MuiCardProps } from '@mui/material'
import CardContent from '@mui/material/CardContent'
import Divider from '@mui/material/Divider'
import Typography from '@mui/material/Typography'

interface CardProps extends MuiCardProps {
  children: React.ReactNode
  title: string
}

export default function Card({ children, title, ...props }: CardProps) {
  return (
    <MuiCard variant="outlined" sx={{ py: 1, px: 2 }} {...props}>
      <CardContent>
        <Typography
          variant="h6"
          sx={{ mb: 2, fontWeight: '400', fontSize: '18px' }}
        >
          {title}
        </Typography>
        <Divider sx={{ my: 2 }} />
        {children}
      </CardContent>
    </MuiCard>
  )
}
