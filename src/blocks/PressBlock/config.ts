import type { Block } from 'payload'

import { link } from '../../fields/link'

export const PressBlock: Block = {
  slug: 'pressBlock',
  interfaceName: 'PressBlock',
  labels: {
    singular: 'Press Block',
    plural: 'Press Blocks',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      defaultValue: 'Press about us',
      localized: true,
    },
    {
      name: 'description',
      type: 'textarea',
      localized: true,
    },
    {
      name: 'enableTopLink',
      type: 'checkbox',
      defaultValue: true,
    },
    link({
      overrides: {
        name: 'topLink',
        admin: {
          condition: (_data, siblingData) => Boolean(siblingData?.enableTopLink),
        },
      },
    }),
    {
      name: 'bottomCards',
      type: 'array',
      maxRows: 3,
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
          localized: true,
        },
        {
          name: 'description',
          type: 'text',
          localized: true,
        },
        link(),
      ],
      admin: {
        initCollapsed: true,
        description: 'Cards shown below the press grid (e.g. "Previous edition", "Blog")',
      },
    },
  ],
}
