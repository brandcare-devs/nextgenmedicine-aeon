import type { GlobalConfig } from 'payload'

import { link } from '@/fields/link'
import { revalidateHeader } from './hooks/revalidateHeader'

export const Header: GlobalConfig = {
  slug: 'header',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'navItems',
      type: 'array',
      fields: [
        link({
          appearances: false,
        }),
        {
          name: 'children',
          type: 'array',
          label: 'Dropdown items',
          fields: [
            link({
              appearances: false,
            }),
          ],
          admin: {
            initCollapsed: true,
            description: 'Sub-navigation items shown in a dropdown menu.',
          },
        },
      ],
      maxRows: 8,
      admin: {
        initCollapsed: true,
        components: {
          RowLabel: '@/Header/RowLabel#RowLabel',
        },
      },
    },
    {
      name: 'ctaButtons',
      type: 'array',
      label: 'CTA Buttons',
      fields: [
        link({
          appearances: ['default', 'outline'],
        }),
      ],
      maxRows: 3,
      admin: {
        initCollapsed: true,
        description: 'Call-to-action buttons displayed on the right side of the header.',
      },
    },
  ],
  hooks: {
    afterChange: [revalidateHeader],
  },
}
