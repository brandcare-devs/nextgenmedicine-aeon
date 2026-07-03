'use client'

import React, { useEffect, useRef, useState } from 'react'
import type { CtaBannerBlock as CtaBannerBlockProps, Media } from '@/payload-types'
import { CMSLink } from '@/components/Link'
import { renderText } from '@/utilities/renderText'

type Props = CtaBannerBlockProps & {
  className?: string
}

export const CtaBannerBlockComponent: React.FC<Props> = ({
  backgroundImage,
  title,
  subtitle,
  ctaLink,
}) => {
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
      { threshold: 0.15 },
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  const bgImage = typeof backgroundImage === 'object' ? (backgroundImage as Media) : null

  return (
    <div
      ref={sectionRef}
      className={`container transition-all duration-300 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
    >
      <div
        className="relative overflow-hidden w-full border border-black"
        style={{ borderRadius: '30px', minHeight: '280px' }}
      >
        {bgImage?.url && (
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url("${bgImage.url}")` }}
          />
        )}

        <div
          className="absolute inset-0"
          style={{ background: 'rgba(245, 240, 235, 0.7)' }}
        />

        <div
          className="relative z-10 flex flex-col items-center justify-center text-center px-6 py-12 md:px-12 md:py-16 gap-4"
          style={{ minHeight: '280px' }}
        >
          {title && (
            <h2
              className="text-[#BC8D6C]"
              style={{
                fontWeight: 500,
                fontSize: 'clamp(32px, 5vw, 64px)',
                lineHeight: '110%',
                letterSpacing: '-0.04em',
              }}
            >
              {renderText(title)}
            </h2>
          )}

          {subtitle && (
            <p
              className="text-[#32312E]"
              style={{
                fontWeight: 400,
                fontSize: 'clamp(14px, 1.6vw, 18px)',
                lineHeight: '140%',
              }}
            >
              {renderText(subtitle)}
            </p>
          )}

          {ctaLink && (
            <div
              className="rounded-full hover:opacity-90 transition-opacity mt-2"
              style={{
                background:
                  'linear-gradient(270deg, #32312E 0%, #745D4D 20.52%, #BC8D6C 100%)',
              }}
            >
              <CMSLink
                {...ctaLink}
                appearance="inline"
                className="inline-flex items-center justify-center text-white px-7 py-2.5 text-sm font-medium tracking-wide whitespace-nowrap"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
