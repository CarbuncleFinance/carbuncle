'use client'

import {
  SnackbarProvider as NotistackSnackbarProvider,
  closeSnackbar
} from 'notistack'
import IconButton from '@mui/material/IconButton'
import CloseIcon from '@mui/icons-material/Close'

export default function SnackbarProvider({
  children
}: { children: React.ReactNode }) {
  return (
    <NotistackSnackbarProvider
      maxSnack={3}
      autoHideDuration={5000}
      action={(key) => (
        <IconButton onClick={() => closeSnackbar(key)}>
          <CloseIcon sx={{ color: 'white' }} />
        </IconButton>
      )}
    >
      {children}
    </NotistackSnackbarProvider>
  )
}
