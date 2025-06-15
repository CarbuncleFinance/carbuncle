'use client'

import Grid from '@mui/material/Grid'
import GridDisconnectCard from '@/app/[locale]/(main)/home/_components/GridDisconnectCard'
import GridSupplyCard from '@/app/[locale]/(main)/home/_components/GridSupplyCard'
import GridBorrowCard from '@/app/[locale]/(main)/home/_components/GridBorrowCard'
import GridAssetsToSupplyCard from '@/app/[locale]/(main)/home/_components/GridAssetsToSupplyCard'
import GridAssetsToBorrowCard from '@/app/[locale]/(main)/home/_components/GridAssetsToBorrowCard'
import { useLending } from '@/hooks/useLending'
import { useWallet } from '@/hooks/useWallet'

import { useEffect } from 'react'
import { AxelarGMPRecoveryAPI, Environment } from '@axelar-network/axelarjs-sdk'

const sdk = new AxelarGMPRecoveryAPI({
  environment: Environment.TESTNET
})

export default function MainContent() {
  const { address } = useWallet()
  const { walletBalances, supplyBalances } = useLending(address)

  useEffect(() => {
    ;(async () => {
      const txHash =
        'F87C985B1D01377DE261E67C3BE9B58BF63F29E62DAC0AACD68E1748EEA8CBFA'
      const txStatus = await sdk.queryTransactionStatus(txHash)
      console.log('txStatus: ', txStatus)
    })()
  }, [])

  return (
    <Grid container spacing={2}>
      <GridDisconnectCard size={6} />
      <GridSupplyCard size={6} supplyBalances={supplyBalances} />
      <GridBorrowCard size={6} />
      <GridAssetsToSupplyCard
        size={6}
        address={address}
        walletBalances={walletBalances}
      />
      <GridAssetsToBorrowCard size={6} />
    </Grid>
  )
}
