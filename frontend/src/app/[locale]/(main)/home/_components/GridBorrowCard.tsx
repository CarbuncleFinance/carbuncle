'use client'

import Avatar from '@mui/material/Avatar'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Typography from '@mui/material/Typography'
import { useTranslations } from 'next-intl'
import Button from '@/components/ui/buttons/Button'
import Card from '@/components/ui/cards/Card'
import { useWallet } from '@/hooks/useWallet'

interface GridBorrowCardProps {
  size: number
}

export default function GridBorrowCard({ size }: GridBorrowCardProps) {
  const { isConnected } = useWallet()
  const t = useTranslations('Market')

  if (!isConnected) {
    return null
  }

  return (
    <Grid size={size}>
      <Card title={t('cards.yourBorrows')}>
        <TableContainer>
          <Table aria-label="account info table">
            <TableHead>
              <TableRow>
                <TableCell>{t('tables.asset')}</TableCell>
                <TableCell>{t('tables.balance')}</TableCell>
                <TableCell>{t('tables.apy')}</TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell
                  sx={{ display: 'flex', alignItems: 'center', gap: 1 }}
                >
                  <Avatar
                    alt="XRP"
                    src="/icons/XRP.png"
                    sx={{ width: 32, height: 32 }}
                  />
                  <Typography variant="body1" sx={{ ml: 0.5 }}>
                    XRP
                  </Typography>
                </TableCell>
                <TableCell>100</TableCell>
                <TableCell>100</TableCell>
                <TableCell>
                  <Box sx={{ display: 'flex', gap: 1 }}>
                    <Button variant="contained" color="primary" size="small">
                      {t('buttons.supply')}
                    </Button>
                    <Button variant="outlined" color="primary" size="small">
                      {t('buttons.withdraw')}
                    </Button>
                  </Box>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Card>
    </Grid>
  )
}
