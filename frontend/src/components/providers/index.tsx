import SnackbarProvider from '@/components/providers/ui/SnackbarProvider'
import ThemeProvider from '@/components/providers/ui/ThemeProvider'
import QueryClientProvider from '@/components/providers/api/QueryClientProvider'
import WagmiProvider from '@/components/providers/api/WagmiProvider'
import NextIntlClientProvider from '@/components/providers/ui/NextIntlClientProvider'

interface ProviderProps {
  children: React.ReactNode
  locale: string
}

export default function Provider({ children, locale }: ProviderProps) {
  return (
    <NextIntlClientProvider locale={locale}>
      <WagmiProvider>
        <SnackbarProvider>
          <ThemeProvider>
            <QueryClientProvider>{children}</QueryClientProvider>
          </ThemeProvider>
        </SnackbarProvider>
      </WagmiProvider>
    </NextIntlClientProvider>
  )
}
