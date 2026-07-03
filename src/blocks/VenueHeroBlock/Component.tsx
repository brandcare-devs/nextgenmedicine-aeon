import React from 'react'
import Image from '@/components/NextImage'

import type { Media } from '@/payload-types'

type Props = {
  backgroundImage: Media | string
  overlayImage?: Media | string | null
}

export const VenueHeroBlockComponent: React.FC<Props> = ({ backgroundImage, overlayImage }) => {
  const bgImage = typeof backgroundImage === 'object' ? backgroundImage : null
  const ovImage = typeof overlayImage === 'object' ? overlayImage : null

  if (!bgImage?.url) return null

  return (
    <div className="container">
      <div className="relative overflow-hidden" style={{ aspectRatio: '16 / 5', borderRadius: 30 }}>
        <Image
          src={bgImage.url}
          alt={bgImage.alt || ''}
          fill
          className="object-cover"
          sizes="100vw"
          priority
          style={{ mixBlendMode: 'normal' }}
        />
        {/* Color overlays matching Figma blend */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: 'rgba(190, 154, 125, 0.1)', mixBlendMode: 'color' }}
        />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: 'rgba(188, 141, 108, 0.29)', mixBlendMode: 'color' }}
        />
        {/* Left-to-right gradient — fully opaque on left edge */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'linear-gradient(90deg, #77604F 0%, #77604F 28.26%, rgba(115, 106, 102, 0) 63.19%)',
          }}
        />
        {/* Overlay image */}
        {ovImage?.url && (
          <div className="absolute inset-0 flex items-center p-8 md:p-12">
            <div className="relative w-48 md:w-64 lg:w-80 h-auto">
              <Image
                src={ovImage.url}
                alt={ovImage.alt || ''}
                width={ovImage.width || 320}
                height={ovImage.height || 160}
                className="object-contain"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
