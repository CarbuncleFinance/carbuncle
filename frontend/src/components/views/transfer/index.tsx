'use client'

import { useTranslations } from 'next-intl'
import PageLayout from '@/components/features/layout/PageLayout'
import { Typography } from '@mui/material'

export default function TransferView() {
  const t = useTranslations('Pages')

  return (
    <PageLayout>
      <Typography variant="h5" sx={{ color: '#fff' }}>
        {t('transfer')}
      </Typography>
    </PageLayout>
  )
}
