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
import Button from '@/components/ui/buttons/Button'
import Card from '@/components/ui/cards/Card'
import { useWallet } from '@/hooks/useWallet'

interface GridAssetsToBorrowCardProps {
  size: number
}

export default function GridAssetsToBorrowCard({
  size
}: GridAssetsToBorrowCardProps) {
  const { isConnected } = useWallet()

  if (!isConnected) {
    return null
  }

  return (
    <Grid size={size}>
      <Card title="ASSETS TO BORROW">
        <TableContainer>
          <Table aria-label="account info table">
            <TableHead>
              <TableRow>
                <TableCell>Asset</TableCell>
                <TableCell>Balance</TableCell>
                <TableCell>APY</TableCell>
                <TableCell>Can be collateral</TableCell>
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
                <TableCell>Yes</TableCell>
                <TableCell>
                  <Box sx={{ display: 'flex', gap: 1 }}>
                    <Button variant="contained" color="primary" size="small">
                      Supply
                    </Button>
                    <Button variant="outlined" color="primary" size="small">
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
  )
}
