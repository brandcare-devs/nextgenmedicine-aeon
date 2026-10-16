import type { Block } from 'payload'

export const HtmlBlock: Block = {
  slug: 'htmlBlock',
  interfaceName: 'HtmlBlockType',
  labels: {
    singular: 'HTML Block',
    plural: 'HTML Blocks',
  },
  fields: [
    {
      name: 'html',
      type: 'code',
      label: 'HTML',
      required: true,
      admin: {
        language: 'html',
        description: 'Raw HTML rendered as-is on the page. Only paste code you trust.',
      },
    },
  ],
}