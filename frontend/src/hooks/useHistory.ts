import { useCallback, useState } from 'react'
import { AppErrorCode } from '@/types/enums'
import { useErrorHandler } from '@/hooks/useErrorHandler'
import { useDatabase } from '@/hooks/useDatabase'
import { Database } from '@/types/database'
import { formatDate } from '@/utils/data'

export function useHistory() {
  const db = useDatabase()
  const { createError } = useErrorHandler()
  const [data, setData] = useState<
    Database['public']['Tables']['transactions']['Row'][]
  >([])

  const handleGetData = useCallback(
    async (address: string): Promise<void> => {
      try {
        const wallet = await db.wallet.getOrCreate({ address })
        if (!wallet) {
          throw createError(AppErrorCode.DATABASE_ERROR)
        }

        const history = await db.transactions.getByWalletId(wallet.id)
        if (!history) {
          throw createError(AppErrorCode.DATABASE_ERROR)
        }

        setData(
          history.map((tx) => ({
            ...tx,
            created_at: tx.created_at ? formatDate(tx.created_at) : ''
          }))
        )
      } catch (error) {
        throw error
      }
    },
    [db]
  )

  return {
    handleGetData,
    data
  }
}
