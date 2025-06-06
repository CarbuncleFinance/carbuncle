'use client'

import dynamic from 'next/dynamic'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import { APP_NAME } from '@/constants/app'

const AppBar = dynamic(
  () => import('@mui/material/AppBar').then((mod) => mod.default),
  { ssr: false }
)

export default function TopBar() {
  const handleLaunchApp = () => {
    window.open('/home', '_blank')
  }

  return (
    <AppBar position="fixed" elevation={0} color="transparent">
      <Toolbar>
        <Typography variant="h6" sx={{ mr: 2 }}>
          {APP_NAME}
        </Typography>
        <Box
          sx={{
            display: 'flex',
            gap: 1,
            flexGrow: 1,
            justifyContent: 'end'
          }}
        >
          <Button
            variant="contained"
            disableElevation
            onClick={handleLaunchApp}
          >
            Launch App
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  )
}
