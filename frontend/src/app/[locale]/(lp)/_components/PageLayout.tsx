'use client'

import dynamic from 'next/dynamic'
import { Box } from '@mui/material'

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
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column'
      }}
    >
      <Container
        maxWidth={maxWidth}
        sx={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center'
        }}
      >
        {children}
      </Container>
    </Box>
  )
}
