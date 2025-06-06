'use client'

import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'

type BalanceInfoCardProps = {
  size: number
}

export default function BalanceInfoCard({ size }: BalanceInfoCardProps) {
  return (
    <Grid size={size}>
      <Card variant="outlined">
        <CardContent>
          <Box mb={3}>
            <Typography
              variant="h6"
              sx={{ fontWeight: 'bold', color: 'text.primary' }}
            >
              残高情報
            </Typography>
            <Typography variant="body2" color="text.secondary">
              接続中のアカウントの残高情報です。
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </Grid>
  )
}
