'use client'

import dynamic from 'next/dynamic'
import { useRouter } from 'next/navigation'
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
  const router = useRouter()

  const handleGoTo = (path: string) => {
    router.push(path)
  }

  return (
    <AppBar position="fixed" elevation={0} sx={{ backgroundColor: '#000000' }}>
      <Toolbar>
        <Typography
          variant="h6"
          sx={{ mr: 2, cursor: 'pointer' }}
          onClick={() => handleGoTo('/')}
        >
          {APP_NAME}
        </Typography>
        <Box sx={{ flexGrow: 1, display: 'flex', gap: 1 }}>
          <Button
            variant="text"
            color="inherit"
            sx={{ display: 'block' }}
            onClick={() => handleGoTo('/dev')}
          >
            Dev
          </Button>
        </Box>
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Button variant="outlined" color="inherit">
            Connect
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  )
}
