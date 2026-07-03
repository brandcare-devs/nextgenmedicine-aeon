'use client'

import React, { useEffect, useRef, useState } from 'react'
import Image from '@/components/NextImage'
import type { PartnersBlock as PartnersBlockProps, Partner, Media } from '@/payload-types'
import { CMSLink } from '@/components/Link'
import { renderText } from '@/utilities/renderText'

type Props = PartnersBlockProps & {
  className?: string
  partners: Partner[]
}

const CTA_CLASS =
  'inline-flex items-center justify-center px-8 py-3 rounded-full border-2 border-[#32312E] text-[#32312E] text-sm font-medium hover:opacity-70 transition-opacity'

export const PartnersBlockComponent: React.FC<Props> = ({
  title,
  description,
  partners,
  enableCTA,
  link: ctaLink,
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

  return (
    <section ref={sectionRef}>
      {/* Header */}
      <div
        className={`
          container flex flex-col items-center text-center md:text-left md:items-start md:flex-row md:justify-between gap-4 md:gap-8 mb-8 md:mb-12
          transition-all duration-300
          ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}
        `}
      >
        <h2
          className="shrink-0"
          style={{
            color: '#BC8D6C',
            fontWeight: 500,
            fontSize: '40px',
            lineHeight: '105%',
            letterSpacing: '-0.04em',
          }}
        >
          {title ? renderText(title) : null}
        </h2>
        {description && (
          <p className="text-sm md:text-base text-[#5a5751] max-w-xl leading-relaxed" style={{ fontWeight: 400 }}>
            {renderText(description)}
          </p>
        )}
      </div>

      {/* Desktop grid */}
      <div
        className={`
          container hidden md:grid grid-cols-3 gap-4
          transition-all duration-300 delay-200
          ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}
        `}
      >
        {partners.map((partner, index) => {
          const logo = typeof partner.logo === 'object' ? (partner.logo as Media) : null
          const image = logo?.url ? (
            <Image
              src={logo.url}
              alt={partner.name || ''}
              width={280}
              height={140}
              className="max-h-[140px] w-auto object-contain"
              style={{ width: 'auto' }}
            />
          ) : null
          return (
            <div
              key={partner.id || index}
              className="rounded-2xl flex items-center justify-center py-6 px-10"
              style={{
                backgroundColor: '#F9F2EFE5',
                minHeight: '200px',
                transitionDelay: isVisible ? `${50 + index * 40}ms` : '0ms',
              }}
            >
              {image &&
                (partner.website ? (
                  <a
                    href={partner.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={partner.name || undefined}
                    className="flex items-center justify-center transition-opacity hover:opacity-70"
                  >
                    {image}
                  </a>
                ) : (
                  image
                ))}
            </div>
          )
        })}

        {/* CTA card */}
        {enableCTA && ctaLink && (
          <div
            className="rounded-2xl flex items-center justify-center p-8 border border-[#c5b9ae]"
            style={{ minHeight: '180px' }}
          >
            <CMSLink {...ctaLink} appearance="inline" className={CTA_CLASS} />
          </div>
        )}
      </div>

      {/* Mobile carousel */}
      <div
        className={`
          md:hidden
          transition-all duration-300 delay-200
          ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}
        `}
      >
        <div
          className="flex gap-4 overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-4 pl-4"
          style={{ scrollPaddingLeft: '16px' }}
        >
          {partners.map((partner, index) => {
            const logo = typeof partner.logo === 'object' ? (partner.logo as Media) : null
            const image = logo?.url ? (
              <Image
                src={logo.url}
                alt={partner.name || ''}
                width={240}
                height={120}
                className="max-h-[120px] w-auto object-contain"
                style={{ width: 'auto' }}
              />
            ) : null
            return (
              <div
                key={partner.id || index}
                className="snap-start shrink-0 w-[70vw] rounded-2xl flex items-center justify-center py-6 px-10"
                style={{ backgroundColor: '#F9F2EFE5', minHeight: '180px' }}
              >
                {image &&
                  (partner.website ? (
                    <a
                      href={partner.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={partner.name || undefined}
                      className="flex items-center justify-center transition-opacity hover:opacity-70"
                    >
                      {image}
                    </a>
                  ) : (
                    image
                  ))}
              </div>
            )
          })}
        </div>

        {/* Mobile CTA below carousel */}
        {enableCTA && ctaLink && (
          <div className="flex justify-center mt-4 px-4">
            <CMSLink {...ctaLink} appearance="inline" className={CTA_CLASS} />
          </div>
        )}
      </div>

    </section>
  )
}
