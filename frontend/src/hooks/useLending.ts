import { useCallback, useEffect, useRef, useState } from 'react'
import { ethers } from 'ethers'
import { XrplClient } from '@/libs/xrplClient'
import { LIST_ASSETS } from '@/constants/app'
import { Token, TokenAsset, TokenBalance } from '@/types'
import { xrplAddressToEvmAddress } from '@/utils/address'
import { LENDING_POOL_CONTRACT } from '@/constants/app'
import LendingPoolAbi from '@/abis/LendingPool.json'

export const useLending = (address: string) => {
  const xrplClient = useRef<XrplClient>(new XrplClient())

  const [walletBalances, setWalletBalances] = useState<any[]>([])
  const [supplyBalances, setSupplyBalances] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(false)

  // ===============================
  // Utils
  // ===============================

  const getTokenBalance = (
    balances: TokenBalance[],
    symbol: string
  ): number => {
    return balances.find((balance) => balance.symbol === symbol)?.balance ?? 0
  }

  const mapTokens = (
    assets: TokenAsset[],
    balances: TokenBalance[]
  ): Token[] => {
    return assets.map((asset) => ({
      ...asset,
      apy: 0,
      collateral: true,
      healthFactor: 0,
      balance: getTokenBalance(balances, asset.symbol)
    }))
  }

  /**
   * Validate address
   * @description Validate address is not empty
   * @returns void
   */
  const validateAddress = useCallback(() => {
    if (!address) {
      throw new Error('Address is required')
    }
  }, [address])

  // ===============================
  // Handle data
  // ===============================

  // ===============================
  // Fetch data
  // ===============================

  /**
   * Fetch wallet balance
   * @description Fetch wallet balance
   * @returns void
   */
  const fetchWalletBalance = useCallback(async () => {
    setIsLoading(true)
    try {
      validateAddress()

      const balances = await xrplClient.current.getAllBalances(address)

      const tokens = mapTokens(LIST_ASSETS, balances)

      setWalletBalances(tokens)
    } catch (error) {
      console.error('Error fetching wallet balance: ', error)
      throw error
    } finally {
      setIsLoading(false)
    }
  }, [address])

  const fetchSupplyBalance = useCallback(async () => {
    setIsLoading(true)
    try {
      validateAddress()
      const evmAddress = xrplAddressToEvmAddress(address as `r${string}`)

      const provider = new ethers.JsonRpcProvider(
        'https://rpc.testnet.xrplevm.org'
      )

      const contract = new ethers.Contract(
        LENDING_POOL_CONTRACT.address,
        LendingPoolAbi,
        provider
      )

      const balance = await contract.userDeposits(evmAddress)
      const divisor = 10n ** 18n
      const balanceInXrp = balance / divisor

      const balances: TokenBalance[] = [
        {
          symbol: 'XRP',
          balance: Number(balanceInXrp),
          issuer: ''
        }
      ]

      const tokens = mapTokens(LIST_ASSETS, balances)

      setSupplyBalances(tokens)
    } catch (error) {
      console.error('Error fetching supply balance: ', error)
      throw error
    } finally {
      setIsLoading(false)
    }
  }, [address])

  // ===============================
  // Handle effect
  // ===============================

  useEffect(() => {
    if (!address) return;
    fetchWalletBalance()
  }, [fetchWalletBalance, address])

  useEffect(() => {
    if (!address) return;
    fetchSupplyBalance()
  }, [fetchSupplyBalance, address])

  return {
    isLoading,
    walletBalances,
    supplyBalances,
    fetchWalletBalance,
    fetchSupplyBalance
  }
}
