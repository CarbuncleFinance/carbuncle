import type { NextConfig } from 'next'
import createNextIntlPlugin from 'next-intl/plugin'
import { createVanillaExtractPlugin } from '@vanilla-extract/next-plugin'

const nextConfig: NextConfig = {
  reactStrictMode: true
}

const withVanillaExtract = createVanillaExtractPlugin()
const withNextIntl = createNextIntlPlugin()

export default withVanillaExtract(withNextIntl(nextConfig))
