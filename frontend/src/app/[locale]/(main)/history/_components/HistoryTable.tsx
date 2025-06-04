'use client'

import { useEffect } from 'react'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import OpenInNewIcon from '@mui/icons-material/OpenInNew'
import { useHistory } from '@/hooks/useHistory'
import { useWallet } from '@/hooks/useWallet'
import { shortenString } from '@/utils/string'
import { AXELAR_SCAN_URL } from '@/constants/app'

export default function HistoryTable() {
  const { address } = useWallet()
  const { data, handleGetData } = useHistory()

  useEffect(() => {
    if (address) {
      handleGetData(address)
    }
  }, [address])

  // 別タブを開く
  const handleOpenInNewTab = (txHash: string) => {
    window.open(`${AXELAR_SCAN_URL}/gmp/${txHash}`, '_blank')
  }

  return (
    <TableContainer>
      <Table aria-label="history-table">
        <TableHead>
          <TableRow>
            <TableCell>Date</TableCell>
            <TableCell>Type</TableCell>
            <TableCell>Tx Hash</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row) => (
            <TableRow key={row.id}>
              <TableCell>
                <Typography variant="body2" component="span">
                  {row.created_at}
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="body2" component="span">
                  Bridge
                </Typography>
              </TableCell>
              <TableCell>
                <Typography
                  variant="body2"
                  component="span"
                  sx={{ color: 'white' }}
                >
                  {shortenString(row.tx_hash, 25)}
                </Typography>
                <IconButton
                  size="small"
                  onClick={() => handleOpenInNewTab(row.tx_hash)}
                  sx={{ ml: 1, color: 'white' }}
                >
                  <OpenInNewIcon fontSize="small" />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
