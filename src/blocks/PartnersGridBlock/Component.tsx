'use client'

import React from 'react'
import Image from '@/components/NextImage'
import type { PartnersGridBlockType, Partner, PartnershipType, Media } from '@/payload-types'

type Props = PartnersGridBlockType & {
  displayedTypes: PartnershipType[]
  partners: Partner[]
  className?: string
}

export const PartnersGridBlockComponent: React.FC<Props> = ({
  heading,
  displayedTypes,
  partners,
}) => {
  if (!displayedTypes || displayedTypes.length === 0) return null

  return (
    <div className="container">
      {heading && (
        <h2 className="text-[#32312E] font-medium text-2xl mb-8">{heading}</h2>
      )}
      <div className="flex flex-col gap-12">
        {displayedTypes.map((type) => {
          const filtered = partners.filter(
            (p) =>
              Array.isArray(p.partnershipTypes) &&
              p.partnershipTypes.some((pt) => {
                const ptId = typeof pt === 'object' && pt !== null ? pt.id : pt
                return ptId === type.id
              }),
          )

          if (filtered.length === 0) return null

          return (
            <div key={type.id}>
              <h3 className="text-[#32312E] font-medium text-lg mb-4">{type.name}</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {filtered.map((partner) => {
                  const logo =
                    typeof partner.logo === 'object' ? (partner.logo as Media) : null
                  const image = logo?.url ? (
                    <Image
                      src={logo.url}
                      alt={partner.name || logo.alt || ''}
                      width={logo.width || 280}
                      height={logo.height || 160}
                      className="max-h-[140px] w-auto object-contain"
                    />
                  ) : null

                  return (
                    <div
                      key={partner.id}
                      className="bg-white rounded-2xl flex items-center justify-center py-4 px-8 aspect-[5/3]"
                    >
                      {image &&
                        (partner.website ? (
                          <a
                            href={partner.website}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={partner.name || undefined}
                            className="flex items-center justify-center transition-opacity hover:opacity-70"
                          >
                            {image}
                          </a>
                        ) : (
                          image
                        ))}
                    </div>
                  )
                })}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
