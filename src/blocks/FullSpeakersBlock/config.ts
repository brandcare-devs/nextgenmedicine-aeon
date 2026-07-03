import type { Block } from 'payload'

export const FullSpeakersBlock: Block = {
  slug: 'fullSpeakersBlock',
  interfaceName: 'FullSpeakersBlockType',
  labels: {
    singular: 'Full Speakers Grid',
    plural: 'Full Speakers Grids',
  },
  fields: [
    {
      name: 'heading',
      type: 'text',
      localized: true,
    },
    {
      name: 'description',
      type: 'textarea',
      localized: true,
    },
    {
      name: 'displayCategories',
      type: 'relationship',
      relationTo: 'speaker-categories',
      hasMany: true,
      admin: {
        description: 'Leave empty to show all categories.',
      },
    },
  ],
}
