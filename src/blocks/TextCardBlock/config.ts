import type { Block } from 'payload'

export const TextCardBlock: Block = {
  slug: 'textCardBlock',
  interfaceName: 'TextCardBlock',
  labels: {
    singular: 'Text Card',
    plural: 'Text Cards',
  },
  fields: [
    {
      name: 'heading',
      type: 'text',
      required: true,
      localized: true,
    },
    {
      name: 'body',
      type: 'textarea',
      required: true,
      localized: true,
      admin: {
        description: 'Paragraphs separated by blank lines',
      },
    },
  ],
}
