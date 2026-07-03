'use client'

import React, { useState, useEffect } from 'react'
import Image from '@/components/NextImage'
import Link from 'next/link'

import type { FullSpeakersBlockType, Speaker, SpeakerCategory, Media } from '@/payload-types'
import { renderText } from '@/utilities/renderText'

const LinkedInIcon: React.FC<{ className?: string }> = ({ className = 'w-5 h-5' }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
)

const useHasHover = () => {
  const [hasHover, setHasHover] = useState(true)
  useEffect(() => {
    setHasHover(window.matchMedia('(hover: hover)').matches)
  }, [])
  return hasHover
}

const GridSpeakerCard: React.FC<{
  speaker: Speaker
  locale: string
}> = ({ speaker, locale }) => {
  const [imageLoaded, setImageLoaded] = useState(false)
  const [isFlipped, setIsFlipped] = useState(false)
  const hasHover = useHasHover()
  const photo =
    typeof speaker.photo === 'object' && speaker.photo !== null
      ? (speaker.photo as Media)
      : null

  return (
    <div
      className="relative aspect-[3/4] cursor-pointer"
      style={{ perspective: '1000px' }}
      onClick={() => {
        if (!hasHover) setIsFlipped((prev) => !prev)
      }}
      onMouseEnter={hasHover ? () => setIsFlipped(true) : undefined}
      onMouseLeave={hasHover ? () => setIsFlipped(false) : undefined}
    >
      <div
        className="relative w-full h-full"
        style={{
          transformStyle: 'preserve-3d',
          transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
          transition: 'transform 300ms ease-in-out',
          willChange: 'transform',
        }}
      >
        {/* FRONT */}
        <div
          className="absolute inset-0 rounded-2xl overflow-hidden"
          style={{ backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden' }}
        >
          {/* Skeleton */}
          <div
            className={`absolute inset-0 transition-opacity duration-200 ${imageLoaded ? 'opacity-0' : 'opacity-100'}`}
          >
            <div className="w-full h-full bg-gradient-to-br from-[#b8a99a] via-[#a89888] to-[#b8a99a] animate-pulse" />
            <div className="absolute bottom-0 left-0 right-0 p-4">
              <div className="h-4 w-2/3 bg-[#a09080] rounded mb-2" />
              <div className="h-3 w-4/5 bg-[#a09080] rounded" />
            </div>
          </div>

          {photo && (
            <Image
              src={photo.url || ''}
              alt={photo.alt || speaker.name}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 33vw, 25vw"
              className={`object-cover transition-opacity duration-200 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
              loading="lazy"
              onLoad={() => setImageLoaded(true)}
            />
          )}

          {/* Gradient */}
          <div
            className="absolute inset-x-0 bottom-0 h-1/3 pointer-events-none"
            style={{ background: 'linear-gradient(to top, #BC8D6C, transparent)' }}
          />

          {/* Text */}
          <div className="absolute bottom-0 left-0 right-0 p-4 md:p-5">
            <h3 className="text-white text-sm md:text-lg font-medium mb-0.5">
              {renderText(speaker.name)}
            </h3>
            <p className="text-white/85 text-xs md:text-sm font-normal leading-snug">
              {speaker.title ? renderText(speaker.title) : null}
            </p>
          </div>

          {/* Mobile tap hint */}
          {!isFlipped && (
            <div className="md:hidden absolute top-2.5 right-2.5 flex items-center gap-1 px-2 py-0.5 rounded-full bg-black/30 backdrop-blur-sm text-white/80 text-[9px] font-medium pointer-events-none animate-pulse">
              <svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor" className="text-white/80">
                <path d="M9 11.24V7.5a2.5 2.5 0 0 1 5 0v3.74c1.21-.81 2-2.18 2-3.74C16 4.46 13.54 2 10.5 2S5 4.46 5 7.5c0 1.56.79 2.93 2 3.74H9zm3 1.76v-5.5a1 1 0 1 0-2 0V13l-2.4-1.2a1.09 1.09 0 0 0-1.41.39 1.058 1.058 0 0 0 .23 1.34l4.19 3.97c.42.4.98.5 1.49.5H16a2 2 0 0 0 2-2v-3a1 1 0 0 0-1-1h-.69a2 2 0 0 0-1.93 1.42L14 13h-2z" />
              </svg>
              Tap
            </div>
          )}
        </div>

        {/* BACK */}
        <div
          className="absolute inset-0 rounded-2xl overflow-hidden flex flex-col justify-between p-4 md:p-5"
          style={{
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
            backgroundColor: '#BC8D6C',
          }}
        >
          <div className="flex-1 flex flex-col justify-center">
            {speaker.bio && (
              <p className="text-white/90 text-xs md:text-xs leading-relaxed line-clamp-[10]">
                {renderText(speaker.bio)}
              </p>
            )}
          </div>

          <div className="flex items-center justify-between mt-3">
            {speaker.linkedinUrl ? (
              <a
                href={speaker.linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-white/20 text-white hover:bg-white/30 transition-colors"
                aria-label={`${speaker.name} on LinkedIn`}
              >
                <LinkedInIcon className="w-4 h-4" />
              </a>
            ) : (
              <span />
            )}
            {speaker.slug && (
              <Link
                href={`/${locale}/speakers/${speaker.slug}`}
                onClick={(e) => e.stopPropagation()}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/20 text-white text-xs font-medium hover:bg-white/30 transition-colors"
              >
                View
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}


type Props = FullSpeakersBlockType & {
  speakers: Speaker[]
  categories: SpeakerCategory[]
  locale: string
}

export const FullSpeakersBlockComponent: React.FC<Props> = ({
  heading,
  description,
  speakers,
  categories,
  locale,
}) => {
  const hasCategories = categories.length > 0

  // Group speakers by category (a speaker can appear in multiple categories)
  const grouped = hasCategories
    ? categories
        .map((cat) => ({
          category: cat,
          speakers: speakers.filter((s) => {
            const cats = Array.isArray(s.category) ? s.category : []
            return cats.some((c) => {
              const catId = typeof c === 'object' && c !== null ? c.id : c
              return catId === cat.id
            })
          }),
        }))
        .filter((g) => g.speakers.length > 0)
    : null

  // Speakers without a category (shown at the end when categories exist, or as the full list when none exist)
  const uncategorized = hasCategories
    ? speakers.filter((s) => !Array.isArray(s.category) || s.category.length === 0)
    : speakers

  return (
    <section className="container scroll-mt-24">
      {/* Header */}
      {(heading || description) && (
        <div className="flex flex-col md:flex-row md:justify-between gap-4 mb-8 md:mb-10">
          {heading && (
            <h2 className="text-3xl md:text-4xl font-light text-gray-900">
              {renderText(heading)}
            </h2>
          )}
          {description && (
            <p className="text-gray-600 text-sm md:text-base max-w-lg leading-relaxed">
              {renderText(description)}
            </p>
          )}
        </div>
      )}

      {grouped ? (
        <div className="flex flex-col gap-12">
          {grouped.map(({ category, speakers: catSpeakers }) => (
            <div key={category.id}>
              <h3 className="text-[#32312E] font-medium text-lg mb-4">{category.title}</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-5">
                {catSpeakers.map((speaker) => (
                  <GridSpeakerCard key={speaker.id} speaker={speaker} locale={locale} />
                ))}
              </div>
            </div>
          ))}
          {uncategorized.length > 0 && (
            <div>
              <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-5">
                {uncategorized.map((speaker) => (
                  <GridSpeakerCard key={speaker.id} speaker={speaker} locale={locale} />
                ))}
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-5">
          {uncategorized.map((speaker) => (
            <GridSpeakerCard key={speaker.id} speaker={speaker} locale={locale} />
          ))}
        </div>
      )}
    </section>
  )
}
