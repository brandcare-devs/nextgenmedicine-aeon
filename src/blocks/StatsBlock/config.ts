import type { Block } from 'payload'

export const StatsBlock: Block = {
  slug: 'statsBlock',
  interfaceName: 'StatsBlockType',
  labels: {
    singular: 'Stats Block',
    plural: 'Stats Blocks',
  },
  fields: [
    {
      name: 'heading',
      type: 'text',
      label: 'Heading',
      localized: true,
      admin: {
        placeholder: 'e.g. Shaping the Future of Longevity & Regenerative Medicine',
      },
    },
    {
      name: 'stats',
      type: 'array',
      label: 'Stats',
      minRows: 1,
      maxRows: 8,
      fields: [
        {
          name: 'value',
          type: 'text',
          label: 'Value',
          required: true,
          admin: {
            placeholder: 'e.g. 65%',
          },
        },
        {
          name: 'label',
          type: 'text',
          label: 'Label',
          localized: true,
          required: true,
          admin: {
            placeholder: 'e.g. HEALTHCARE PROFESSIONALS',
          },
        },
      ],
    },
  ],
}
