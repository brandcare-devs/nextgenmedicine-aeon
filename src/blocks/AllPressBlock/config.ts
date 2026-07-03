import type { Block } from 'payload'

export const AllPressBlock: Block = {
  slug: 'allPressBlock',
  interfaceName: 'AllPressBlockType',
  labels: {
    singular: 'All Press Articles Grid',
    plural: 'All Press Articles Grids',
  },
  fields: [
    {
      name: 'perPage',
      type: 'number',
      defaultValue: 6,
      min: 3,
      max: 24,
      admin: {
        description: 'Number of articles per page (default 6)',
        step: 3,
      },
    },
  ],
}
