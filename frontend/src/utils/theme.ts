'use client'

import { createTheme } from '@mui/material/styles'

const theme = createTheme({
  palette: {
    mode: 'light'
    /*
    primary: {
      main: '#008080'
    }
    */
  },
  typography: {
    fontFamily: 'var(--font-noto-sans)'
  }
})

export default theme
