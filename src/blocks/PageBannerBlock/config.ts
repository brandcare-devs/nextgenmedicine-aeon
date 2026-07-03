import type { Block } from 'payload'

export const PageBannerBlock: Block = {
  slug: 'pageBannerBlock',
  interfaceName: 'PageBannerBlock',
  labels: {
    singular: 'Page Banner',
    plural: 'Page Banners',
  },
  fields: [
    {
      name: 'backgroundImage',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'subtitle',
      type: 'text',
      localized: true,
      admin: {
        description: 'e.g. "PREVIOUS EDITION"',
      },
    },
    {
      name: 'title',
      type: 'text',
      required: true,
      localized: true,
    },
  ],
}
