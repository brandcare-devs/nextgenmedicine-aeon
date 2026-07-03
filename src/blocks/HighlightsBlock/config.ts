import type { Block } from 'payload'

import { link } from '../../fields/link'

export const HighlightsBlock: Block = {
  slug: 'highlightsBlock',
  interfaceName: 'HighlightsBlockType',
  labels: {
    singular: 'Highlights Block',
    plural: 'Highlights Blocks',
  },
  fields: [
    {
      name: 'heading',
      type: 'text',
      localized: true,
      admin: {
        placeholder: 'e.g. More than Congress. A Movement.',
      },
    },
    {
      name: 'cards',
      type: 'array',
      label: 'Highlight Cards',
      minRows: 1,
      maxRows: 8,
      admin: {
        initCollapsed: true,
      },
      fields: [
        {
          name: 'icon',
          type: 'upload',
          relationTo: 'media',
          required: true,
          admin: {
            description: 'SVG or small icon image',
          },
        },
        {
          name: 'title',
          type: 'text',
          required: true,
          localized: true,
        },
        {
          name: 'description',
          type: 'textarea',
          required: true,
          localized: true,
        },
      ],
    },
    {
      name: 'tagline',
      type: 'textarea',
      localized: true,
      admin: {
        placeholder:
          'e.g. Where science meets practice. Where innovation meets implementation.',
      },
    },
    {
      name: 'enableLink',
      type: 'checkbox',
      label: 'Enable CTA Button',
    },
    link({
      appearances: ['default', 'outline'],
      overrides: {
        admin: {
          condition: (_data, siblingData) => Boolean(siblingData?.enableLink),
        },
      },
    }),
  ],
}
