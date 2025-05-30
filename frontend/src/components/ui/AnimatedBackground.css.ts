import { style, keyframes } from '@vanilla-extract/css'

export const backgroundContainer = style({
  position: 'fixed',
  zIndex: 0
})

const move = keyframes({
  from: { transform: 'translate3d(var(--fromX), var(--fromY), 0)' },
  to: { transform: 'translate3d(var(--toX),   var(--toY),   0)' }
})

const scale = keyframes({
  '0%': { transform: 'scale(1)' },
  '50%': { transform: 'scale(var(--scaleMax))' },
  '100%': { transform: 'scale(1)' }
})

export const circleContainer = style({
  position: 'absolute',
  animation: ` ${move} var(--moveDur) linear var(--moveDelay) infinite`
})

export const circle = style({
  width: '100%',
  height: '100%',
  borderRadius: '50%',
  backgroundImage: `radial-gradient(
    hsl(180 100% 80%),
    hsl(180 100% 80%) 10%,
    hsla(180 100% 80% / 0) 56%
  )`,
  animation: ` ${scale} var(--scaleDur) ease-in-out var(--scaleDelay) infinite`
})
