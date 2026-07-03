'use client'

import React, { useEffect, useRef, useState } from 'react'
import Image from '@/components/NextImage'
import type { AboutBlockType, Media } from '@/payload-types'
import { renderText } from '@/utilities/renderText'

type Props = AboutBlockType & {
  className?: string
}

export const AboutBlockComponent: React.FC<Props> = ({ sections }) => {
  const sectionRef = useRef<HTMLDivElement>(null)
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
      { threshold: 0.05 },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  if (!sections || sections.length === 0) return null

  return (
    <div
      ref={sectionRef}
      className={`
        container
        transition-all duration-300
        ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}
      `}
    >
      <div className="flex flex-col gap-16 lg:gap-20">
        {sections.map((section, i) => {
          const image = typeof section.image === 'object' ? (section.image as Media) : null
          const imageRight = section.imagePosition !== 'left'
          const paragraphs = (section.body || '').split(/\n\s*\n/).filter(Boolean)

          return (
            <div
              key={i}
              className={`flex flex-col lg:flex-row gap-8 lg:gap-14 items-start ${
                imageRight ? '' : 'lg:flex-row-reverse'
              }`}
            >
              {/* Text side */}
              <div className="flex-1 lg:max-w-[45%]">
                <h2 className="text-[#32312E] font-semibold text-2xl md:text-3xl leading-tight mb-4">
                  {section.heading ? renderText(section.heading) : null}
                </h2>
                <div className="space-y-4">
                  {paragraphs.map((p, j) => (
                    <p key={j} className="text-[#32312E]/80 text-sm md:text-[0.95rem] leading-relaxed">
                      {renderText(p.trim())}
                    </p>
                  ))}
                </div>
              </div>

              {/* Image side */}
              {image && (
                <div className="flex-1 lg:max-w-[50%] w-full">
                  <div className="relative overflow-hidden rounded-2xl aspect-[4/3]">
                    <Image
                      src={image.url!}
                      alt={image.alt || ''}
                      fill
                      className="object-cover"
                      sizes="(max-width: 1024px) 100vw, 50vw"
                    />
                  </div>
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
