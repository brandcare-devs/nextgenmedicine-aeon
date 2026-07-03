import type { Block } from 'payload'

import { link } from '../../fields/link'
import { defaultLexical } from '../../fields/defaultLexical'

export const LocationBlock: Block = {
  slug: 'locationBlock',
  interfaceName: 'LocationBlockType',
  labels: {
    singular: 'Location Block',
    plural: 'Location Blocks',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      localized: true,
      defaultValue: 'How to get there?',
    },
    {
      name: 'description',
      type: 'textarea',
      localized: true,
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      required: true,
      admin: {
        description: 'Map or location image.',
      },
    },
    {
      name: 'imageLink',
      type: 'text',
      admin: {
        description: 'Link URL for the map image (e.g. Google Maps link).',
      },
    },
    {
      name: 'cards',
      type: 'array',
      maxRows: 3,
      admin: {
        initCollapsed: true,
      },
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
          localized: true,
        },
        {
          name: 'content',
          type: 'richText',
          localized: true,
          editor: defaultLexical,
        },
        {
          name: 'enableLink',
          type: 'checkbox',
          defaultValue: false,
          label: 'Enable Link',
        },
        link({
          appearances: false,
          overrides: {
            admin: {
              condition: (_, siblingData) => siblingData?.enableLink,
            },
          },
        }),
      ],
    },
  ],
}
