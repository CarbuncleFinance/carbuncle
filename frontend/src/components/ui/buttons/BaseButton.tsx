'use client'

import { useTranslations } from 'next-intl'
import { Button, type SxProps } from '@mui/material'

interface BaseButtonProps {
  label: string
  variant: 'contained' | 'outlined' | 'text'
  color:
    | 'primary'
    | 'secondary'
    | 'error'
    | 'warning'
    | 'info'
    | 'success'
    | 'inherit'
  className?: string
  sx?: SxProps
  onClick?: () => void
}

export default function BaseButton({
  label,
  variant,
  color,
  className,
  sx,
  onClick
}: BaseButtonProps) {
  const t = useTranslations(label)

  return (
    <Button
      variant={variant}
      color={color}
      className={className}
      sx={sx}
      onClick={onClick}
    >
      {t('label')}
    </Button>
  )
}
