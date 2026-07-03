import React from 'react'
import { getPayload } from 'payload'
import configPromise from '@payload-config'

import type { AllPressBlockType } from '@/payload-types'
import { AllPressBlockComponent } from './Component'

type Props = AllPressBlockType & {
  className?: string
  locale?: string
}

export const AllPressBlock: React.FC<Props> = async ({ locale, ...props }) => {
  const payload = await getPayload({ config: configPromise })
  const perPage = props.perPage || 6

  const { docs: featuredDocs } = await payload.find({
    collection: 'press-articles',
    limit: 1,
    depth: 1,
    sort: '-date',
    where: {
      featured: { equals: true },
    },
  })

  const { docs: articles, totalDocs } = await payload.find({
    collection: 'press-articles',
    limit: perPage,
    page: 1,
    depth: 1,
    sort: '-date',
    where: {
      featured: { not_equals: true },
    },
  })

  return (
    <AllPressBlockComponent
      {...props}
      featuredArticle={featuredDocs[0] || null}
      articles={articles}
      totalArticles={totalDocs}
      perPage={perPage}
    />
  )
}
