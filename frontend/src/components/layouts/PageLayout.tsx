'use client'

import dynamic from 'next/dynamic'

const Container = dynamic(
  () =>
    import('@mui/material/Container').then((mod) => mod.default) as Promise<
      typeof import('@mui/material/Container')
    >,
  {
    ssr: false
  }
)

interface PageLayoutProps {
  children: React.ReactNode
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl'
}

export default function PageLayout({
  children,
  maxWidth = 'sm'
}: PageLayoutProps) {
  return (
    <Container maxWidth={maxWidth} sx={{ pt: 10 }}>
      {children}
    </Container>
  )
}
