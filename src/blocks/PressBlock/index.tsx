import React from 'react'
import { getPayload } from 'payload'
import configPromise from '@payload-config'

import type { PressBlock as PressBlockType } from '@/payload-types'

import { PressBlockComponent } from './Component'

type Props = PressBlockType & {
  className?: string
  locale?: string
}

export const PressBlock: React.FC<Props> = async ({ locale, ...props }) => {
  const payload = await getPayload({ config: configPromise })

  const { docs: articles } = await payload.find({
    collection: 'press-articles',
    limit: 12,
    locale: (locale as 'en' | 'ar') || 'en',
    sort: '-date',
  })

  return <PressBlockComponent {...props} articles={articles} />
}
