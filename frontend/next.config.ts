import type { NextConfig } from 'next'
import createNextIntlPlugin from 'next-intl/plugin'
import { createVanillaExtractPlugin } from '@vanilla-extract/next-plugin'

const nextConfig: NextConfig = {
  reactStrictMode: true,
  webpack: (config) => {
    config.ignoreWarnings = [{ message: /Critical dependency/ }]
    return config
  }
}

const withVanillaExtract = createVanillaExtractPlugin()
const withNextIntl = createNextIntlPlugin()

export default withVanillaExtract(withNextIntl(nextConfig))
