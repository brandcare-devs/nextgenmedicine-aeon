'use client'

import React, { useEffect, useRef, useState, useCallback } from 'react'
import Image from '@/components/NextImage'

import type { BentoGridBlock as BentoGridBlockType, Media } from '@/payload-types'

import { CMSLink } from '@/components/Link'
import { renderText } from '@/utilities/renderText'
import Lightbox from 'yet-another-react-lightbox'
import Video from 'yet-another-react-lightbox/plugins/video'
import 'yet-another-react-lightbox/styles.css'

const cellSizeClasses: Record<string, string> = {
  threeCol: 'md:col-span-3',
  oneThird: 'md:col-span-4',
  fiveCol: 'md:col-span-5',
  half: 'md:col-span-6',
  sevenCol: 'md:col-span-7',
}

type Props = BentoGridBlockType & {
  className?: string
}

const AutoplayVideoCell: React.FC<{
  index: number
  isVisible: boolean
  sizeClass: string
  src: string
  mimeType: string
  poster?: string
}> = ({ index, isVisible, sizeClass, src, mimeType, poster }) => {
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const el = videoRef.current
    if (!el) return
    el.muted = true
    const tryPlay = () => {
      el.play().catch(() => {})
    }
    if (el.readyState >= 2) tryPlay()
    else el.addEventListener('loadeddata', tryPlay, { once: true })
    return () => el.removeEventListener('loadeddata', tryPlay)
  }, [src])

  return (
    <div
      data-bento-cell
      data-bento-index={index}
      className={`
        col-span-1 ${sizeClass}
        relative overflow-hidden rounded-2xl
        min-h-[220px] md:min-h-[250px]
        transition-all duration-300 ease-out
        ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}
      `}
      style={{ transitionDelay: isVisible ? `${index * 50}ms` : '0ms' }}
    >
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        poster={poster}
        className="absolute inset-0 w-full h-full object-cover"
        suppressHydrationWarning
      >
        <source src={src} type={mimeType} />
      </video>
    </div>
  )
}

