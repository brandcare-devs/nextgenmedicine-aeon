import type { Block } from 'payload'

export const VenueHeroBlock: Block = {
  slug: 'venueHeroBlock',
  interfaceName: 'VenueHeroBlockType',
  labels: {
    singular: 'Venue Hero Block',
    plural: 'Venue Hero Blocks',
  },
  fields: [
    {
      name: 'backgroundImage',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'overlayImage',
      type: 'upload',
      relationTo: 'media',
      admin: {
        description: 'Logo or overlay image positioned on the left side of the hero.',
      },
    },
  ],
}
