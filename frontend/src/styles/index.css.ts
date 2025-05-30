import '@/styles/reset.css'
import { style, keyframes } from '@vanilla-extract/css'

const shine = keyframes({
  '0%': {
    backgroundPosition: '200% center',
  },
  '100%': {
    backgroundPosition: '-200% center',
  },
})

const fadeInUp = keyframes({
  '0%': {
    opacity: 0,
    transform: 'translateY(20px)',
  },
  '100%': {
    opacity: 1,
    transform: 'translateY(0)',
  },
})

export const animatedTitle = style({
  background: 'linear-gradient(90deg, #00e676 0%, #00bfae 40%, #7affbc 70%, #00e676 100%)',
  backgroundSize: '200% auto',
  color: '#fff',
  backgroundClip: 'text',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  animation: `${shine} 3s linear infinite, ${fadeInUp} 0.6s cubic-bezier(.23,1.01,.32,1) 0.1s both`,
  fontWeight: 'bold',
  display: 'inline-block',
  transition: 'transform 0.3s ease',
  ':hover': {
    transform: 'scale(1.05)',
  },
})
