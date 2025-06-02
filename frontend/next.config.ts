import type { NextConfig } from 'next'
import createNextIntlPlugin from 'next-intl/plugin'
import { createVanillaExtractPlugin } from '@vanilla-extract/next-plugin'

const nextConfig: NextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: '/',
        destination: '/home',
        permanent: true
      }
    ]
  }
}

const withVanillaExtract = createVanillaExtractPlugin()
const withNextIntl = createNextIntlPlugin()

export default withVanillaExtract(withNextIntl(nextConfig))
