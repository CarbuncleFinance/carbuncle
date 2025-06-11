'use client'

import Avatar from '@mui/material/Avatar'
import Box from '@mui/material/Box'
import Card from '@/components/ui/cards/Card'
import CardActions from '@mui/material/CardActions'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import { useTranslations } from 'next-intl'
import { useWallet } from '@/hooks/useWallet'
import { useWalletConnect } from '@/hooks/useWalletConnect'
import Button from '@/components/ui/buttons/Button'

import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'

const rows = [{ name: 'XRP', value: '0x1234567890' }]

export default function SectionHero() {
  const t = useTranslations('Home')

  const { isConnected, accountInfo } = useWallet()

  const {
    connectEvm: handleConnectEvm,
    disconnectEvm,
    linkedWallet
  } = useWalletConnect()

  if (!isConnected) {
    return (
      <Typography
        variant="body1"
        sx={{ textAlign: 'center', mt: 28, color: 'text.secondary' }}
      >
        {t('connectWalletMessage')}
      </Typography>
    )
  }

  return (
    <>
      <Grid size={6}>
        <Card title="YOUR SUPPLIES">
          <TableContainer>
            <Table aria-label="account info table">
              <TableHead>
                <TableRow>
                  <TableCell>Asset</TableCell>
                  <TableCell>Balance</TableCell>
                  <TableCell>APY</TableCell>
                  <TableCell></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell
                    sx={{ display: 'flex', alignItems: 'center', gap: 1 }}
                  >
                    <Avatar alt="XRP" src="/icons/XRP.png" />
                    <Typography variant="body1" sx={{ ml: 0.5 }}>
                      XRP
                    </Typography>
                  </TableCell>
                  <TableCell>100</TableCell>
                  <TableCell>100</TableCell>
                  <TableCell>
                    <Box sx={{ display: 'flex', gap: 1 }}>
                      <Button variant="contained" color="primary">
                        Supply
                      </Button>
                      <Button variant="outlined" color="primary">
                        Withdraw
                      </Button>
                    </Box>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Card>
      </Grid>

      <Grid size={6}>
        <Card title="LINKED ACCOUNT INFO">
          {/*
          {!linkedWallet.isConnected && <Box>未設定</Box>}
          {/** Address */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Typography variant="body1">Address:</Typography>
            <Typography variant="body1">
              {linkedWallet.address || '-'}
            </Typography>
          </Box>

          <CardActions sx={{ justifyContent: 'flex-end' }}>
            {!linkedWallet.isConnected && (
              <Button
                variant="contained"
                color="primary"
                size="small"
                disableElevation
                onClick={handleConnectEvm}
              >
                LINK ACCOUNT
              </Button>
            )}
            {linkedWallet.isConnected && (
              <Button
                variant="outlined"
                color="error"
                size="small"
                disableElevation
                onClick={disconnectEvm}
              >
                DISCONNECT
              </Button>
            )}
          </CardActions>
        </Card>
      </Grid>
    </>
  )
}
