import type { Block } from 'payload'

import { link } from '../../fields/link'

export const EventHighlightsBlock: Block = {
  slug: 'eventHighlightsBlock',
  interfaceName: 'EventHighlightsBlockType',
  labels: {
    singular: 'Event Highlights Block',
    plural: 'Event Highlights Blocks',
  },
  fields: [
    {
      name: 'heading',
      type: 'text',
      required: true,
      localized: true,
      admin: {
        placeholder: 'e.g. 2025 Highlights',
      },
    },
    {
      name: 'bulletPoints',
      type: 'array',
      label: 'Bullet Points',
      minRows: 1,
      maxRows: 10,
      fields: [
        {
          name: 'text',
          type: 'text',
          required: true,
          localized: true,
        },
      ],
    },
    {
      name: 'featuredImage',
      type: 'upload',
      relationTo: 'media',
      required: true,
      label: 'Featured Image (top right)',
    },
    {
      name: 'galleryImages',
      type: 'array',
      label: 'Gallery Images (bottom row)',
      minRows: 1,
      maxRows: 8,
      fields: [
        {
          name: 'media',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
      ],
      admin: {
        initCollapsed: true,
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
