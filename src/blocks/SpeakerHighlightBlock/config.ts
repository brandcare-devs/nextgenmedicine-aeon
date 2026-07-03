import type { Block } from 'payload'

export const SpeakerHighlightBlock: Block = {
  slug: 'speakerHighlightBlock',
  interfaceName: 'SpeakerHighlightBlockType',
  labels: {
    singular: 'Speaker Highlight',
    plural: 'Speaker Highlights',
  },
  fields: [
    {
      name: 'speaker',
      type: 'relationship',
      relationTo: 'speakers',
      required: true,
    },
    {
      name: 'roleLabel',
      type: 'textarea',
      localized: true,
      admin: {
        description:
          "Optional override for the role shown under the speaker's name. Leave empty to use the speaker's default title.",
        rows: 2,
      },
    },
    {
      name: 'photoOverride',
      type: 'upload',
      relationTo: 'media',
      admin: {
        description: "Optional override for the speaker image. Leave empty to use the speaker's default photo.",
      },
    },
    {
      name: 'quote',
      type: 'textarea',
      required: true,
      localized: true,
      admin: {
        rows: 4,
      },
    },
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
