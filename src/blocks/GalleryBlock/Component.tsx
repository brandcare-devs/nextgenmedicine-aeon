'use client'

import React, { useCallback, useEffect, useRef, useState } from 'react'
import Image from '@/components/NextImage'
import type { GalleryBlock as GalleryBlockProps, Media } from '@/payload-types'

import Lightbox, { type Slide } from 'yet-another-react-lightbox'
import Zoom from 'yet-another-react-lightbox/plugins/zoom'
import Download from 'yet-another-react-lightbox/plugins/download'
import Video from 'yet-another-react-lightbox/plugins/video'
import 'yet-another-react-lightbox/styles.css'

type Props = GalleryBlockProps & {
  className?: string
}

export const GalleryBlockComponent: React.FC<Props> = ({ items }) => {
  const sectionRef = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)
  const [lightboxIndex, setLightboxIndex] = useState(-1)

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

  const galleryItems = (items || [])
    .map((item) => {
      const media = typeof item.media === 'object' ? (item.media as Media) : null
      if (!media?.url) return null
      return { media, wide: Boolean(item.wide) }
    })
    .filter((item): item is { media: Media; wide: boolean } => item !== null)

  const slides: Slide[] = galleryItems.map(({ media }) => {
    const isVideo = media.mimeType?.startsWith('video/')

    if (isVideo) {
      return {
        type: 'video' as const,
        width: media.width || 1280,
        height: media.height || 720,
        sources: [{ src: media.url!, type: media.mimeType || 'video/mp4' }],
        download: media.url!,
      }
    }

    return {
      src: media.url!,
      width: media.width || 1920,
      height: media.height || 1080,
      alt: media.alt || '',
      downloadUrl: media.url!,
    }
  })

  const openLightbox = useCallback((index: number) => {
    setLightboxIndex(index)
  }, [])

  if (galleryItems.length === 0) return null

  return (
    <div
      ref={sectionRef}
      className={`
        container
        transition-all duration-300
        ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}
      `}
    >
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
        {galleryItems.map(({ media, wide }, index) => {
          const isVideo = media.mimeType?.startsWith('video/')

          return (
            <button
              key={media.id || index}
              onClick={() => openLightbox(index)}
              className={`relative overflow-hidden cursor-pointer group ${wide ? 'col-span-2' : ''}`}
              style={{
                borderRadius: '20px',
                aspectRatio: wide ? '2 / 1' : '1 / 1',
              }}
            >
              {isVideo ? (
                <video
                  muted
                  playsInline
                  className="absolute inset-0 w-full h-full object-cover pointer-events-none"
                  src={media.url!}
                />
              ) : (
                <Image
                  src={media.url!}
                  alt={media.alt || ''}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                  sizes="(max-width: 768px) 50vw, 25vw"
                />
              )}

              {/* Hover overlay */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />

              {/* Video play icon */}
              {isVideo && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-12 h-12 rounded-full bg-white/80 flex items-center justify-center">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                      <path d="M6 4L16 10L6 16V4Z" fill="#32312E" />
                    </svg>
                  </div>
                </div>
              )}
            </button>
          )
        })}
      </div>

      {/* Lightbox */}
      <Lightbox
        open={lightboxIndex >= 0}
        close={() => setLightboxIndex(-1)}
        index={lightboxIndex}
        slides={slides}
        plugins={[Zoom, Download, Video]}
        animation={{ fade: 300, swipe: 300 }}
        zoom={{
          maxZoomPixelRatio: 5,
          scrollToZoom: true,
        }}
        styles={{
          container: { backgroundColor: 'rgba(0, 0, 0, 0.9)' },
        }}
      />
    </div>
  )
}
