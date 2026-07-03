'use client'

import React, { useRef, useState, useEffect, useCallback } from 'react'
import Image from '@/components/NextImage'
import Link from 'next/link'
import { useParams } from 'next/navigation'

import type { SpeakersBlockType, Speaker, Media } from '@/payload-types'

import { CMSLink } from '@/components/Link'
import { renderText } from '@/utilities/renderText'

type Props = SpeakersBlockType & {
  className?: string
  speakers: Speaker[]
}

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

const SpeakerCard: React.FC<{
  speaker: Speaker
  index: number
  isVisible: boolean
}> = ({ speaker, index, isVisible }) => {
  const [imageLoaded, setImageLoaded] = useState(false)
  const [isFlipped, setIsFlipped] = useState(false)
  const hasHover = useHasHover()
  const params = useParams()
  const locale = (params?.locale as string) || 'en'
  const photo =
    typeof speaker.photo === 'object' && speaker.photo !== null
      ? (speaker.photo as Media)
      : null

  return (
    <div
      className={`
        snap-start shrink-0 w-[65vw] sm:w-[55vw] md:w-[calc(50%-10px)] lg:w-[calc(33.333%-14px)]
        relative aspect-[3/4] cursor-pointer
        transition-all duration-300 ease-out
        ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}
      `}
      style={{
        perspective: '1000px',
        transitionDelay: isVisible ? `${50 + index * 60}ms` : '0ms',
      }}
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
        {/* === FRONT === */}
        <div
          className="absolute inset-0 rounded-2xl overflow-hidden"
          style={{ backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden' }}
        >
          {/* Skeleton loader */}
          <div
            className={`
              absolute inset-0 transition-opacity duration-200
              ${imageLoaded ? 'opacity-0' : 'opacity-100'}
            `}
          >
            <div className="w-full h-full bg-gradient-to-br from-[#b8a99a] via-[#a89888] to-[#b8a99a] animate-pulse" />
            <div className="absolute bottom-0 left-0 right-0 p-5 md:p-6">
              <div className="h-5 w-2/3 bg-[#a09080] rounded mb-2" />
              <div className="h-4 w-4/5 bg-[#a09080] rounded" />
            </div>
          </div>

          {/* Photo */}
          {photo && (
            <Image
              src={photo.url || ''}
              alt={photo.alt || speaker.name}
              fill
              sizes="(max-width: 640px) 65vw, (max-width: 768px) 55vw, (max-width: 1024px) 50vw, 33vw"
              className={`
                object-cover transition-opacity duration-200
                ${imageLoaded ? 'opacity-100' : 'opacity-0'}
              `}
              priority={index < 3}
              loading={index < 3 ? 'eager' : 'lazy'}
              onLoad={() => setImageLoaded(true)}
            />
          )}

          {/* Gradient overlay */}
          <div
            className="absolute inset-x-0 bottom-0 h-1/3 pointer-events-none"
            style={{
              background: 'linear-gradient(to top, #BC8D6C, transparent)',
            }}
          />

          {/* Text overlay */}
          <div className="absolute bottom-0 left-0 right-0 p-5 md:p-6">
            <h3 className="text-white text-base md:text-lg font-medium mb-1">
              {renderText(speaker.name)}
            </h3>
            <p className="text-white/85 text-xs md:text-sm font-normal leading-snug">
              {speaker.title ? renderText(speaker.title) : null}
            </p>
          </div>

          {/* Tap hint — mobile only, hide once any card has been flipped */}
          {!isFlipped && (
            <div className="md:hidden absolute top-3 right-3 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/30 backdrop-blur-sm text-white/80 text-[10px] font-medium pointer-events-none animate-pulse">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" className="text-white/80">
                <path d="M9 11.24V7.5a2.5 2.5 0 0 1 5 0v3.74c1.21-.81 2-2.18 2-3.74C16 4.46 13.54 2 10.5 2S5 4.46 5 7.5c0 1.56.79 2.93 2 3.74H9zm3 1.76v-5.5a1 1 0 1 0-2 0V13l-2.4-1.2a1.09 1.09 0 0 0-1.41.39 1.058 1.058 0 0 0 .23 1.34l4.19 3.97c.42.4.98.5 1.49.5H16a2 2 0 0 0 2-2v-3a1 1 0 0 0-1-1h-.69a2 2 0 0 0-1.93 1.42L14 13h-2z" />
              </svg>
              Tap
            </div>
          )}
        </div>

        {/* === BACK === */}
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
              <p className="text-white/90 text-sm md:text-xs leading-relaxed line-clamp-[10]">
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

export const SpeakersBlockComponent: React.FC<Props> = ({
  heading,
  description,
  enableLink,
  link,
  speakers,
}) => {
  const sectionRef = useRef<HTMLElement>(null)
  const scrollRef = useRef<HTMLDivElement>(null)
  const mobileScrollRef = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(true)
  const [mobileAtStart, setMobileAtStart] = useState(true)

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

  const updateScrollState = useCallback(() => {
    const el = scrollRef.current
    if (!el) return
    setCanScrollLeft(el.scrollLeft > 0)
    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 1)
  }, [])

  useEffect(() => {
    const el = scrollRef.current
    if (!el) return
    updateScrollState()
    el.addEventListener('scroll', updateScrollState, { passive: true })
    const resizeObserver = new ResizeObserver(() => updateScrollState())
    resizeObserver.observe(el)
    return () => {
      el.removeEventListener('scroll', updateScrollState)
      resizeObserver.disconnect()
    }
  }, [updateScrollState])

  useEffect(() => {
    const el = mobileScrollRef.current
    if (!el) return
    const onScroll = () => setMobileAtStart(el.scrollLeft <= 10)
    el.addEventListener('scroll', onScroll, { passive: true })
    return () => el.removeEventListener('scroll', onScroll)
  }, [])

  const scroll = (direction: 'left' | 'right') => {
    const el = scrollRef.current
    if (!el) return
    const cardWidth = el.querySelector('div')?.offsetWidth || 300
    const gap = 20
    const scrollAmount = direction === 'left' ? -(cardWidth + gap) : cardWidth + gap
    el.scrollBy({ left: scrollAmount, behavior: 'smooth' })
  }

  if (!speakers || speakers.length === 0) return null

  return (
    <section
      ref={sectionRef}
      className="container"
    >
      <div className="bg-[#9F8E82] rounded-3xl py-12 md:py-16 px-6 md:px-12 overflow-hidden">
      {/* Top row: heading, description, CTA (desktop) */}
      <div
        className={`
          flex flex-col items-center text-center md:text-left md:items-start md:flex-row md:justify-between gap-4 mb-8 md:mb-12
          transition-all duration-300
          ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}
        `}
      >
        {heading && (
          <h2 className="text-white text-3xl md:text-4xl font-light shrink-0">
            {renderText(heading)}
          </h2>
        )}

        {description && (
          <p className="text-white/90 text-xs md:text-sm font-normal max-w-lg leading-relaxed">
            {renderText(description)}
          </p>
        )}

        {/* Desktop CTA */}
        {enableLink && link && (
          <div className="hidden md:block shrink-0">
            <CMSLink
              {...link}
              appearance="inline"
              className="inline-flex items-center justify-center px-8 py-3 rounded-full border-2 border-white text-white text-sm font-medium hover:opacity-70 transition-opacity"
            />
          </div>
        )}
      </div>

      {/* Desktop carousel with arrows */}
      <div className="hidden md:flex items-center gap-4">
        {/* Left arrow */}
        <button
          onClick={() => scroll('left')}
          className={`
            shrink-0 transition-opacity duration-300
            ${canScrollLeft ? 'opacity-100' : 'opacity-30'}
          `}
          aria-label="Scroll left"
        >
          <img
            src="/next_circle_filled_icon.svg"
            alt=""
            className="w-12 h-12 rotate-180"
          />
        </button>

        {/* Cards */}
        <div
          ref={scrollRef}
          className="flex-1 flex gap-5 overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-4 min-w-0"
        >
          {speakers.map((speaker, index) => (
            <SpeakerCard
              key={speaker.id || index}
              speaker={speaker}
              index={index}
              isVisible={isVisible}
            />
          ))}
        </div>

        {/* Right arrow */}
        <button
          onClick={() => scroll('right')}
          className={`
            shrink-0 transition-opacity duration-300
            ${canScrollRight ? 'opacity-100' : 'opacity-30'}
          `}
          aria-label="Scroll right"
        >
          <img
            src="/next_circle_filled_icon.svg"
            alt=""
            className="w-12 h-12"
          />
        </button>
      </div>

      {/* Mobile carousel — no arrows, peek next card, fade edges */}
      <div className="md:hidden relative">
        {/* Left fade — only when scrolled */}
        <div
          className="absolute left-0 top-0 bottom-4 w-12 z-10 pointer-events-none transition-opacity duration-300"
          style={{
            background: 'linear-gradient(to right, #9F8E82, transparent)',
            opacity: mobileAtStart ? 0 : 1,
          }}
        />
        {/* Right fade */}
        <div
          className="absolute right-0 top-0 bottom-4 w-12 z-10 pointer-events-none"
          style={{ background: 'linear-gradient(to left, #9F8E82, transparent)' }}
        />

        <div
          ref={mobileScrollRef}
          className="flex gap-4 overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-4 px-4"
          style={{ scrollPaddingInlineStart: '16px' }}
        >
          {speakers.map((speaker, index) => (
            <SpeakerCard
              key={speaker.id || index}
              speaker={speaker}
              index={index}
              isVisible={isVisible}
            />
          ))}
        </div>
      </div>

      {/* Mobile CTA — below carousel */}
      {enableLink && link && (
        <div
          className={`
            md:hidden flex justify-center mt-6
            transition-all duration-300
            ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}
          `}
          style={{ transitionDelay: isVisible ? '200ms' : '0ms' }}
        >
          <CMSLink
            {...link}
            appearance="inline"
            className="inline-flex items-center justify-center px-8 py-3 rounded-full border-2 border-white text-white text-sm font-medium hover:opacity-70 transition-opacity"
          />
        </div>
      )}
      </div>
    </section>
  )
}
