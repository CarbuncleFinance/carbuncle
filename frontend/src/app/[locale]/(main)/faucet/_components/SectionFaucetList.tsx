'use client'

import { useTranslations } from 'next-intl'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Typography from '@mui/material/Typography'
import Paper from '@mui/material/Paper'
import { XCB_CURRENCY, XCB_ISSUER } from '@/constants/app'
import { useFaucet } from '@/app/[locale]/(main)/faucet/_hooks/useFaucet'
import { useWallet } from '@/hooks/useWallet'

// 仮のデータ型定義
type FaucetAsset = {
  id: string
  balance: string
  currency: string
  issuer: string
  value: string
}

export default function SectionFaucetList() {
  const t = useTranslations('Faucet.table')

  // 仮のデータ
  const assets: FaucetAsset[] = [
    {
      id: '1',
      balance: '0.00',
      currency: 'XRP',
      issuer: 'rN72avu22PqxSCRSzP4BRRHUCNodoeCnD5',
      value: '10'
    },
    {
      id: '2',
      balance: '0.00',
      currency: XCB_CURRENCY,
      issuer: XCB_ISSUER,
      value: '10'
    }
  ]

  const { walletType } = useWallet()

  const { handleTrustline } = useFaucet()

  if (!walletType) {
    return null
  }

  return (
    <TableContainer component={Paper} elevation={0}>
      <Table aria-label="faucet-table">
        <TableHead>
          <TableRow>
            <TableCell>
              <Typography variant="subtitle1">{t('asset')}</Typography>
            </TableCell>
            <TableCell>
              <Typography variant="subtitle1">{t('balance')}</Typography>
            </TableCell>
            <TableCell align="right">{''}</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {assets.map((asset) => (
            <TableRow key={asset.id}>
              <TableCell>
                <Typography variant="body1">{asset.currency}</Typography>
              </TableCell>
              <TableCell>
                <Typography variant="body1">{asset.balance}</Typography>
              </TableCell>
              <TableCell align="right">
                <Button
                  variant="contained"
                  color="primary"
                  disableElevation
                  onClick={() =>
                    handleTrustline(walletType, {
                      currency: asset.currency,
                      issuer: asset.issuer,
                      value: asset.value
                    })
                  }
                >
                  {t('faucet')}
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
