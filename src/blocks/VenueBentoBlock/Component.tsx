'use client'

import React from 'react'
import Image from '@/components/NextImage'

import type { Media } from '@/payload-types'
import { renderText } from '@/utilities/renderText'
type Card = {
  colSpan: '1' | '2' | '3'
  cardType: 'imageWithGradient' | 'imageOnly' | 'imageWithText' | 'textOnly'
  backgroundImage?: Media | string | null
  title?: string | null
  description?: string | null
}

type Props = {
  cards: Card[]
}

const colSpanClasses: Record<string, string> = {
  '1': 'col-span-6 md:col-span-1',
  '2': 'col-span-6 md:col-span-2',
  '3': 'col-span-6 md:col-span-3',
}

const BentoCard: React.FC<{ card: Card }> = ({ card }) => {
  const { colSpan, cardType, backgroundImage, title, description } = card
  const bgImage = typeof backgroundImage === 'object' && backgroundImage ? backgroundImage : null

  const baseClasses = `${colSpanClasses[colSpan]} rounded-2xl overflow-hidden relative`

  if (cardType === 'textOnly') {
    return (
      <div className={`${colSpanClasses[colSpan]} flex flex-col justify-center`}>
        {title && (
          <h3
            className="text-xl md:text-2xl font-medium text-[#32312E] mb-3"
            style={{ fontFamily: 'var(--font-roboto, Roboto, sans-serif)', fontWeight: 500 }}
          >
            {renderText(title)}
          </h3>
        )}
        {description && (
          <p className="text-sm text-[#32312E]/80 leading-relaxed">{renderText(description)}</p>
        )}
      </div>
    )
  }

  if (cardType === 'imageOnly') {
    return (
      <div className={`${baseClasses} min-h-[200px]`}>
        {bgImage?.url && (
          <Image
            src={bgImage.url}
            alt={bgImage.alt || ''}
            fill
            className="object-cover"
            sizes={colSpan === '3' ? '50vw' : colSpan === '2' ? '33vw' : '16vw'}
          />
        )}
      </div>
    )
  }

  // imageWithGradient or imageWithText
  return (
    <div className={`${baseClasses} min-h-[200px]`}>
      {bgImage?.url && (
        <Image
          src={bgImage.url}
          alt={bgImage.alt || ''}
          fill
          className="object-cover"
          sizes={colSpan === '3' ? '50vw' : colSpan === '2' ? '33vw' : '16vw'}
        />
      )}
      {cardType === 'imageWithGradient' && (
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: 'linear-gradient(90deg, #F9F2EF 0%, #F9F2EF 50%, rgba(249, 242, 239, 0) 85%)' }}
        />
      )}
      {(title || description) && (
        <div className="absolute inset-0 flex flex-col justify-start p-6 md:p-8" style={{ maxWidth: '70%' }}>
          {title && (
            <h3
              className="text-xl md:text-2xl text-[#32312E] mb-2"
              style={{ fontFamily: 'var(--font-roboto, Roboto, sans-serif)', fontWeight: 300 }}
            >
              {renderText(title)}
            </h3>
          )}
          {description && (
            <p className="text-sm text-[#32312E]/80 leading-relaxed max-w-md">{renderText(description)}</p>
          )}
        </div>
      )}
    </div>
  )
}

export const VenueBentoBlockComponent: React.FC<Props> = ({ cards }) => {
  if (!cards || cards.length === 0) return null

  return (
    <div className="container">
      <div className="grid grid-cols-6 gap-4" style={{ gridAutoRows: '1fr' }}>
        {cards.map((card, index) => (
          <BentoCard key={index} card={card} />
        ))}
      </div>
    </div>
  )
}
