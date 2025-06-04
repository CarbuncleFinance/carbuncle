import { useMemo } from 'react'
import { SupabaseClient } from '@/libs/supabase'

let databaseInstance: SupabaseClient | null = null

export function useDatabase() {
  return useMemo(() => {
    if (!databaseInstance) {
      databaseInstance = new SupabaseClient()
    }
    return databaseInstance
  }, [])
}
