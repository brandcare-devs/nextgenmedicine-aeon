'use client'

import React, { useEffect, useRef, useState } from 'react'
import Image from '@/components/NextImage'
import type { EventHighlightsBlockType, Media } from '@/payload-types'
import { CMSLink } from '@/components/Link'
import { renderText } from '@/utilities/renderText'

type Props = EventHighlightsBlockType & {
  className?: string
}

export const EventHighlightsBlockComponent: React.FC<Props> = ({
  heading,
  bulletPoints,
  featuredImage,
  galleryImages,
  enableLink,
  link,
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
      { threshold: 0.1 },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  const featured = typeof featuredImage === 'object' ? (featuredImage as Media) : null
  const gallery = (galleryImages || [])
    .map((item) => {
      const media = typeof item.media === 'object' ? (item.media as Media) : null
      return media?.url ? media : null
    })
    .filter((m): m is Media => m !== null)

  return (
    <div
      ref={sectionRef}
      className={`
        container
        transition-all duration-300
        ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}
      `}
    >
      <div className="rounded-[clamp(12px,2vw,30px)] bg-[#9F8E82] px-6 py-10 md:px-10 md:py-12 lg:px-14 lg:py-14">
        {/* Top section: heading + bullets on the left, featured image on the right */}
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
          <div className="flex-1">
            {heading && (
              <h2 className="text-white font-light text-3xl md:text-4xl lg:text-[2.75rem] leading-tight mb-6 lg:mb-8">
                {renderText(heading)}
              </h2>
            )}
            {bulletPoints && bulletPoints.length > 0 && (
              <ul className="space-y-3">
                {bulletPoints.map((point, i) => (
                  <li key={i} className="flex items-start gap-3 text-white/85 text-sm md:text-[0.95rem] leading-relaxed">
                    <span className="mt-1.5 shrink-0 w-1.5 h-1.5 rounded-full bg-white/70" />
                    {renderText(point.text)}
                  </li>
                ))}
              </ul>
            )}
          </div>

          {featured && (
            <div className="lg:w-[45%] shrink-0">
              <div className="relative overflow-hidden rounded-2xl aspect-[4/3]">
                <Image
                  src={featured.url!}
                  alt={featured.alt || ''}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 45vw"
                />
              </div>
            </div>
          )}
        </div>

        {/* Bottom gallery row */}
        {gallery.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mt-8 lg:mt-10">
            {gallery.map((media, i) => (
              <div
                key={media.id || i}
                className="relative overflow-hidden rounded-2xl aspect-[4/3]"
              >
                <Image
                  src={media.url!}
                  alt={media.alt || ''}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 50vw, 25vw"
                />
              </div>
            ))}
          </div>
        )}

        {/* CTA button */}
        {enableLink && link && (
          <div className="flex justify-center mt-8 lg:mt-10">
            <CMSLink
              {...link}
              appearance="inline"
              className="inline-flex items-center justify-center rounded-full px-8 py-3 text-sm font-medium tracking-wide whitespace-nowrap transition-colors border-2 border-[#32312E] text-[#32312E] hover:opacity-70"
            />
          </div>
        )}
      </div>
    </div>
  )
}
