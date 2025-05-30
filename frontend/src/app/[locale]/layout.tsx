import type { Metadata } from 'next'
import { Noto_Sans } from 'next/font/google'
import { APP_NAME, APP_DESCRIPTION } from '@/constants/app'
import TopBar from '@/components/features/navigation/TopBar'
import { ThemeProvider } from '@mui/material/styles'
import SnackbarProvider from '@/components/providers/SnackbarProvider'
import theme from '@/utils/theme'
// i18n
import { NextIntlClientProvider, hasLocale } from 'next-intl'
import { notFound } from 'next/navigation'
import { routing } from '@/i18n/routing'
// CSS
import '@/styles/index.css'

const notoSans = Noto_Sans({
  variable: '--font-noto-sans',
  subsets: ['latin']
})

export const metadata: Metadata = {
  title: {
    default: APP_NAME,
    template: `%s | ${APP_NAME}`
  },
  description: APP_DESCRIPTION,
  icons: {
    icon: '/favicon.ico'
  }
}

export default async function RootLayout({
  children,
  params
}: Readonly<{
  children: React.ReactNode
  params: Promise<{ locale: string }>
}>) {
  const { locale } = await params
  if (!hasLocale(routing.locales, locale)) {
    notFound()
  }

  return (
    <html lang={locale}>
      <body
        className={`${notoSans.variable} antialiased`}
        suppressHydrationWarning
      >
        <NextIntlClientProvider>
          <SnackbarProvider>
            <ThemeProvider theme={theme}>
              <TopBar />
              {children}
            </ThemeProvider>
          </SnackbarProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
