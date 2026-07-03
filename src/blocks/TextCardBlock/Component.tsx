import React from 'react'
import { renderText } from '@/utilities/renderText'

type Props = {
  heading?: string | null
  body?: string | null
  className?: string
}

export const TextCardBlockComponent: React.FC<Props> = ({ heading, body }) => {
  const paragraphs = (body || '').split(/\n\s*\n/).filter(Boolean)

  return (
    <div className="container">
      <div className="bg-[#f5f0eb] rounded-[20px] p-8 md:p-12 lg:p-16">
        <div className="flex flex-col md:flex-row gap-6 md:gap-16">
          {heading && (
            <h2 className="text-[32px] font-light text-gray-900 md:w-2/5 shrink-0 leading-[110%] tracking-[-0.04em]">
              {renderText(heading)}
            </h2>
          )}
          {paragraphs.length > 0 && (
            <div className="flex-1 space-y-4">
              {paragraphs.map((p, i) => (
                <p key={i} className="text-gray-700 text-base leading-[130%] font-normal">
                  {renderText(p.trim())}
                </p>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
