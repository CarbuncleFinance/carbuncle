'use client'

import React, { useEffect, useState } from 'react'
import {
  backgroundContainer,
  circle,
  circleContainer
} from '@/components/ui/AnimatedBackground.css'

const PARTICLE_NUM = 200

const random = (min: number, max: number) => Math.random() * (max - min) + min

const AnimatedBackground: React.FC = () => {
  const [particles, setParticles] = useState<React.ReactElement[]>([])

  useEffect(() => {
    const generated = Array.from({ length: PARTICLE_NUM }, (_, i) => {
      const size = random(4, 10)
      const fromX = `${random(0, 100)}vw`
      const fromY = `${random(100, 120)}vh`
      const toX = `${random(0, 100)}vw`
      const toY = `${random(-150, -110)}vh`

      const moveDur = `${random(22000, 40000)}ms`
      const moveDelay = `${-random(0, 40000)}ms`

      const scaleMax = random(1.5, 3).toFixed(2)
      const scaleDur = `${random(1.2, 3.4)}s`
      const scaleDelay = `${random(0, 2)}s`

      return (
        <div
          key={i}
          className={circleContainer}
          style={
            {
              '--fromX': fromX,
              '--fromY': fromY,
              '--toX': toX,
              '--toY': toY,
              '--moveDur': moveDur,
              '--moveDelay': moveDelay,
              width: `${size}px`,
              height: `${size}px`,
              '--scaleMax': scaleMax,
              '--scaleDur': scaleDur,
              '--scaleDelay': scaleDelay
            } as React.CSSProperties
          }
        >
          <div className={circle} />
        </div>
      )
    })
    setParticles(generated)
  }, [])

  return <div className={backgroundContainer}>{particles}</div>
}

export default AnimatedBackground
