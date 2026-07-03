import type { Block } from 'payload'

export const FullWidthImageBlock: Block = {
  slug: 'fullWidthImageBlock',
  interfaceName: 'FullWidthImageBlockType',
  labels: {
    singular: 'Full Width Image',
    plural: 'Full Width Images',
  },
  fields: [
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
  ],
}
