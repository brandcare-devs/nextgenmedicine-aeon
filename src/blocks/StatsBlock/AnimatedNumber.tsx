'use client'

import React, { useEffect, useRef, useState } from 'react'

interface AnimatedNumberProps {
  value: string
}

function parseValue(value: string): { number: number; prefix: string; suffix: string } {
  const match = value.match(/^([^\d]*)(\d+)(.*)$/)
  if (!match) return { number: 0, prefix: '', suffix: value }
  return {
    prefix: match[1],
    number: parseInt(match[2], 10),
    suffix: match[3],
  }
}

export const AnimatedNumber: React.FC<AnimatedNumberProps> = ({ value }) => {
  const ref = useRef<HTMLSpanElement>(null)
  const [displayed, setDisplayed] = useState('0')
  const [hasAnimated, setHasAnimated] = useState(false)
  const { number, prefix, suffix } = parseValue(value)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true)
          animate()
        }
      },
      { threshold: 0.3 },
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [hasAnimated, number])

  function animate() {
    const duration = 1600
    const start = performance.now()

    function tick(now: number) {
      const elapsed = now - start
      const progress = Math.min(elapsed / duration, 1)
      // ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3)
      const current = Math.round(eased * number)
      setDisplayed(String(current))
      if (progress < 1) {
        requestAnimationFrame(tick)
      }
    }

    requestAnimationFrame(tick)
  }

  return (
    <span ref={ref}>
      {prefix}
      {hasAnimated ? displayed : '0'}
      {suffix}
    </span>
  )
}
