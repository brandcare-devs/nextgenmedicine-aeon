import React from 'react'
import { getPayload } from 'payload'
import configPromise from '@payload-config'

import type { FullSpeakersBlockType } from '@/payload-types'

import { FullSpeakersBlockComponent } from './Component'

type Props = FullSpeakersBlockType & {
  className?: string
  locale?: string
}

export const FullSpeakersBlock: React.FC<Props> = async ({ locale, ...props }) => {
  const payload = await getPayload({ config: configPromise })
  const loc = (locale as 'en' | 'ar') || 'en'

  const [{ docs: allSpeakers }, { docs: allCategories }] = await Promise.all([
    payload.find({
      collection: 'speakers',
      limit: 500,
      locale: loc,
      sort: 'order',
      depth: 2,
    }),
    payload.find({
      collection: 'speaker-categories',
      limit: 100,
      locale: loc,
      sort: 'order',
    }),
  ])

  const selectedIds = (props.displayCategories || [])
    .map((c) => (typeof c === 'object' && c !== null ? c.id : c))
    .filter((id): id is number => id != null)

  const hasFilter = selectedIds.length > 0
  const categories = hasFilter
    ? allCategories.filter((cat) => selectedIds.includes(cat.id))
    : allCategories
  const speakers = hasFilter
    ? allSpeakers.filter((s) => {
        const cats = Array.isArray(s.category) ? s.category : []
        return cats.some((c) => {
          const catId = typeof c === 'object' && c !== null ? c.id : c
          return selectedIds.includes(catId as number)
        })
      })
    : allSpeakers

  return (
    <FullSpeakersBlockComponent
      {...props}
      speakers={speakers}
      categories={categories}
      locale={loc}
    />
  )
}
