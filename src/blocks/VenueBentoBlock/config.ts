import type { Block } from 'payload'


export const VenueBentoBlock: Block = {
  slug: 'venueBentoBlock',
  interfaceName: 'VenueBentoBlockType',
  labels: {
    singular: 'Venue Bento Grid',
    plural: 'Venue Bento Grids',
  },
  fields: [
    {
      name: 'cards',
      type: 'array',
      required: true,
      minRows: 1,
      admin: {
        initCollapsed: true,
      },
      fields: [
        {
          name: 'colSpan',
          type: 'select',
          required: true,
          defaultValue: '2',
          options: [
            { label: '1 Column', value: '1' },
            { label: '2 Columns', value: '2' },
            { label: '3 Columns', value: '3' },
          ],
        },
        {
          name: 'cardType',
          type: 'select',
          required: true,
          defaultValue: 'imageOnly',
          options: [
            { label: 'Image with Gradient + Text', value: 'imageWithGradient' },
            { label: 'Image Only', value: 'imageOnly' },
            { label: 'Image with Text', value: 'imageWithText' },
            { label: 'Text Only', value: 'textOnly' },
          ],
        },
        {
          name: 'backgroundImage',
          type: 'upload',
          relationTo: 'media',
          admin: {
            condition: (_, siblingData) => siblingData?.cardType !== 'textOnly',
          },
        },
        {
          name: 'title',
          type: 'text',
          localized: true,
          admin: {
            condition: (_, siblingData) =>
              siblingData?.cardType !== 'imageOnly',
          },
        },
        {
          name: 'description',
          type: 'textarea',
          localized: true,
          admin: {
            condition: (_, siblingData) =>
              siblingData?.cardType !== 'imageOnly',
          },
        },

      ],
    },
  ],
}
