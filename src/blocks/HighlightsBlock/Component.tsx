'use client'

import React, { useEffect, useRef, useState } from 'react'
import Image from '@/components/NextImage'

import type { HighlightsBlockType, Media } from '@/payload-types'

import { CMSLink } from '@/components/Link'
import { renderText } from '@/utilities/renderText'

type Props = HighlightsBlockType & {
  className?: string
}

export const HighlightsBlockComponent: React.FC<Props> = ({
  heading,
  cards,
  tagline,
  enableLink,
  link,
}) => {
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

  if (!cards || cards.length === 0) return null

  return (
    <section ref={sectionRef} className="container pt-12 md:pt-16 pb-4 md:pb-6">
      {/* Heading */}
      {heading && (
        <h2
          className={`
            text-center text-[#32312E] font-light text-2xl md:text-3xl
            mb-10 md:mb-14
            transition-all duration-300
            ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}
          `}
        >
          {renderText(heading)}
        </h2>
      )}

      {/* Cards — horizontal scroll on mobile, grid on desktop */}
      <div className="relative -mx-4 px-4 md:mx-0 md:px-0">
        <div
          className="
            flex items-stretch gap-4 md:gap-5
            overflow-x-auto snap-x snap-mandatory scrollbar-hide
            pb-4 md:pb-0
            md:grid md:grid-cols-4 md:overflow-visible
          "
        >
          {cards.map((card, index) => {
            const iconObj =
              typeof card.icon === 'object' && card.icon !== null
                ? (card.icon as Media)
                : null

            return (
              <div
                key={card.id || index}
                className={`
                  snap-start shrink-0
                  w-[75vw] min-h-[220px] sm:w-[60vw] md:w-auto md:min-h-0
                  rounded-2xl border border-[#32312E]
                  flex flex-col items-center text-center
                  p-4 md:p-5
                  transition-all duration-300 ease-out
                  ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}
                `}
                style={{
                  transitionDelay: isVisible ? `${50 + index * 50}ms` : '0ms',
                }}
              >
                {/* Icon */}
                {iconObj && (
                  <div className="w-10 h-10 md:w-12 md:h-12 mb-3 flex items-center justify-center">
                    <Image
                      src={iconObj.url || ''}
                      alt={iconObj.alt || ''}
                      width={56}
                      height={56}
                      className="w-full h-full object-contain"
                      style={{ width: '100%', height: '100%' }}
                    />
                  </div>
                )}

                {/* Title */}
                {card.title && (
                  <h3 className="text-[#32312E] text-base md:text-base font-medium mb-2">
                    {renderText(card.title)}
                  </h3>
                )}

                {/* Description */}
                {card.description && (
                  <p className="text-[#5a5751] text-sm md:text-sm leading-relaxed font-normal">
                    {renderText(card.description)}
                  </p>
                )}
              </div>
            )
          })}
        </div>
      </div>

      {/* Tagline */}
      {tagline && (
        <p
          className={`
            text-center text-[#32312E] text-base md:text-lg font-normal
            mt-10 md:mt-14 max-w-2xl mx-auto leading-relaxed
            transition-all duration-300
            ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}
          `}
          style={{ transitionDelay: isVisible ? '250ms' : '0ms' }}
        >
          {renderText(tagline)}
        </p>
      )}

      {/* CTA Button */}
      {enableLink && link && (
        <div
          className={`
            flex justify-center mt-6 md:mt-8
            transition-all duration-300
            ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}
          `}
          style={{ transitionDelay: isVisible ? '300ms' : '0ms' }}
        >
          <CMSLink
            {...link}
            className="inline-flex items-center justify-center px-8 py-3 rounded-full bg-[linear-gradient(270deg,#32312E_0%,#745D4D_20.52%,#BC8D6C_100%)] text-white text-sm font-medium hover:opacity-90 transition-opacity duration-200"
            appearance="inline"
          />
        </div>
      )}
    </section>
  )
}
