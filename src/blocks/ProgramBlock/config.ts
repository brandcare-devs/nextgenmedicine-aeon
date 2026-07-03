import type { Block } from 'payload'

import { linkGroup } from '../../fields/linkGroup'

export const ProgramBlock: Block = {
  slug: 'programBlock',
  interfaceName: 'ProgramBlock',
  labels: {
    singular: 'Program Block',
    plural: 'Program Blocks',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      defaultValue: 'Program Overview',
      localized: true,
    },
    {
      name: 'description',
      type: 'textarea',
      localized: true,
    },
    {
      name: 'backgroundImage',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'tabs',
      type: 'array',
      required: true,
      minRows: 1,
      fields: [
        {
          name: 'label',
          type: 'text',
          required: true,
          localized: true,
        },
        {
          name: 'themeTitle',
          type: 'text',
          localized: true,
        },
        {
          name: 'items',
          type: 'array',
          fields: [
            {
              name: 'text',
              type: 'textarea',
              required: true,
              localized: true,
            },
          ],
        },
      ],
      admin: {
        initCollapsed: true,
      },
    },
    linkGroup({
      appearances: ['default', 'outline'],
      overrides: {
        maxRows: 3,
      },
    }),
  ],
}
