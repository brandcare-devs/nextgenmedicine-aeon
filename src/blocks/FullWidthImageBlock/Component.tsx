import React from 'react'
import Image from '@/components/NextImage'

import type { Media } from '@/payload-types'

type Props = {
  image: Media | string
}

export const FullWidthImageBlockComponent: React.FC<Props> = ({ image }) => {
  const img = typeof image === 'object' ? image : null

  if (!img?.url) return null

  return (
    <div className="container">
      <div className="relative overflow-hidden rounded-2xl" style={{ aspectRatio: '16 / 7' }}>
        <Image
          src={img.url}
          alt={img.alt || ''}
          fill
          className="object-cover"
          sizes="100vw"
        />
      </div>
    </div>
  )
}
