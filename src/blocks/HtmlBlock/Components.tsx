import React from 'react'

import type { HtmlBlockType } from '@/payload-types'

export const HtmlBlockComponent: React.FC<HtmlBlockType> = ({ html }) => {
  if (!html) return null

  return (
    <div className="container">
      <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: html }} />
    </div>
  )
}