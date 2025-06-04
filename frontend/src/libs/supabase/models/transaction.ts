import { BaseModel } from '@/libs/supabase/models/base'
import { SupabaseClient } from '@supabase/supabase-js'
import { Database } from '@/types/database'

export class TransactionModel extends BaseModel {
  private readonly tableName = 'transactions'
  private readonly transactions

  constructor(client: SupabaseClient<Database>) {
    super(client)
    this.transactions = this.client.from(this.tableName)
  }

  async create({ walletId, hash }: { walletId: string, hash: string }): Promise<Database['public']['Tables']['transactions']['Row'] | null> {
    try {
      console.log('create', walletId, hash)
      const { data, error } = await this.transactions.insert({ wallet_id: walletId, tx_hash: hash }).select().maybeSingle()
      if (error) {
        throw error
      }

      return data
    } catch (error) {
      console.error(error)
      throw error
    }
  }
}
