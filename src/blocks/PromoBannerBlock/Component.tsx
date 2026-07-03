'use client'

import React, { useEffect, useRef, useState } from 'react'
import Image from '@/components/NextImage'
import type { PromoBannerBlock as PromoBannerBlockProps, Media } from '@/payload-types'
import { CMSLink } from '@/components/Link'

type Props = PromoBannerBlockProps & {
  className?: string
}

export const PromoBannerBlockComponent: React.FC<Props> = ({
  logo,
  dateText,
  venueImage,
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

  const logoImage = typeof logo === 'object' ? (logo as Media) : null
  const venueImg = typeof venueImage === 'object' ? (venueImage as Media) : null

  return (
    <div
      ref={sectionRef}
      className={`
        container
        transition-all duration-300
        ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}
      `}
    >
      <div
        className="relative overflow-hidden w-full"
        style={{ borderRadius: '30px', minHeight: '280px' }}
      >
        {/* Background video */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
          src="/promo-banner-bg.mp4"
        />

        {/* Overlay */}
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(0deg, rgba(161, 144, 133, 0.75), rgba(161, 144, 133, 0.75))',
            mixBlendMode: 'normal',
          }}
        />

        {/* Content */}
        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between h-full px-6 py-8 md:px-12 gap-6" style={{ minHeight: '280px' }}>
          {/* Left — logo */}
          {logoImage?.url && (
            <div className="shrink min-w-0">
              <Image
                src={logoImage.url}
                alt={logoImage.alt || ''}
                width={500}
                height={193}
                className="w-auto h-[60px] md:h-[90px] lg:h-[110px] object-contain"
                style={{ width: 'auto' }}
              />
            </div>
          )}

          {/* Right — date, venue, CTA */}
          <div className="flex flex-col items-center justify-center gap-3 shrink-0">
            {dateText && (
              <span
                className="text-white text-center"
                style={{
                  fontWeight: 300,
                  fontSize: 'clamp(14px, 1.8vw, 24px)',
                  lineHeight: '110%',
                  letterSpacing: '-0.04em',
                }}
              >
                {dateText}
              </span>
            )}

            {venueImg?.url && (
              <Image
                src={venueImg.url}
                alt={venueImg.alt || ''}
                width={211}
                height={81}
                className="w-auto h-[40px] md:h-[50px] lg:h-[60px] object-contain"
                style={{ width: 'auto' }}
              />
            )}

            {ctaLink && (
              <div
                className="rounded-full hover:opacity-90 transition-opacity"
                style={{
                  background: 'linear-gradient(270deg, #32312E 0%, #745D4D 20.52%, #BC8D6C 100%)',
                }}
              >
                <CMSLink
                  {...ctaLink}
                  appearance="inline"
                  className="inline-flex items-center justify-center text-white px-5 py-2.5 md:px-6 md:py-3 text-xs md:text-sm lg:text-base font-medium"
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
