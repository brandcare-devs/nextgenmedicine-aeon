'use client'

import React, { useEffect, useState } from 'react'

interface CountdownProps {
  targetDate: string
}

interface TimeLeft {
  days: number
  hours: number
  minutes: number
  seconds: number
}

function calcTimeLeft(target: string): TimeLeft {
  const diff = new Date(target).getTime() - Date.now()
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 }
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  }
}

const labels = ['Days', 'Hours', 'Minutes', 'Seconds'] as const

export const Countdown: React.FC<CountdownProps> = ({ targetDate }) => {
  const [timeLeft, setTimeLeft] = useState<TimeLeft | null>(null)

  useEffect(() => {
    setTimeLeft(calcTimeLeft(targetDate))
    const timer = setInterval(() => {
      setTimeLeft(calcTimeLeft(targetDate))
    }, 1000)
    return () => clearInterval(timer)
  }, [targetDate])

  const values = timeLeft
    ? [timeLeft.days, timeLeft.hours, timeLeft.minutes, timeLeft.seconds]
    : [0, 0, 0, 0]

  return (
    <div className="flex items-center gap-6">
      {labels.map((label, i) => (
        <div key={label} className="flex flex-col items-center gap-3">
          <span
            className="text-[2.75rem] font-[200] leading-none tracking-[-0.04em] text-[#BC8D6C] tabular-nums"
            suppressHydrationWarning
          >
            {String(values[i]).padStart(2, '0')}
          </span>
          <span className="text-[0.875rem] font-medium leading-[1.2] text-[#363332]">
            {label}
          </span>
        </div>
      ))}
    </div>
  )
}
