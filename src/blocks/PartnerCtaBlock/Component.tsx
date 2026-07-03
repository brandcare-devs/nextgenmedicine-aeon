'use client'

import React from 'react'
import type { PartnerCtaBlockType } from '@/payload-types'
import { CMSLink } from '@/components/Link'
import { renderText } from '@/utilities/renderText'

type Props = PartnerCtaBlockType & {
  className?: string
}

export const PartnerCtaBlockComponent: React.FC<Props> = ({ title, description, link }) => {
  return (
    <div className="container">
      <div
        className="relative overflow-hidden w-full bg-[#BC8D6C] text-center py-12 lg:py-16 px-6 lg:px-12"
        style={{ borderRadius: '30px' }}
      >
        {title && (
          <h2
            className="text-white text-3xl lg:text-[2.75rem] leading-tight"
            style={{ fontFamily: 'var(--font-roboto, Roboto, sans-serif)', fontWeight: 200 }}
          >
            {renderText(title)}
          </h2>
        )}
        {description && (
          <p
            className="text-white/90 text-lg lg:text-xl leading-relaxed mt-4 max-w-2xl mx-auto"
            style={{ fontFamily: 'var(--font-roboto, Roboto, sans-serif)', fontWeight: 500 }}
          >
            {renderText(description)}
          </p>
        )}
        {link && (
          <div className="mt-6">
            <CMSLink
              {...link}
              appearance="inline"
              className="inline-flex items-center justify-center rounded-full px-8 py-3 text-sm font-medium tracking-wide border-2 border-white/70 text-white hover:bg-white/10 transition-colors"
            />
          </div>
        )}
      </div>
    </div>
  )
}
