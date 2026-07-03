import type { Block } from 'payload'

export const PartnersGridBlock: Block = {
  slug: 'partnersGridBlock',
  interfaceName: 'PartnersGridBlockType',
  labels: {
    singular: 'Partners Grid Block',
    plural: 'Partners Grid Blocks',
  },
  fields: [
    {
      name: 'heading',
      type: 'text',
      localized: true,
      admin: { placeholder: 'e.g. Our Partners' },
    },
    {
      name: 'partnershipTypes',
      type: 'relationship',
      relationTo: 'partnership-types',
      hasMany: true,
      admin: {
        description: 'Select which partnership types to display. Each type will be shown as a separate section.',
      },
    },
  ],
}
