'use client'

import { useEffect } from 'react'
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
import { useWalletBalance } from '@/hooks/useWalletBalance'

export default function SectionFaucetList() {
  const t = useTranslations('Faucet.table')

  const { walletType, address } = useWallet()

  const { handleTrustline, handleFaucet } = useFaucet()

  const { data: balances } = useWalletBalance({ address })

  console.log('balances', balances)

  if (!walletType || !address) {
    return null
  }

  const isTrustline = (symbol: string, balances: any) => {
    if (!balances) return false
    return balances.some((b: any) => b.symbol === symbol)
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
          <TableRow>
            <TableCell>
              <Typography variant="body1">XCB</Typography>
            </TableCell>
            <TableCell>
              <Typography variant="body1">
                {balances?.find((b) => b.symbol === XCB_CURRENCY)?.balance || 0}
              </Typography>
            </TableCell>
            <TableCell align="right">
              {isTrustline(XCB_CURRENCY, balances) ? (
                <Button
                  variant="contained"
                  color="primary"
                  disableElevation
                  onClick={() => handleFaucet(address)}
                >
                  Faucet
                </Button>
              ) : (
                <Button
                  variant="contained"
                  color="primary"
                  disableElevation
                  onClick={() =>
                    handleTrustline(walletType, {
                      currency: XCB_CURRENCY,
                      issuer: XCB_ISSUER
                    })
                  }
                >
                  Trustline
                </Button>
              )}
              {balances?.map((b) => {
                if (!isTrustline(b.symbol, balances)) {
                  return (
                    <Button
                      variant="contained"
                      color="primary"
                      disableElevation
                      onClick={() =>
                        handleTrustline(walletType, {
                          currency: b.symbol,
                          issuer: b.issuer
                        })
                      }
                    >
                      Faucet
                    </Button>
                  )
                }
                return null
              })}
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  )
}
