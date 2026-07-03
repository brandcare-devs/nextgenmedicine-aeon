import type { Block } from 'payload'

import { link } from '../../fields/link'

export const PromoBannerBlock: Block = {
  slug: 'promoBannerBlock',
  interfaceName: 'PromoBannerBlock',
  labels: {
    singular: 'Promo Banner',
    plural: 'Promo Banners',
  },
  fields: [
    {
      name: 'logo',
      type: 'upload',
      relationTo: 'media',
      admin: {
        description: 'Event logo (white, transparent PNG)',
      },
    },
    {
      name: 'dateText',
      type: 'text',
      required: true,
      localized: true,
      admin: {
        description: 'e.g. "7th – 10th November 2026"',
      },
    },
    {
      name: 'venueImage',
      type: 'upload',
      relationTo: 'media',
      admin: {
        description: 'Venue logo/name image (white, transparent PNG)',
      },
    },
    link({
      overrides: {
        name: 'ctaLink',
      },
    }),
  ],
}
