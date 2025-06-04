import { BaseModel } from '@/libs/supabase/models/base'
import { SupabaseClient } from '@supabase/supabase-js'
import { Database } from '@/types/database'

export class WalletModel extends BaseModel {
  private readonly tableName = 'wallets'
  private readonly wallets

  constructor(client: SupabaseClient<Database>) {
    super(client)
    this.wallets = this.client.from(this.tableName)
  }

  async getByAddress(
    address: string
  ): Promise<Database['public']['Tables']['wallets']['Row'] | null> {
    const { data, error } = await this.wallets
      .select('*')
      .eq('address', address)
      .single()
    if (error) {
      throw error
    }
    return data
  }

  async isExistByAddress(address: string): Promise<boolean> {
    try {
      const { data, error } = await this.wallets
        .select('*')
        .eq('address', address)
        .maybeSingle()
      if (error) {
        throw error
      }
      return data !== null
    } catch (error) {
      throw error
    }
  }

  async getOrCreate({
    address
  }: { address: string }): Promise<
    Database['public']['Tables']['wallets']['Row'] | null
  > {
    try {
      const isExist = await this.isExistByAddress(address)

      if (isExist) {
        return await this.getByAddress(address)
      }

      const { data, error } = await this.wallets
        .insert({ address })
        .select()
        .maybeSingle()
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
