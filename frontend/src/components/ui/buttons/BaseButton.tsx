'use client'

import { useTranslations } from 'next-intl'
import { Button, type SxProps } from '@mui/material'

interface BaseButtonProps {
  translations: string
  label: string
  variant: 'contained' | 'outlined' | 'text'
  color: 'primary' | 'secondary' | 'error' | 'warning' | 'info' | 'success' | 'inherit'
  className?: string
  sx?: SxProps
}

export default function BaseButton({ translations, label, variant, color, className, sx }: BaseButtonProps) {
  const t = useTranslations(translations)

  return (
    <Button variant={variant} color={color} className={className} sx={sx}>
      {t(label)}
    </Button>
  )
}
