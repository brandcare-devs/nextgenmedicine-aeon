import type { Block } from 'payload'

import { link } from '../../fields/link'

export const SpeakersBlock: Block = {
  slug: 'speakersBlock',
  interfaceName: 'SpeakersBlockType',
  labels: {
    singular: 'Speakers Block',
    plural: 'Speakers Blocks',
  },
  fields: [
    {
      name: 'heading',
      type: 'text',
      localized: true,
      defaultValue: 'Speakers',
    },
    {
      name: 'selectedSpeakers',
      type: 'relationship',
      relationTo: 'speakers',
      hasMany: true,
      admin: {
        description:
          'Pick the speakers to feature and drag to reorder. Leave empty to show all speakers (sorted by their order field).',
      },
    },
    {
      name: 'description',
      type: 'textarea',
      localized: true,
      admin: {
        placeholder:
          'e.g. Influential Voices at Next-Generation Medicine 2026...',
      },
    },
    {
      name: 'enableLink',
      type: 'checkbox',
      label: 'Enable CTA Button',
    },
    link({
      appearances: ['default', 'outline'],
      overrides: {
        admin: {
          condition: (_data, siblingData) => Boolean(siblingData?.enableLink),
        },
      },
    }),
  ],
}
