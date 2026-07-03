import React from 'react'
import { getPayload } from 'payload'
import configPromise from '@payload-config'

import type { AllPostsBlockType } from '@/payload-types'
import { AllPostsBlockComponent } from './Component'

type Props = AllPostsBlockType & {
  className?: string
  locale?: string
}

export const AllPostsBlock: React.FC<Props> = async ({ locale, ...props }) => {
  const payload = await getPayload({ config: configPromise })
  const perPage = props.perPage || 6

  // Fetch featured post
  const { docs: featuredDocs } = await payload.find({
    collection: 'posts',
    limit: 1,
    locale: (locale as 'en' | 'ar') || 'en',
    depth: 1,
    sort: '-publishedAt',
    where: {
      featured: { equals: true },
      _status: { equals: 'published' },
    },
  })

  // Fetch first page of non-featured posts
  const { docs: posts, totalDocs } = await payload.find({
    collection: 'posts',
    limit: perPage,
    page: 1,
    locale: (locale as 'en' | 'ar') || 'en',
    depth: 1,
    sort: '-publishedAt',
    where: {
      featured: { not_equals: true },
      _status: { equals: 'published' },
    },
  })

  return (
    <AllPostsBlockComponent
      {...props}
      featuredPost={featuredDocs[0] || null}
      posts={posts}
      totalPosts={totalDocs}
      perPage={perPage}
      locale={(locale as string) || 'en'}
    />
  )
}
