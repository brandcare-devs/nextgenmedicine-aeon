import type { CollectionConfig } from 'payload'

import { anyone } from '../access/anyone'
import { authenticated } from '../access/authenticated'
import { revalidateAllAfterChange, revalidateAllAfterDelete } from '../hooks/revalidateAll'

export const Partners: CollectionConfig = {
  slug: 'partners',
  access: {
    create: authenticated,
    delete: authenticated,
    read: anyone,
    update: authenticated,
  },
  admin: {
    useAsTitle: 'name',
  },
  hooks: {
    afterChange: [revalidateAllAfterChange],
    afterDelete: [revalidateAllAfterDelete],
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      localized: true,
    },
    {
      name: 'logo',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'website',
      type: 'text',
      required: false,
      admin: {
        description:
          "Optional external link. If set, the partner's logo becomes clickable and opens this URL in a new tab.",
      },
    },
    {
      name: 'partnershipTypes',
      type: 'relationship',
      relationTo: 'partnership-types',
      hasMany: true,
      required: true,
      admin: {
        description: 'A company can hold multiple partnership types simultaneously.',
      },
    },
  ],
}
