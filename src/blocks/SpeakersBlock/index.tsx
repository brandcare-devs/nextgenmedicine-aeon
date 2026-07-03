import React from 'react'
import { getPayload } from 'payload'
import configPromise from '@payload-config'

import type { SpeakersBlockType } from '@/payload-types'

import { SpeakersBlockComponent } from './Component'

type Props = SpeakersBlockType & {
  className?: string
  locale?: string
}

export const SpeakersBlock: React.FC<Props> = async ({ locale, ...props }) => {
  const payload = await getPayload({ config: configPromise })
  const resolvedLocale = (locale as 'en' | 'ar') || 'en'

  const selected = (props as { selectedSpeakers?: unknown }).selectedSpeakers
  const selectedIds = Array.isArray(selected)
    ? selected
        .map((s) => (typeof s === 'object' && s !== null ? (s as { id?: number }).id : s))
        .filter((v): v is number => typeof v === 'number')
    : []

  let speakers

  if (selectedIds.length > 0) {
    const { docs } = await payload.find({
      collection: 'speakers',
      limit: selectedIds.length,
      locale: resolvedLocale,
      where: {
        id: {
          in: selectedIds,
        },
      },
    })
    const byId = new Map(docs.map((d) => [d.id, d]))
    speakers = selectedIds.map((id) => byId.get(id)).filter((d): d is NonNullable<typeof d> => Boolean(d))
  } else {
    const { docs } = await payload.find({
      collection: 'speakers',
      limit: 50,
      locale: resolvedLocale,
      sort: 'order',
    })
    speakers = docs
  }

  return <SpeakersBlockComponent {...props} speakers={speakers} />
}
