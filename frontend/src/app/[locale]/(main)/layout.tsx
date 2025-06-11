import type { Metadata } from 'next'
import { Noto_Sans } from 'next/font/google'
import { APP_NAME, APP_DESCRIPTION } from '@/constants/app'
import TopBar from '@/components/layouts/TopBar'
import AppProviders from '@/components/providers'
// i18n
import { hasLocale } from 'next-intl'
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
        <AppProviders locale={locale}>
          <TopBar />
          {children}
        </AppProviders>
      </body>
    </html>
  )
}
