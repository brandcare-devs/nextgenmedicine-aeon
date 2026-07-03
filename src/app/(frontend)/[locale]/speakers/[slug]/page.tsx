import type { Metadata } from 'next'

import { PayloadRedirects } from '@/components/PayloadRedirects'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { draftMode } from 'next/headers'
import React, { cache } from 'react'
import Image from '@/components/NextImage'
import Link from 'next/link'

import { RenderBlocks } from '@/blocks/RenderBlocks'
import { renderText } from '@/utilities/renderText'
import type { Page } from '@/payload-types'
import { LivePreviewListener } from '@/components/LivePreviewListener'
import type { Locale } from '@/i18n/config'
import { locales } from '@/i18n/config'
import type { Speaker, Media } from '@/payload-types'
import { FullSpeakersBlock } from '@/blocks/FullSpeakersBlock'

export async function generateStaticParams() {
  const payload = await getPayload({ config: configPromise })
  const speakers = await payload.find({
    collection: 'speakers',
    draft: false,
    limit: 1000,
    overrideAccess: false,
    pagination: false,
    select: {
      slug: true,
    },
  })

  return locales.flatMap((locale) =>
    speakers.docs
      .filter((doc) => doc.slug)
      .map(({ slug }) => ({ locale, slug })),
  )
}

type Args = {
  params: Promise<{
    locale: Locale
    slug: string
  }>
}

export default async function SpeakerPage({ params: paramsPromise }: Args) {
  const { isEnabled: draft } = await draftMode()
  const { locale, slug } = await paramsPromise
  const decodedSlug = decodeURIComponent(slug)
  const url = '/speakers/' + decodedSlug
  const speaker = await querySpeakerBySlug({ slug: decodedSlug, locale })

  if (!speaker) return <PayloadRedirects url={url} />

  const photo =
    typeof speaker.photo === 'object' && speaker.photo !== null
      ? (speaker.photo as Media)
      : null

  return (
    <article className="pt-20 lg:pt-24 pb-16">
      <PayloadRedirects disableNotFound url={url} />
      {draft && <LivePreviewListener />}

      <div className="container max-w-6xl mx-auto">
        {/* Hero row: back button inline with photo top + photo + name card */}
        <div className="flex flex-col md:flex-row gap-4 mb-8 md:items-end">
          {/* Photo column with overlaid back button */}
          <div className="relative md:w-[55%]">
            <Link
              href={`/${locale}/speakers`}
              className="absolute top-3 left-3 z-10 inline-flex items-center justify-center w-10 h-10 rounded-full bg-white shadow-sm hover:shadow-md transition-shadow"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#BC8D6C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M19 12H5M12 19l-7-7 7-7" />
              </svg>
            </Link>

            {photo && (
              <div className="aspect-[3/4] md:aspect-[4/5] relative rounded-2xl overflow-hidden">
                <Image
                  src={photo.url || ''}
                  alt={photo.alt || speaker.name}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover"
                  priority
                />
              </div>
            )}
          </div>

          {/* Name + title card — short, all rounded corners */}
          <div className="flex-1 bg-[#f5f0eb] rounded-2xl p-6 md:p-8 flex items-end">
            <div>
              <h1 className="text-2xl md:text-3xl font-light text-gray-900 mb-2">
                {renderText(speaker.name)}
              </h1>
              <p className="text-gray-700 text-sm leading-relaxed whitespace-pre-line">
                {renderText(speaker.title || '')}
              </p>
            </div>
          </div>
        </div>

        {/* Long bio — two columns on desktop */}
        {speaker.longBio && (
          <div className="bg-[#f5f0eb] rounded-2xl p-6 md:p-10 mb-8">
            <div className="columns-1 md:columns-2 gap-10 text-gray-700 text-sm md:text-[15px] leading-relaxed whitespace-pre-line">
              {renderText(speaker.longBio)}
            </div>
          </div>
        )}
      </div>

      {/* Layout blocks */}
      {speaker.layout && speaker.layout.length > 0 && (
        <div className="mb-8">
          <RenderBlocks blocks={speaker.layout as Page['layout'][0][]} />
        </div>
      )}

      {/* All speakers grid */}
      <div className="mt-12 mb-8">
        <FullSpeakersBlock
          blockType="fullSpeakersBlock"
          heading="All Speakers"
          locale={locale}
        />
      </div>
    </article>
  )
}

export async function generateMetadata({ params: paramsPromise }: Args): Promise<Metadata> {
  const { locale, slug } = await paramsPromise
  const decodedSlug = decodeURIComponent(slug)
  const speaker = await querySpeakerBySlug({ slug: decodedSlug, locale })

  if (!speaker) return {}

  return {
    title: `${speaker.name} — Next Generation Medicine`,
    description: speaker.bio || speaker.title,
  }
}

const querySpeakerBySlug = cache(async ({ slug, locale }: { slug: string; locale: Locale }) => {
  const { isEnabled: draft } = await draftMode()

  const payload = await getPayload({ config: configPromise })

  const result = await payload.find({
    collection: 'speakers',
    draft,
    limit: 1,
    locale,
    overrideAccess: draft,
    pagination: false,
    where: {
      slug: {
        equals: slug,
      },
    },
  })

  return result.docs?.[0] || null
})
