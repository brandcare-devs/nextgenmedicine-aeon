import type { CollectionConfig } from 'payload'

import { anyone } from '../access/anyone'
import { authenticated } from '../access/authenticated'
import { revalidateAllAfterChange, revalidateAllAfterDelete } from '../hooks/revalidateAll'

export const PressArticles: CollectionConfig = {
  slug: 'press-articles',
  access: {
    create: authenticated,
    delete: authenticated,
    read: anyone,
    update: authenticated,
  },
  admin: {
    useAsTitle: 'title',
  },
  hooks: {
    afterChange: [revalidateAllAfterChange],
    afterDelete: [revalidateAllAfterDelete],
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      localized: true,
    },
    {
      name: 'publicationName',
      type: 'text',
      required: true,
      admin: {
        description: 'e.g. "Gulf Today", "Khaleej Times"',
      },
    },
    {
      name: 'publicationLogo',
      type: 'upload',
      relationTo: 'media',
      required: true,
      admin: {
        description: 'Publication logo (transparent PNG)',
      },
    },
    {
      name: 'externalUrl',
      type: 'text',
      required: true,
      admin: {
        description: 'Link to the external press article',
      },
    },
    {
      name: 'date',
      type: 'date',
      required: true,
    },
    {
      name: 'thumbnail',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'featured',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        position: 'sidebar',
        description: 'Show this article as the featured press article.',
      },
    },
  ],
}
