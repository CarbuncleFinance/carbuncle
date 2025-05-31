import { NextIntlClientProvider as NextIntlClientProviderBase } from 'next-intl'

export default function NextIntlClientProvider({
  children,
  locale
}: { children: React.ReactNode; locale: string }) {
  return (
    <NextIntlClientProviderBase locale={locale}>
      {children}
    </NextIntlClientProviderBase>
  )
}
