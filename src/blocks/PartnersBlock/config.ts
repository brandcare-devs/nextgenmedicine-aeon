import type { Block } from 'payload'

import { link } from '../../fields/link'

export const PartnersBlock: Block = {
  slug: 'partnersBlock',
  interfaceName: 'PartnersBlock',
  labels: {
    singular: 'Partners Block',
    plural: 'Partners Blocks',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      defaultValue: 'Partners',
      localized: true,
    },
    {
      name: 'description',
      type: 'textarea',
      localized: true,
    },
    {
      name: 'partnershipTypes',
      type: 'relationship',
      relationTo: 'partnership-types',
      hasMany: true,
      required: true,
      admin: {
        description: 'Which types of partners to display in the main grid.',
      },
    },
    {
      name: 'enableCTA',
      type: 'checkbox',
      defaultValue: true,
      label: 'Show "Become a Partner" CTA card',
    },
    link({
      overrides: {
        admin: {
          condition: (_data, siblingData) => Boolean(siblingData?.enableCTA),
        },
      },
    }),
    {
      name: 'strategicPartnersHeading',
      type: 'text',
      defaultValue: 'Strategic Partners',
      localized: true,
      admin: { hidden: true },
    },
    {
      name: 'strategicPartners',
      type: 'relationship',
      relationTo: 'partners',
      hasMany: true,
      admin: { hidden: true },
    },
    {
      name: 'poweredByText',
      type: 'text',
      defaultValue: 'Powered by',
      localized: true,
      admin: { hidden: true },
    },
    {
      name: 'poweredByLogo',
      type: 'upload',
      relationTo: 'media',
      admin: { hidden: true },
    },
  ],
}
