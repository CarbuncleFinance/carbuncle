import { useEffect, useState } from 'react'

type WalletBalanceRequest = {
  address: string
}

export function useWalletBalance({ address }: WalletBalanceRequest) {
  const [balance, setBalance] = useState<number>(0)

  const getBalance = async () => {
    try {
      //
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    getBalance()
  }, [])

  return {}
}
