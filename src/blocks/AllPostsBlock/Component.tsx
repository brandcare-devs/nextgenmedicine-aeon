'use client'

import React, { useState, useRef, useCallback } from 'react'
import Image from '@/components/NextImage'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import type { AllPostsBlockType, Post, Media } from '@/payload-types'
import { formatDateTime } from '@/utilities/formatDateTime'
import { renderText } from '@/utilities/renderText'

function getPostImage(post: Post): Media | null {
  const heroImage = typeof post.heroImage === 'object' ? (post.heroImage as Media) : null
  if (heroImage?.url) return heroImage
  const metaImage = typeof post.meta?.image === 'object' ? (post.meta.image as Media) : null
  if (metaImage?.url) return metaImage
  return null
}

const PostCard: React.FC<{ post: Post; locale: string }> = ({ post, locale }) => {
  const image = getPostImage(post)

  return (
    <Link
      href={`/${locale}/posts/${post.slug}`}
      className="block overflow-hidden group"
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
        {/* Gradient overlay */}
        <div
          className="absolute inset-x-0 bottom-0 h-1/2 pointer-events-none"
          style={{ background: 'linear-gradient(to top, #A19085, transparent)' }}
        />
        {/* Text overlay */}
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

const FeaturedPostCard: React.FC<{ post: Post; locale: string }> = ({ post, locale }) => {
  const image = getPostImage(post)

  return (
    <Link
      href={`/${locale}/posts/${post.slug}`}
      className="block rounded-2xl overflow-hidden group"
    >
      <div className="relative aspect-[16/7] md:aspect-[16/6]">
        {image?.url ? (
          <Image
            src={image.url}
            alt={image.alt || post.title || ''}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="100vw"
            priority
          />
        ) : (
          <div className="w-full h-full bg-[#d4c4b8]" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
          {post.publishedAt && (
            <p className="text-white/70 text-sm mb-1">{formatDateTime(post.publishedAt)}</p>
          )}
          <h2 className="text-white text-lg md:text-2xl font-medium leading-snug max-w-2xl">
            {post.title ? renderText(post.title) : null}
          </h2>
        </div>
      </div>
    </Link>
  )
}

function getPaginationRange(current: number, total: number): (number | 'ellipsis')[] {
  if (total <= 5) return Array.from({ length: total }, (_, i) => i + 1)

  const pages: (number | 'ellipsis')[] = []
  pages.push(1, 2)
  if (current > 3) pages.push('ellipsis')
  const start = Math.max(3, current - 1)
  const end = Math.min(total - 2, current + 1)
  for (let i = start; i <= end; i++) pages.push(i)
  if (current < total - 2) pages.push('ellipsis')
  pages.push(total - 1, total)

  const result: (number | 'ellipsis')[] = []
  for (const p of pages) {
    const last = result[result.length - 1]
    if (p === last) continue
    if (p === 'ellipsis' && last === 'ellipsis') continue
    result.push(p)
  }
  return result
}

type Props = AllPostsBlockType & {
  featuredPost: Post | null
  posts: Post[]
  totalPosts: number
  perPage: number
  locale: string
}

export const AllPostsBlockComponent: React.FC<Props> = ({
  featuredPost,
  posts: initialPosts,
  totalPosts,
  perPage,
  locale,
}) => {
  const [posts, setPosts] = useState(initialPosts)
  const [currentPage, setCurrentPage] = useState(1)
  const [loading, setLoading] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)
  const totalPages = Math.ceil(totalPosts / perPage)

  const goToPage = useCallback(
    async (page: number) => {
      if (page === currentPage || page < 1 || page > totalPages) return

      setLoading(true)
      try {
        const res = await fetch(
          `/api/posts?limit=${perPage}&page=${page}&sort=-publishedAt&locale=${locale}&depth=1&where[featured][not_equals]=true&where[_status][equals]=published`,
        )
        const data = await res.json()
        setPosts(data.docs)
        setCurrentPage(page)
        sectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
      } catch (err) {
        console.error('Failed to fetch posts:', err)
      } finally {
        setLoading(false)
      }
    },
    [currentPage, totalPages, perPage, locale],
  )

  const paginationRange = getPaginationRange(currentPage, totalPages)

  const Pagination = () => {
    if (totalPages <= 1) return null

    return (
      <div className="flex items-center justify-center gap-2">
        <button
          onClick={() => goToPage(currentPage - 1)}
          disabled={currentPage === 1}
          className={`w-10 h-10 rounded-full border border-[#BC8D6C]/30 flex items-center justify-center transition-opacity ${currentPage === 1 ? 'opacity-30 cursor-not-allowed' : 'hover:bg-[#BC8D6C]/10'}`}
          aria-label="Previous page"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#BC8D6C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
        </button>

        <div className="flex items-center gap-1.5">
          {paginationRange.map((item, i) =>
            item === 'ellipsis' ? (
              <span key={`e-${i}`} className="w-10 h-10 flex items-center justify-center text-sm text-gray-400">
                ...
              </span>
            ) : (
              <button
                key={item}
                onClick={() => goToPage(item)}
                className={`w-10 h-10 rounded-full text-sm font-medium transition-colors ${
                  item === currentPage
                    ? 'bg-[#BC8D6C] text-white'
                    : 'text-gray-600 hover:bg-[#BC8D6C]/10'
                }`}
              >
                {item}
              </button>
            ),
          )}
        </div>

        <button
          onClick={() => goToPage(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={`w-10 h-10 rounded-full border border-[#BC8D6C]/30 flex items-center justify-center transition-opacity ${currentPage === totalPages ? 'opacity-30 cursor-not-allowed' : 'hover:bg-[#BC8D6C]/10'}`}
          aria-label="Next page"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#BC8D6C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    )
  }

  return (
    <section ref={sectionRef} className="container scroll-mt-24">
      {/* Top pagination */}
      <div className="mb-8">
        <Pagination />
      </div>

      {/* Featured post */}
      {featuredPost && currentPage === 1 && (
        <div className="mb-4">
          <FeaturedPostCard post={featuredPost} locale={locale} />
        </div>
      )}

      {/* Posts grid */}
      <div
        className={`grid grid-cols-1 md:grid-cols-3 gap-4 transition-opacity duration-300 ${loading ? 'opacity-40 pointer-events-none' : 'opacity-100'}`}
      >
        {posts.map((post) => (
          <PostCard key={post.id} post={post} locale={locale} />
        ))}
      </div>

      {/* Bottom pagination */}
      <div className="mt-8 md:mt-12">
        <Pagination />
      </div>
    </section>
  )
}