export const BentoGridBlock: React.FC<Props> = ({ cells }) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const [visibleCells, setVisibleCells] = useState<Set<number>>(new Set())
  const [lightboxVideo, setLightboxVideo] = useState<{ url: string; mimeType: string } | null>(null)

  const openVideoLightbox = useCallback((url: string, mimeType: string) => {
    setLightboxVideo({ url, mimeType })
  }, [])

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const cellElements = container.querySelectorAll<HTMLElement>('[data-bento-cell]')

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = Number(entry.target.getAttribute('data-bento-index'))
            setVisibleCells((prev) => new Set(prev).add(index))
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.15, rootMargin: '0px 0px -50px 0px' },
    )

    cellElements.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  if (!cells || cells.length === 0) return null

  return (
    <div ref={containerRef} className="container">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-5">
        {cells.map((cell, index) => {
          const {
            title,
            description,
            media,
            cellSize = 'oneThird',
            style = 'light',
            enableLink,
            link,
          } = cell

          const mediaObj = typeof media === 'object' && media !== null ? (media as Media) : null
          const videoObj = typeof cell.video === 'object' && cell.video !== null ? (cell.video as Media) : null
          const isVisible = visibleCells.has(index)
          const sizeClass = cellSizeClasses[cellSize] || cellSizeClasses.oneThird

          const isSevenCol = cellSize === 'sevenCol'
          const hasOverlay = style === 'overlay' && mediaObj

          if (style === 'videoAutoplay') {
            // Accept a video file in either the "video" or "media" field.
            const videoSource =
              videoObj?.url && videoObj.mimeType?.startsWith('video/')
                ? videoObj
                : mediaObj?.url && mediaObj.mimeType?.startsWith('video/')
                  ? mediaObj
                  : null
            if (videoSource?.url) {
              return (
                <AutoplayVideoCell
                  key={cell.id || index}
                  index={index}
                  isVisible={isVisible}
                  sizeClass={sizeClass}
                  src={videoSource.url}
                  mimeType={videoSource.mimeType || 'video/mp4'}
                  poster={videoSource === mediaObj ? undefined : mediaObj?.url || undefined}
                />
              )
            }
          }

          if (style === 'video' && mediaObj) {
            return (
              <div
                key={cell.id || index}
                data-bento-cell
                data-bento-index={index}
                className={`
                  col-span-1 ${sizeClass}
                  relative overflow-hidden rounded-2xl
                  min-h-[220px] md:min-h-[250px]
                  transition-all duration-300 ease-out cursor-pointer
                  ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}
                `}
                style={{ transitionDelay: isVisible ? `${index * 50}ms` : '0ms' }}
                onClick={() => {
                  if (videoObj?.url) {
                    openVideoLightbox(videoObj.url, videoObj.mimeType || 'video/mp4')
                  }
                }}
              >
                <Image
                  src={mediaObj.url || ''}
                  alt={mediaObj.alt || ''}
                  fill
                  className="object-cover object-top"
                  sizes="(max-width: 768px) 100vw, 60vw"
                />
                {/* Slight overlay for contrast */}
                <div className="absolute inset-0 bg-black/10" />
                {/* Play button */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-16 h-16 rounded-full bg-white/80 flex items-center justify-center transition-transform duration-200 hover:scale-110">
                    <svg width="24" height="24" viewBox="0 0 20 20" fill="none">
                      <path d="M6 4L16 10L6 16V4Z" fill="#32312E" />
                    </svg>
                  </div>
                </div>
              </div>
            )
          }

          return (
            <div
              key={cell.id || index}
              data-bento-cell
              data-bento-index={index}
              className={`
                col-span-1 ${sizeClass}
                relative overflow-hidden rounded-2xl
                min-h-[220px] md:min-h-[250px]
                flex flex-col justify-between
                transition-all duration-300 ease-out
                ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}
                ${style === 'light' ? 'bg-[#f0ece7]' : ''}
                ${style === 'warm' ? 'bg-[#BC8D6C] text-white' : ''}
                ${style === 'overlay' ? '' : ''}
              `}
              style={{
                transitionDelay: isVisible ? `${index * 50}ms` : '0ms',
              }}
            >
              {/* Background image for overlay style */}
              {hasOverlay && (
                <Image
                  src={mediaObj.url || ''}
                  alt={mediaObj.alt || ''}
                  fill
                  className="object-cover object-top"
                  sizes="(max-width: 768px) 100vw, 60vw"
                />
              )}

              {/* Non-overlay media: image fills the cell */}
              {!hasOverlay && mediaObj && !title && !description && (
                <Image
                  src={mediaObj.url || ''}
                  alt={mediaObj.alt || ''}
                  fill
                  className="object-cover object-top"
                  sizes="(max-width: 768px) 100vw, 40vw"
                />
              )}

              {/* Overlay gradient for readability — sevenCol only */}
              {hasOverlay && isSevenCol && (
                <div
                  className="absolute inset-0 rounded-2xl"
                  style={{
                    background:
                      'linear-gradient(90deg, #826D5D 0%, rgba(130, 109, 93, 0) 50%)',
                  }}
                />
              )}

              {/* Content */}
              {isSevenCol ? (
                <div
                  className={`
                    relative z-10 flex flex-col justify-between h-full p-6 md:p-8
                    ${hasOverlay ? 'text-white' : ''}
                  `}
                >
                  {/* Title — top left */}
                  {title && (
                    <h3 className="text-white text-2xl md:text-3xl font-medium leading-tight">
                      {renderText(title)}
                    </h3>
                  )}

                  {/* Bottom row: description left, button right */}
                  <div className="flex items-end justify-between gap-4">
                    {description && (
                      <p className="text-white/90 text-base md:text-[15px] leading-relaxed font-normal">
                        {renderText(description)}
                      </p>
                    )}
                    {enableLink && link && (
                      <CMSLink
                        {...link}
                        className="inline-flex items-center justify-center px-5 py-2 rounded-full border-2 border-white/60 text-white hover:bg-white/15 text-sm font-medium transition-colors duration-200 shrink-0"
                        appearance="inline"
                      />
                    )}
                  </div>
                </div>
              ) : (
                <div
                  className={`
                    relative z-10 flex flex-col justify-between h-full p-6 md:p-8
                    ${hasOverlay ? 'text-white' : ''}
                  `}
                >
                  <div>
                    {title && (
                      <h3
                        className={`
                          text-2xl md:text-2xl font-medium leading-tight mb-3
                          ${style === 'warm' ? 'text-white' : ''}
                          ${hasOverlay ? 'text-white text-2xl md:text-3xl' : ''}
                          ${style === 'light' ? 'text-[#32312E]' : ''}
                        `}
                      >
                        {renderText(title)}
                      </h3>
                    )}
                    {description && (
                      <p
                        className={`
                          text-base md:text-[15px] leading-relaxed font-normal
                          ${style === 'warm' ? 'text-white/90' : ''}
                          ${hasOverlay ? 'text-white/90' : ''}
                          ${style === 'light' ? 'text-[#5a5751]' : ''}
                        `}
                      >
                        {renderText(description)}
                      </p>
                    )}
                  </div>

                  {enableLink && link && (
                    <div className="mt-4">
                      <CMSLink
                        {...link}
                        className={`
                          inline-flex items-center justify-center px-5 py-2
                          rounded-full border text-sm font-medium
                          transition-colors duration-200
                          ${style === 'warm' || hasOverlay
                            ? 'border-white/60 text-white hover:bg-white/15'
                            : 'border-[#8a857e] text-[#32312E] hover:bg-[#32312E]/5'
                          }
                        `}
                        appearance="inline"
                      />
                    </div>
                  )}
                </div>
              )}
            </div>
          )
        })}
      </div>

      {/* Video lightbox */}
      <Lightbox
        open={lightboxVideo !== null}
        close={() => setLightboxVideo(null)}
        slides={
          lightboxVideo
            ? [
                {
                  type: 'video' as const,
                  width: 1280,
                  height: 720,
                  sources: [{ src: lightboxVideo.url, type: lightboxVideo.mimeType }],
                },
              ]
            : []
        }
        plugins={[Video]}
        animation={{ fade: 300, swipe: 300 }}
        styles={{
          container: { backgroundColor: 'rgba(0, 0, 0, 0.9)' },
        }}
      />
    </div>
  )
}
