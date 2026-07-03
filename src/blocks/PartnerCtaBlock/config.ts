import type { Block } from 'payload'

import { link } from '../../fields/link'

export const PartnerCtaBlock: Block = {
  slug: 'partnerCtaBlock',
  interfaceName: 'PartnerCtaBlockType',
  labels: {
    singular: 'Partner CTA Block',
    plural: 'Partner CTA Blocks',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      localized: true,
      defaultValue: 'Become a Partner',
    },
    {
      name: 'description',
      type: 'textarea',
      localized: true,
    },
    link({
      appearances: false,
    }),
  ],
}
