import type { Block } from 'payload'

export const FAQBlock: Block = {
  slug: 'faqBlock',
  labels: {
    singular: 'FAQ Block',
    plural: 'FAQ Blocks',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      label: 'Section Title',
      required: true,
    },
    {
      name: 'subtitle',
      type: 'text',
      label: 'Subtitle',
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'Description',
    },
    {
      name: 'faqs',
      type: 'array',
      label: 'FAQ Items',
      minRows: 1,
      fields: [
        {
          name: 'question',
          type: 'text',
          required: true,
        },
        {
          name: 'answer',
          type: 'richText',
          required: true,
        },
        {
          name: 'defaultOpen',
          type: 'checkbox',
          label: 'Open by Default',
          defaultValue: false,
        },
      ],
    },
  ],
}