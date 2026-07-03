'use client'

import React from 'react'
import Image from '@/components/NextImage'

import type { Media } from '@/payload-types'
import RichText from '@/components/RichText'
import { CMSLink } from '@/components/Link'
import { renderText } from '@/utilities/renderText'
import type { DefaultTypedEditorState } from '@payloadcms/richtext-lexical'

type CardType = {
  title: string
  content?: DefaultTypedEditorState | null
  enableLink?: boolean | null
  link?: {
    type?: 'reference' | 'custom' | null
    reference?: { relationTo: 'pages' | 'posts'; value: any } | null
    url?: string | null
    label?: string | null
    newTab?: boolean | null
  }
}

type Props = {
  title: string
  description?: string | null
  image: Media | string
  imageLink?: string | null
  cards?: CardType[] | null
}

export const LocationBlockComponent: React.FC<Props> = ({ title, description, image, imageLink, cards }) => {
  const img = typeof image === 'object' ? image : null

  return (
    <div className="container">
      {/* Title & description */}
      <div className="mb-8">
        <h2
          className="text-2xl md:text-3xl font-light text-[#32312E] mb-4"
          style={{ fontFamily: 'var(--font-roboto, Roboto, sans-serif)', fontWeight: 300 }}
        >
          {renderText(title)}
        </h2>
        {description && (
          <p className="text-sm text-[#32312E]/80 leading-relaxed max-w-2xl">{renderText(description)}</p>
        )}
      </div>

      {/* Map / location image */}
      {img?.url && (
        imageLink ? (
          <a href={imageLink} target="_blank" rel="noopener noreferrer" className="block relative overflow-hidden rounded-2xl mb-8" style={{ aspectRatio: img.width && img.height ? `${img.width} / ${img.height}` : undefined }}>
            <Image
              src={img.url}
              alt={img.alt || ''}
              fill
              className="object-cover"
              sizes="100vw"
            />
          </a>
        ) : (
          <div className="relative overflow-hidden rounded-2xl mb-8" style={{ aspectRatio: img.width && img.height ? `${img.width} / ${img.height}` : undefined }}>
            <Image
              src={img.url}
              alt={img.alt || ''}
              fill
              className="object-cover"
              sizes="100vw"
            />
          </div>
        )
      )}

      {/* Info cards */}
      {cards && cards.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {cards.map((card, index) => (
            <div
              key={index}
              className="rounded-2xl bg-[#F9F2EF] p-6 flex flex-col overflow-hidden"
            >
              <h3
                className="text-base md:text-lg text-[#32312E] mb-4"
                style={{ fontFamily: 'var(--font-roboto, Roboto, sans-serif)', fontWeight: 300 }}
              >
                {renderText(card.title)}
              </h3>
              {card.content && (
                <div className="text-sm text-[#32312E]/80 leading-relaxed mb-4 flex-1 break-all">
                  <RichText data={card.content} enableGutter={false} />
                </div>
              )}
              {card.enableLink && card.link?.label && (
                <div>
                  <CMSLink
                    {...card.link}
                    className="inline-flex items-center justify-center rounded-full px-6 py-2.5 text-sm font-medium border-2 border-[#32312E] text-[#32312E] hover:opacity-70 transition-opacity"
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
