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
import Button from '@/components/ui/buttons/Button'
import Card from '@/components/ui/cards/Card'
import Dialog from '@/app/[locale]/(main)/home/_components/dialogs/Dialog'
import { useWallet } from '@/hooks/useWallet'
import { useLendingSupply } from '@/hooks/useLendingSupply'

interface GridAssetsToSupplyCardProps {
  size: number
}

export default function GridAssetsToSupplyCard({
  size
}: GridAssetsToSupplyCardProps) {
  const { isConnected, address } = useWallet()

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

  const { data, fetchData } = useLendingSupply()

  useEffect(() => {
    if (isConnected) {
      fetchData()
    }
  }, [isConnected])

  return (
    <Grid size={size}>
      <Card title="ASSETS TO SUPPLY">
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
              {data.map((asset) => (
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
                  <TableCell>{asset.collateral ? 'Yes' : 'No'}</TableCell>
                  <TableCell>
                    <Box sx={{ display: 'flex', gap: 1 }}>
                      <Button
                        variant="contained"
                        color="primary"
                        size="small"
                        onClick={() => handleOpenDialog(asset)}
                      >
                        Supply
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
        title={`Supply ${token?.symbol || ''}`}
        token={token}
      />
    </Grid>
  )
}
