import React from 'react'
import Image from '@/components/NextImage'

import type { SpeakerHighlightBlockType, Speaker, Media } from '@/payload-types'
import { renderText } from '@/utilities/renderText'

type Props = SpeakerHighlightBlockType & {
  className?: string
}

export const SpeakerHighlightBlockComponent: React.FC<Props> = ({
  speaker,
  roleLabel,
  photoOverride,
  quote,
  heading,
  body,
}) => {
  const sp = typeof speaker === 'object' && speaker !== null ? (speaker as Speaker) : null
  if (!sp) return null

  const override =
    typeof photoOverride === 'object' && photoOverride !== null ? (photoOverride as Media) : null
  const defaultPhoto =
    typeof sp.photo === 'object' && sp.photo !== null ? (sp.photo as Media) : null
  const photo = override || defaultPhoto
  const role = roleLabel || sp.title || ''
  const paragraphs = (body || '').split(/\n\s*\n/).filter(Boolean)

  return (
    <div className="container">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5 items-stretch">
        {/* Speaker card */}
        <div className="relative overflow-hidden rounded-[28px] aspect-[4/5] md:aspect-auto md:min-h-[560px]">
          {photo?.url && (
            <Image
              src={photo.url}
              alt={photo.alt || sp.name}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          )}
          <div
            className="absolute inset-0"
            style={{
              background:
                'linear-gradient(180deg, rgba(0,0,0,0.05) 0%, rgba(79,58,48,0.35) 55%, rgba(79,58,48,0.75) 100%)',
            }}
          />
          <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-10 text-white">
            <svg
              className="w-7 h-7 md:w-9 md:h-9 mb-3 text-white/90"
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M6.5 6h4v5H7.5c0 1.93 1.57 3.5 3.5 3.5V17c-3.58 0-6.5-2.92-6.5-6.5V6zm9 0h4v5H16.5c0 1.93 1.57 3.5 3.5 3.5V17c-3.58 0-6.5-2.92-6.5-6.5V6z" />
            </svg>
            <p className="italic text-sm md:text-base leading-[1.55] mb-6 max-w-md">
              {renderText(quote)}
            </p>
            <h3 className="text-[#d4b09a] text-xl md:text-2xl font-medium mb-1">
              {renderText(sp.name)}
            </h3>
            {role && (
              <p className="text-white/85 text-sm md:text-base leading-snug whitespace-pre-line">
                {renderText(role)}
              </p>
            )}
          </div>
        </div>

        {/* Content card */}
        <div className="bg-[#f5ece5] rounded-[28px] p-8 md:p-10 lg:p-14 flex flex-col justify-center">
          <h2 className="text-[#a07a5e] font-light text-3xl md:text-4xl leading-[110%] tracking-[-0.02em] mb-6">
            {renderText(heading)}
          </h2>
          <div className="space-y-4">
            {paragraphs.map((p, i) => (
              <p
                key={i}
                className="text-[#32312E]/85 text-sm md:text-base leading-[1.55] font-normal"
              >
                {renderText(p.trim())}
              </p>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
