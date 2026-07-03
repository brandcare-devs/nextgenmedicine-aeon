'use client'

import React, { useState } from 'react'
import Image from '@/components/NextImage'
import Link from 'next/link'
import { useParams } from 'next/navigation'

import type { Post, Media } from '@/payload-types'
import { formatDateTime } from '@/utilities/formatDateTime'
import { renderText } from '@/utilities/renderText'

function getPostImage(post: Post): Media | null {
  const heroImage = typeof post.heroImage === 'object' ? (post.heroImage as Media) : null
  if (heroImage?.url) return heroImage
  const metaImage = typeof post.meta?.image === 'object' ? (post.meta.image as Media) : null
  if (metaImage?.url) return metaImage
  return null
}

const RelatedPostCard: React.FC<{ post: Post; locale: string }> = ({ post, locale }) => {
  const image = getPostImage(post)

  return (
    <Link
      href={`/${locale}/posts/${post.slug}`}
      className="block overflow-hidden group flex-shrink-0 w-full"
      style={{ borderRadius: 40 }}
    >
      <div className="relative" style={{ aspectRatio: '466.5 / 554.63' }}>
        {image?.url ? (
          <Image
            src={image.url}
            alt={image.alt || post.title || ''}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
        ) : (
          <div className="w-full h-full bg-[#d4c4b8]" />
        )}
        <div
          className="absolute inset-x-0 bottom-0 h-1/2 pointer-events-none"
          style={{ background: 'linear-gradient(to top, #A19085, transparent)' }}
        />
        <div className="absolute bottom-0 left-0 right-0 p-5 md:p-6">
          {post.publishedAt && (
            <p className="text-white/70 text-xs mb-1">{formatDateTime(post.publishedAt)}</p>
          )}
          <h3 className="text-white text-sm md:text-base font-medium leading-snug line-clamp-3">
            {post.title ? renderText(post.title) : null}
          </h3>
        </div>
      </div>
    </Link>
  )
}

export type RelatedPostsProps = {
  className?: string
  docs?: Post[]
}

export const RelatedPosts: React.FC<RelatedPostsProps> = ({ className, docs }) => {
  const { locale } = useParams()
  const [page, setPage] = useState(0)

  if (!docs || docs.length === 0) return null

  const perPage = 3
  const totalPages = Math.ceil(docs.length / perPage)
  const visiblePosts = docs.slice(page * perPage, page * perPage + perPage)

  return (
    <div className={className}>
      {/* Divider */}
      <div className="border-t border-[#BC8D6C]/30 mb-8" />

      {/* Header with arrows */}
      <div className="flex items-center justify-between mb-8">
        <button
          onClick={() => setPage((p) => Math.max(0, p - 1))}
          disabled={page === 0}
          className={`w-10 h-10 rounded-full border border-[#BC8D6C]/30 flex items-center justify-center transition-opacity ${
            page === 0 ? 'opacity-30 cursor-not-allowed' : 'hover:bg-[#BC8D6C]/10'
          }`}
          aria-label="Previous"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#BC8D6C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
        </button>

        <h2 className="text-2xl md:text-3xl font-medium text-[#BC8D6C]">More articles</h2>

        <button
          onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))}
          disabled={page >= totalPages - 1}
          className={`w-10 h-10 rounded-full border border-[#BC8D6C]/30 flex items-center justify-center transition-opacity ${
            page >= totalPages - 1 ? 'opacity-30 cursor-not-allowed' : 'hover:bg-[#BC8D6C]/10'
          }`}
          aria-label="Next"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#BC8D6C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {/* Posts grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {visiblePosts.map((post) => (
          <RelatedPostCard key={post.id} post={post} locale={locale as string} />
        ))}
      </div>

      {/* See all articles link */}
      <div className="flex justify-center mt-8">
        <Link
          href={`/${locale}/posts`}
          className="inline-flex items-center px-6 py-2.5 rounded-full text-sm font-medium text-[#32312E] hover:bg-[#BC8D6C]/10 transition-colors"
          style={{ border: '2px solid #32312E' }}
        >
          See all articles
        </Link>
      </div>
    </div>
  )
}
