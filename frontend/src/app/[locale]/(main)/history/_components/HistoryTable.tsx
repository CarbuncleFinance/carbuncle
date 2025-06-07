'use client'

import { useEffect } from 'react'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Typography from '@mui/material/Typography'
import { useTranslations } from 'next-intl'
import { useHistory } from '@/hooks/useHistory'
import { useWallet } from '@/hooks/useWallet'
import { shortenString } from '@/utils/string'
import { AXELAR_SCAN_URL, XRPL_SCAN_URL } from '@/constants/app'

export default function HistoryTable() {
  const { address } = useWallet()
  const { data, handleGetData } = useHistory()
  const t = useTranslations('History.table')

  useEffect(() => {
    if (address) {
      handleGetData(address)
    }
  }, [address])

  // 別タブを開く
  const handleOpenInNewTab = (txHash: string, type: 'xrpl' | 'axelar') => {
    if (type === 'axelar') {
      window.open(`${AXELAR_SCAN_URL}/gmp/${txHash}`, '_blank')
    } else {
      window.open(`${XRPL_SCAN_URL}/transactions/${txHash}`, '_blank')
    }
  }

  return (
    <TableContainer>
      <Table aria-label="history-table">
        <TableHead>
          <TableRow>
            <TableCell>{t('date')}</TableCell>
            <TableCell>{t('type')}</TableCell>
            <TableCell>{t('txHash')}</TableCell>
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
                  {t('bridge')}
                </Typography>
              </TableCell>
              <TableCell>
                <Box
                  display="flex"
                  gap={1}
                  alignItems="center"
                  justifyContent="space-between"
                >
                  <Typography
                    variant="body2"
                    component="span"
                    sx={{ color: 'white' }}
                  >
                    {shortenString(row.tx_hash, 15)}
                  </Typography>
                  <Box display="flex" gap={1}>
                    <Button
                      variant="outlined"
                      size="small"
                      onClick={() => handleOpenInNewTab(row.tx_hash, 'xrpl')}
                    >
                      {t('xrplExplorer')}
                    </Button>
                    <Button
                      variant="outlined"
                      size="small"
                      onClick={() => handleOpenInNewTab(row.tx_hash, 'axelar')}
                    >
                      {t('axelarExplorer')}
                    </Button>
                  </Box>
                </Box>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
