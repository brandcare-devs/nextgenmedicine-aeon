'use client'

import React, { useEffect, useRef, useState } from 'react'
import type { StatsBlockType } from '@/payload-types'
import { renderText } from '@/utilities/renderText'
import { AnimatedNumber } from './AnimatedNumber'

type Props = StatsBlockType & {
  className?: string
}

export const StatsBlockComponent: React.FC<Props> = ({ heading, stats }) => {
  const sectionRef = useRef<HTMLElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.15 },
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="container pt-4 pb-12 md:pt-6 md:pb-16 md:px-12 lg:px-20"
    >
      {heading && (
        <h2
          className={`text-center text-[#32312E] font-[300] text-xl md:text-xl lg:text-2xl mb-10 md:mb-14 transition-all duration-300 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
        >
          {renderText(heading)}
        </h2>
      )}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-y-10 gap-x-4">
        {stats?.map((stat, index) => (
          <div
            key={index}
            className={`flex flex-col items-center text-center transition-all duration-300 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
            style={{
              transitionDelay: isVisible ? `${50 + index * 50}ms` : '0ms',
            }}
          >
            <span className="text-[#BC8D6C] font-medium text-5xl md:text-6xl lg:text-7xl tabular-nums leading-none tracking-tight">
              <AnimatedNumber value={stat.value} />
            </span>
            <span className="text-[#32312E] font-normal text-xs md:text-sm uppercase tracking-wider mt-3 whitespace-pre-line">
              {renderText(stat.label)}
            </span>
          </div>
        ))}
      </div>
    </section>
  )
}
