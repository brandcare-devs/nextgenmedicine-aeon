'use client'

import React, { useEffect, useRef, useState } from 'react'
import Image from '@/components/NextImage'
import type { PressBlock as PressBlockProps, PressArticle, Media } from '@/payload-types'
import { CMSLink } from '@/components/Link'
import { renderText } from '@/utilities/renderText'

type Props = PressBlockProps & {
  className?: string
  articles: PressArticle[]
}

const CTA_CLASS =
  'inline-flex items-center justify-center px-8 py-3 rounded-full border-2 border-[#32312E] text-[#32312E] text-sm font-medium hover:opacity-70 transition-opacity'

function formatDate(dateStr: string): string {
  const d = new Date(dateStr)
  const dd = String(d.getDate()).padStart(2, '0')
  const mm = String(d.getMonth() + 1).padStart(2, '0')
  const yyyy = d.getFullYear()
  return `${dd}/${mm}/${yyyy}`
}

export const PressBlockComponent: React.FC<Props> = ({
  title,
  description,
  enableTopLink,
  topLink,
  bottomCards,
  articles,
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
          container flex flex-col items-center text-center lg:text-left lg:items-start lg:flex-row lg:justify-between gap-4 lg:gap-8 mb-8 lg:mb-12
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
          {renderText(title)}
        </h2>
        {description && (
          <p className="text-sm md:text-base text-[#5a5751] max-w-xl leading-relaxed" style={{ fontWeight: 400 }}>
            {renderText(description)}
          </p>
        )}
        {/* Mobile top CTA */}
        {enableTopLink && topLink && (
          <div className="lg:hidden">
            <CMSLink {...topLink} appearance="inline" className={CTA_CLASS} />
          </div>
        )}
        {/* Desktop top CTA */}
        {enableTopLink && topLink && (
          <div className="hidden lg:block shrink-0">
            <CMSLink {...topLink} appearance="inline" className={CTA_CLASS} />
          </div>
        )}
      </div>

      {/* Desktop press grid */}
      <div
        className={`
          container hidden md:grid grid-cols-3 gap-5
          transition-all duration-300 delay-200
          ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}
        `}
      >
        {articles.slice(0, 6).map((article, index) => (
          <PressCard key={article.id || index} article={article} index={index} isVisible={isVisible} />
        ))}
      </div>

      {/* Mobile press carousel */}
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
          {articles.slice(0, 6).map((article, index) => (
            <div key={article.id || index} className="snap-start shrink-0 w-[70vw]">
              <PressCard article={article} index={index} isVisible={isVisible} />
            </div>
          ))}
        </div>
      </div>

      {/* Bottom cards */}
      {bottomCards && bottomCards.length > 0 && (
        <div
          className={`
            container grid grid-cols-1 md:grid-cols-2 gap-4 mt-8
            transition-all duration-300 delay-300
            ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}
          `}
        >
          {bottomCards.map((card, index) => (
            <div
              key={index}
              className="rounded-2xl p-6 md:p-8 flex flex-col md:flex-row items-center md:justify-between gap-4 text-center md:text-left"
              style={{ backgroundColor: '#F9F2EFE5' }}
            >
              <div>
                <h3
                  style={{
                    color: '#BC8D6C',
                    fontWeight: 500,
                    fontSize: 'clamp(24px, 2.5vw, 32px)',
                    lineHeight: '110%',
                    letterSpacing: '-0.04em',
                  }}
                >
                  {renderText(card.title)}
                </h3>
                {card.description && (
                  <p className="text-sm text-[#5a5751] mt-2" style={{ fontWeight: 400 }}>
                    {renderText(card.description)}
                  </p>
                )}
              </div>
              {card.link && (
                <CMSLink {...card.link} appearance="inline" className={CTA_CLASS + ' shrink-0'} />
              )}
            </div>
          ))}
        </div>
      )}
    </section>
  )
}

/* Press card component */
const PressCard: React.FC<{
  article: PressArticle
  index: number
  isVisible: boolean
}> = ({ article, index, isVisible }) => {
  const thumbnail = typeof article.thumbnail === 'object' ? (article.thumbnail as Media) : null
  const pubLogo = typeof article.publicationLogo === 'object' ? (article.publicationLogo as Media) : null

  return (
    <a
      href={article.externalUrl || '#'}
      target="_blank"
      rel="noopener noreferrer"
      className="block relative overflow-hidden"
      style={{
        borderRadius: '30px',
        aspectRatio: '467 / 555',
        backgroundColor: '#A19085',
      }}
    >
      {/* Thumbnail — top portion only */}
      {thumbnail?.url && (
        <div className="absolute inset-x-0 top-0" style={{ height: '55%' }}>
          <Image
            src={thumbnail.url}
            alt={article.title || ''}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            className="object-cover"
            style={{ borderRadius: '30px 30px 0 0' }}
          />
          {/* Gradient fade from image into brown */}
          <div
            className="absolute inset-x-0 bottom-0 h-24"
            style={{
              background: 'linear-gradient(to bottom, transparent, #A19085)',
            }}
          />
        </div>
      )}

      {/* Publication logo — top right */}
      {pubLogo?.url && (
        <div
          className="absolute top-3 right-3 z-10 flex items-center justify-center px-2.5 py-1.5"
          style={{ backgroundColor: '#FFFFFF', borderRadius: '12px' }}
        >
          <Image
            src={pubLogo.url}
            alt={article.publicationName || ''}
            width={100}
            height={32}
            className="h-[22px] w-auto object-contain"
            style={{ width: 'auto' }}
          />
        </div>
      )}

      {/* Content — bottom */}
      <div className="absolute inset-x-0 bottom-0 z-10 p-5">
        {/* Title */}
        <h3
          className="text-white mb-3"
          style={{
            fontWeight: 500,
            fontSize: 'clamp(14px, 1.5vw, 20px)',
            lineHeight: '120%',
            letterSpacing: '-0.04em',
          }}
        >
          {renderText(article.title)}
        </h3>

        {/* Bottom row: Read more + date */}
        <div className="flex items-center justify-between">
          <span
            className="inline-flex items-center justify-center px-4 py-2 rounded-full text-xs font-medium"
            style={{ border: '2px solid #EDE7E4', color: '#EDE7E4' }}
          >
            Read more
          </span>
          {article.date && (
            <span className="text-white text-xs" style={{ fontWeight: 400 }}>
              {formatDate(article.date)}
            </span>
          )}
        </div>
      </div>
    </a>
  )
}
