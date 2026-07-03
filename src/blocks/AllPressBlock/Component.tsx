'use client'

import React, { useState, useRef, useCallback } from 'react'
import Image from '@/components/NextImage'

import type { AllPressBlockType, PressArticle, Media } from '@/payload-types'
import { formatDateTime } from '@/utilities/formatDateTime'
import { renderText } from '@/utilities/renderText'

const PressCard: React.FC<{ article: PressArticle }> = ({ article }) => {
  const thumbnail = typeof article.thumbnail === 'object' ? (article.thumbnail as Media) : null
  const logo = typeof article.publicationLogo === 'object' ? (article.publicationLogo as Media) : null

  return (
    <a
      href={article.externalUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="block overflow-hidden group"
      style={{ borderRadius: 40 }}
    >
      <div className="relative" style={{ aspectRatio: '466.5 / 554.63' }}>
        {thumbnail?.url ? (
          <Image
            src={thumbnail.url}
            alt={thumbnail.alt || article.title || ''}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
        ) : (
          <div className="w-full h-full bg-[#d4c4b8]" />
        )}
        {/* Gradient overlay */}
        <div
          className="absolute inset-x-0 bottom-0 h-2/3 pointer-events-none"
          style={{ background: 'linear-gradient(to top, #A19085, transparent)' }}
        />
        {/* Publication logo */}
        {logo?.url && (
          <div className="absolute top-4 right-4 bg-white rounded-full px-3 py-2 shadow-sm">
            <Image
              src={logo.url}
              alt={article.publicationName || ''}
              width={80}
              height={24}
              className="object-contain h-5 w-auto"
              style={{ width: 'auto' }}
            />
          </div>
        )}
        {/* Text overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-5 md:p-6">
          <h3 className="text-white text-sm md:text-base font-medium leading-snug line-clamp-3 mb-3">
            {renderText(article.title)}
          </h3>
          <div className="flex items-center justify-between">
            <span className="inline-flex items-center justify-center rounded-full px-4 py-1.5 text-xs font-medium border border-white/50 text-white">
              Read more
            </span>
            {article.date && (
              <span className="text-white/70 text-xs">{formatDateTime(article.date)}</span>
            )}
          </div>
        </div>
      </div>
    </a>
  )
}

const FeaturedPressCard: React.FC<{ article: PressArticle }> = ({ article }) => {
  const thumbnail = typeof article.thumbnail === 'object' ? (article.thumbnail as Media) : null

  return (
    <a
      href={article.externalUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="block rounded-2xl overflow-hidden group"
    >
      <div className="relative aspect-[16/7] md:aspect-[16/6]">
        {thumbnail?.url ? (
          <Image
            src={thumbnail.url}
            alt={thumbnail.alt || article.title || ''}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="100vw"
            priority
          />
        ) : (
          <div className="w-full h-full bg-[#d4c4b8]" />
        )}
        {/* Right-to-left gradient */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: 'linear-gradient(270deg, #A19085 0%, #A19085 20%, rgba(161, 144, 133, 0) 60%)' }}
        />
        {/* Text overlay — right side */}
        <div className="absolute inset-0 flex flex-col justify-center items-end p-6 md:p-10">
          <div className="max-w-sm">
            {article.date && (
              <p className="text-white/70 text-sm mb-2">{formatDateTime(article.date)}</p>
            )}
            <h2
              className="text-white text-xl md:text-2xl leading-snug mb-6"
              style={{ fontFamily: 'var(--font-roboto, Roboto, sans-serif)', fontWeight: 500 }}
            >
              {renderText(article.title)}
            </h2>
            <span className="inline-flex items-center justify-center rounded-full px-6 py-2.5 text-sm font-medium border-2 border-white text-white">
              Read more
            </span>
          </div>
        </div>
      </div>
    </a>
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

type Props = AllPressBlockType & {
  featuredArticle: PressArticle | null
  articles: PressArticle[]
  totalArticles: number
  perPage: number
}

export const AllPressBlockComponent: React.FC<Props> = ({
  featuredArticle,
  articles: initialArticles,
  totalArticles,
  perPage,
}) => {
  const [articles, setArticles] = useState(initialArticles)
  const [currentPage, setCurrentPage] = useState(1)
  const [loading, setLoading] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)
  const totalPages = Math.ceil(totalArticles / perPage)

  const goToPage = useCallback(
    async (page: number) => {
      if (page === currentPage || page < 1 || page > totalPages) return

      setLoading(true)
      try {
        const res = await fetch(
          `/api/press-articles?limit=${perPage}&page=${page}&sort=-date&depth=1&where[featured][not_equals]=true`,
        )
        const data = await res.json()
        setArticles(data.docs)
        setCurrentPage(page)
        sectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
      } catch (err) {
        console.error('Failed to fetch press articles:', err)
      } finally {
        setLoading(false)
      }
    },
    [currentPage, totalPages, perPage],
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
      {/* Featured article */}
      {featuredArticle && currentPage === 1 && (
        <>
          <h2
            className="text-xl md:text-2xl text-[#32312E] mb-6"
            style={{ fontFamily: 'var(--font-roboto, Roboto, sans-serif)', fontWeight: 500 }}
          >
            Featured
          </h2>
          <div className="mb-12">
            <FeaturedPressCard article={featuredArticle} />
          </div>
        </>
      )}

      {/* Recent News heading */}
      <h2
        className="text-xl md:text-2xl text-[#32312E] mb-6"
        style={{ fontFamily: 'var(--font-roboto, Roboto, sans-serif)', fontWeight: 500 }}
      >
        Recent News
      </h2>

      {/* Top pagination */}
      <div className="mb-8">
        <Pagination />
      </div>

      {/* Articles grid */}
      <div
        className={`grid grid-cols-1 md:grid-cols-3 gap-4 transition-opacity duration-300 ${loading ? 'opacity-40 pointer-events-none' : 'opacity-100'}`}
      >
        {articles.map((article) => (
          <PressCard key={article.id} article={article} />
        ))}
      </div>

      {/* Bottom pagination */}
      <div className="mt-8 md:mt-12">
        <Pagination />
      </div>
    </section>
  )
}
