import type { SupabaseClient } from '@supabase/supabase-js'
import type { Database } from '@/types/database'

export class BaseModel {
  protected client: SupabaseClient<Database>

  constructor(client: SupabaseClient<Database>) {
    this.client = client
  }
}
