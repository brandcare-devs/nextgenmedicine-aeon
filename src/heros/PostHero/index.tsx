import { formatDateTime } from 'src/utilities/formatDateTime'
import React from 'react'

import type { Post } from '@/payload-types'

import { Media } from '@/components/Media'
import { renderText } from '@/utilities/renderText'

export const PostHero: React.FC<{
  post: Post
}> = ({ post }) => {
  const { author, heroImage, publishedAt, title } = post

  return (
    <div className="container">
      <div className="relative overflow-hidden" style={{ borderRadius: 24 }}>
        <div className="relative aspect-[16/9] md:aspect-[16/8]">
          {heroImage && typeof heroImage !== 'string' && (
            <Media fill priority imgClassName="object-cover" resource={heroImage} />
          )}
        </div>
      </div>
      <div className="mt-6 md:mt-8">
        <div className="flex items-center gap-3 text-[#32312E]/60 text-base md:text-lg mb-2">
          {publishedAt && (
            <time dateTime={publishedAt}>
              {formatDateTime(publishedAt)}
            </time>
          )}
          {author && publishedAt && <span>·</span>}
          {author && <span>{author}</span>}
        </div>
        <h1 className="text-[#32312E] text-2xl md:text-4xl lg:text-5xl font-medium leading-tight max-w-3xl">
          {renderText(title)}
        </h1>
      </div>
    </div>
  )
}
