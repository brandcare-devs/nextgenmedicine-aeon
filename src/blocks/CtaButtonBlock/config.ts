import type { Block } from 'payload'

import { link } from '../../fields/link'

export const CtaButtonBlock: Block = {
  slug: 'ctaButtonBlock',
  interfaceName: 'CtaButtonBlockType',
  labels: {
    singular: 'CTA Button Block',
    plural: 'CTA Button Blocks',
  },
  fields: [
    link(),
    {
      name: 'alignment',
      type: 'select',
      defaultValue: 'center',
      options: [
        { label: 'Left', value: 'left' },
        { label: 'Center', value: 'center' },
        { label: 'Right', value: 'right' },
      ],
    },
  ],
}
