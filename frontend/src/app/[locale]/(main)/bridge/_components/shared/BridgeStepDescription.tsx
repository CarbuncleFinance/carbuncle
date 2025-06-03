'use client'

import { useTranslations } from 'next-intl'
import Typography from '@mui/material/Typography'

type BridgeStepDescriptionProps = {
  namespace: string
  translationKey: string
}

export default function BridgeStepDescription({
  namespace,
  translationKey
}: BridgeStepDescriptionProps) {
  const t = useTranslations(namespace)

  return (
    <Typography variant="body1" sx={{ color: '#fff', py: 2 }}>
      {t(translationKey)}
    </Typography>
  )
}
