'use client'

import { useState } from 'react'
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
import { TokenBalance } from '@/types'

interface GridSupplyCardProps {
  size: number
  supplyBalances: TokenBalance[]
}

export default function GridSupplyCard({
  size,
  supplyBalances
}: GridSupplyCardProps) {
  const { isConnected } = useWallet()

  const [openDialog, setOpenDialog] = useState(false)

  const handleOpenDialog = () => {
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
              {supplyBalances.map((asset: any) => (
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
                    <Box sx={{ display: 'flex', gap: 1 }}>
                      <Button
                        variant="contained"
                        color="primary"
                        size="small"
                        disabled
                        onClick={() => handleOpenDialog()}
                      >
                        Withdraw
                      </Button>
                    </Box>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>
    </Grid>
  )
}
