'use client'

import React from 'react'
import type { PageBannerBlock as PageBannerBlockProps, Media } from '@/payload-types'
import { renderText } from '@/utilities/renderText'

type Props = PageBannerBlockProps & {
  className?: string
}

export const PageBannerBlockComponent: React.FC<Props> = ({
  backgroundImage,
  subtitle,
  title,
}) => {
  const bgImage = typeof backgroundImage === 'object' ? (backgroundImage as Media) : null

  return (
    <div className="container">
      <div
        className="relative overflow-hidden w-full"
        style={{ borderRadius: '30px', minHeight: '240px' }}
      >
        {/* Background image */}
        {bgImage?.url && (
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url("${bgImage.url}")` }}
          />
        )}

        {/* Overlay */}
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(0deg, rgba(161, 144, 133, 0.6), rgba(161, 144, 133, 0.6))',
          }}
        />

        {/* Content */}
        <div className="relative z-10 flex flex-col justify-end p-6 md:p-10" style={{ minHeight: '240px' }}>
          {subtitle && (
            <span
              className="text-white/80 uppercase tracking-widest mb-1"
              style={{ fontWeight: 400, fontSize: '14px', letterSpacing: '0.1em' }}
            >
              {renderText(subtitle)}
            </span>
          )}
          {title && (
            <h1
              className="text-white"
              style={{
                fontWeight: 500,
                fontSize: 'clamp(24px, 3vw, 40px)',
                lineHeight: '110%',
                letterSpacing: '-0.04em',
              }}
            >
              {renderText(title)}
            </h1>
          )}
        </div>
      </div>
    </div>
  )
}
