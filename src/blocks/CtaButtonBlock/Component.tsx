'use client'

import React from 'react'
import type { CtaButtonBlockType } from '@/payload-types'
import { CMSLink } from '@/components/Link'

type Props = CtaButtonBlockType & {
  className?: string
}

const alignmentClasses = {
  left: 'justify-start',
  center: 'justify-center',
  right: 'justify-end',
}

export const CtaButtonBlockComponent: React.FC<Props> = ({ link, alignment = 'center' }) => {
  if (!link) return null

  const isOutline = link.appearance === 'outline'

  return (
    <div className="container">
      <div className={`flex ${alignmentClasses[alignment as keyof typeof alignmentClasses] || 'justify-center'}`}>
        <CMSLink
          {...link}
          appearance="inline"
          className={`inline-flex items-center justify-center rounded-full px-7 py-2.5 text-sm font-medium tracking-wide whitespace-nowrap transition-colors ${
            isOutline
              ? 'border-2 border-[#32312E] text-[#32312E] hover:opacity-70'
              : 'bg-[linear-gradient(270deg,#32312E_0%,#745D4D_20.52%,#BC8D6C_100%)] text-white hover:opacity-90'
          }`}
        />
      </div>
    </div>
  )
}
