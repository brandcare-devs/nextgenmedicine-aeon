import React from 'react'
import { getPayload } from 'payload'
import configPromise from '@payload-config'

import type { PartnersBlock as PartnersBlockType } from '@/payload-types'

import { PartnersBlockComponent } from './Component'

type Props = PartnersBlockType & {
  className?: string
  locale?: string
}

export const PartnersBlock: React.FC<Props> = async ({ locale, ...props }) => {
  const payload = await getPayload({ config: configPromise })

  // Resolve selected type IDs (handles populated objects, raw IDs, and legacy string slugs)
  const rawTypes = props.partnershipTypes ?? []
  const typeIds: number[] = []

  for (const t of rawTypes) {
    if (typeof t === 'object' && t !== null) {
      typeIds.push(t.id)
    } else if (typeof t === 'number') {
      typeIds.push(t)
    } else if (typeof t === 'string') {
      const { docs } = await payload.find({
        collection: 'partnership-types',
        where: { slug: { equals: t } },
        limit: 1,
      })
      if (docs[0]) typeIds.push(docs[0].id)
    }
  }

  if (typeIds.length === 0) {
    return <PartnersBlockComponent {...props} partners={[]} />
  }

  const { docs: partners } = await payload.find({
    collection: 'partners',
    limit: 50,
    locale: (locale as 'en' | 'ar') || 'en',
    where: {
      partnershipTypes: {
        in: typeIds,
      },
    },
    sort: 'id',
  })

  return <PartnersBlockComponent {...props} partners={partners} />
}
