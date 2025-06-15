'use client'

import { useEffect, useState } from 'react'
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
import Dialog from '@/app/[locale]/(main)/home/_components/dialogs/Dialog'
import { useWallet } from '@/hooks/useWallet'

interface GridAssetsToSupplyCardProps {
  size: number
  address: string
  walletBalances: any
}

export default function GridAssetsToSupplyCard({
  size,
  address,
  walletBalances
}: GridAssetsToSupplyCardProps) {
  const { isConnected } = useWallet()
  const t = useTranslations('Market')

  const [token, setToken] = useState<any>(null)
  const [openDialog, setOpenDialog] = useState(false)

  const handleOpenDialog = (token: any) => {
    setToken(token)
    setOpenDialog(true)
  }

  const handleCloseDialog = () => {
    setOpenDialog(false)
  }

  if (!isConnected) {
    return null
  }

  return (
    <Grid size={size}>
      <Card title={t('cards.assetsToSupply')}>
        <TableContainer>
          <Table aria-label="account info table">
            <TableHead>
              <TableRow>
                <TableCell>{t('tables.asset')}</TableCell>
                <TableCell>{t('tables.balance')}</TableCell>
                <TableCell>{t('tables.apy')}</TableCell>
                <TableCell>{t('tables.canBeCollateral')}</TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {walletBalances.map((asset: any) => (
                <TableRow key={asset.symbol}>
                  <TableCell
                    sx={{ display: 'flex', alignItems: 'center', gap: 1 }}
                  >
                    <Avatar
                      alt={asset.name}
                      src={asset.icon}
                      sx={{ width: 32, height: 32 }}
                    />
                    <Typography variant="body1" sx={{ ml: 0.5 }}>
                      {asset.symbol}
                    </Typography>
                  </TableCell>
                  <TableCell>{asset.balance}</TableCell>
                  <TableCell>{asset.apy} %</TableCell>
                  <TableCell>
                    {asset.collateral ? t('tables.yes') : t('tables.no')}
                  </TableCell>
                  <TableCell>
                    <Box sx={{ display: 'flex', gap: 1 }}>
                      <Button
                        variant="contained"
                        color="primary"
                        size="small"
                        disabled={asset.name !== 'XRP'}
                        onClick={() => handleOpenDialog(asset)}
                      >
                        {t('buttons.supply')}
                      </Button>
                    </Box>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>

      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        title={`${t('dialog.supply')} ${token?.symbol || ''}`}
        token={token}
        address={address}
      />
    </Grid>
  )
}
