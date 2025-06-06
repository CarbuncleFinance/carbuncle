'use client'

import { Box, Container, Typography, Link } from '@mui/material'

export default function SectionFooter() {
  return (
    <Box
      component="footer"
      sx={{
        py: 3,
        px: 2,
        backgroundColor: (theme) => theme.palette.grey[100],
        position: 'relative',
        width: '100%'
      }}
    >
      <Container maxWidth="lg">
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: 2
          }}
        >
          <Typography variant="body2" color="text.secondary">
            © {new Date().getFullYear()} Carbuncle. All rights reserved.
          </Typography>
          <Box
            sx={{
              display: 'flex',
              gap: 3
            }}
          >
            <Link href="/terms" color="inherit" underline="hover">
              Terms
            </Link>
            <Link href="/privacy" color="inherit" underline="hover">
              Privacy
            </Link>
            <Link href="/contact" color="inherit" underline="hover">
              Contact
            </Link>
          </Box>
        </Box>
      </Container>
    </Box>
  )
}
