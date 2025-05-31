'use client'

import {
  QueryClient,
  QueryClientProvider as QueryClientProviderBase
} from '@tanstack/react-query'
import { useState } from 'react'

export default function QueryClientProvider({
  children
}: {
  children: React.ReactNode
}) {
  const [queryClient] = useState(() => new QueryClient())

  return (
    <QueryClientProviderBase client={queryClient}>
      {children}
    </QueryClientProviderBase>
  )
}
