import type { Block } from 'payload'

import { link } from '../../fields/link'

export const CtaBannerBlock: Block = {
  slug: 'ctaBannerBlock',
  interfaceName: 'CtaBannerBlock',
  labels: {
    singular: 'CTA Banner',
    plural: 'CTA Banners',
  },
  fields: [
    {
      name: 'backgroundImage',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'title',
      type: 'textarea',
      required: true,
      localized: true,
      admin: {
        rows: 2,
        description: 'Use line breaks to wrap the title across multiple lines.',
      },
    },
    {
      name: 'subtitle',
      type: 'text',
      localized: true,
    },
    link({
      overrides: {
        name: 'ctaLink',
      },
    }),
  ],
}
