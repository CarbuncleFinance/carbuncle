'use client'

import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import AccountBalanceIcon from '@mui/icons-material/AccountBalance'
import AnalyticsIcon from '@mui/icons-material/Analytics'
import PeopleAltIcon from '@mui/icons-material/PeopleAlt'
import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

const CountUp = ({ end, duration = 2 }: { end: number; duration?: number }) => {
  const [count, setCount] = useState(0)

  useEffect(() => {
    let startTime: number
    let animationFrame: number

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime
      const progress = Math.min(
        (currentTime - startTime) / (duration * 1000),
        1
      )
      setCount(Math.floor(progress * end))

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate)
      }
    }

    animationFrame = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(animationFrame)
  }, [end, duration])

  return <>{count.toLocaleString()}</>
}

export default function SectionHero() {
  return (
    <Box pt={10} pb={5} sx={{ textAlign: 'center' }}>
      <Box mb={10}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          <Typography variant="h2" pb={2} sx={{ fontWeight: 'semibold' }}>
          　Lend and Earn with Just Your XRPL Wallet.
          </Typography>
        </motion.div>
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <Button
            variant="contained"
            disableElevation
            size="large"
            sx={{
              transition: 'transform 0.2s',
              '&:hover': {
                transform: 'scale(1.05)'
              }
            }}
          >
            Launch App
          </Button>
        </motion.div>
      </Box>
      <Grid container spacing={2}>
        {[
          {
            icon: <PeopleAltIcon sx={{ color: 'text.secondary' }} />,
            label: 'Ecosystem users',
            value: 100000
          },
          {
            icon: <AccountBalanceIcon sx={{ color: 'text.secondary' }} />,
            label: 'Protocol TVL',
            value: 100000
          },
          {
            icon: <AnalyticsIcon sx={{ color: 'text.secondary' }} />,
            label: 'Bridge volume',
            value: 100000
          }
        ].map((item, index) => (
          <Grid size={4} key={index}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 + index * 0.2 }}
            >
              <Card variant="outlined">
                <CardContent>
                  <Box
                    mb={1}
                    sx={{
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      gap: 1
                    }}
                  >
                    {item.icon}
                    <Typography variant="body1" color="text.secondary">
                      {item.label}
                    </Typography>
                  </Box>
                  <Typography
                    variant="h2"
                    sx={{ textAlign: 'center', fontWeight: 'semibold' }}
                  >
                    {item.label.includes('TVL') || item.label.includes('volume')
                      ? '$ '
                      : ''}
                    <CountUp end={item.value} />
                  </Typography>
                </CardContent>
              </Card>
            </motion.div>
          </Grid>
        ))}
      </Grid>
    </Box>
  )
}
