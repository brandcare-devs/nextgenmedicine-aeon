import React from 'react'
import { getPayload } from 'payload'
import configPromise from '@payload-config'

import type { PartnersGridBlockType, PartnershipType } from '@/payload-types'
import { PartnersGridBlockComponent } from './Component'

type Props = PartnersGridBlockType & {
  className?: string
  locale?: string
}

export const PartnersGridBlock: React.FC<Props> = async ({ locale, ...props }) => {
  const payload = await getPayload({ config: configPromise })
  const loc = (locale as 'en' | 'ar') || 'en'

  // Resolve selected type IDs from the block config
  const selectedTypeIds: number[] = (props.partnershipTypes ?? [])
    .map((t) => (typeof t === 'object' && t !== null ? (t as PartnershipType).id : t))
    .filter((id): id is number => typeof id === 'number')

  const [{ docs: allTypes }, { docs: allPartners }] = await Promise.all([
    payload.find({
      collection: 'partnership-types',
      limit: 50,
      locale: loc,
      sort: 'order',
    }),
    payload.find({
      collection: 'partners',
      limit: 200,
      depth: 1,
      locale: loc,
      sort: 'name',
    }),
  ])

  // Filter to only selected types if any are chosen, otherwise show all
  const displayTypes =
    selectedTypeIds.length > 0
      ? allTypes.filter((t) => selectedTypeIds.includes(t.id))
      : allTypes

  return (
    <PartnersGridBlockComponent
      {...props}
      displayedTypes={displayTypes}
      partners={allPartners}
    />
  )
}
