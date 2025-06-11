'use client'

import { createTheme } from '@mui/material/styles'

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#2E220E'
    }
  },
  typography: {
    fontFamily: 'var(--font-noto-sans)'
  }
})

export default theme
