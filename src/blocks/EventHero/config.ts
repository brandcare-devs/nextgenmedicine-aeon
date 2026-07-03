import type { Block } from 'payload'

import { link } from '@/fields/link'

export const EventHero: Block = {
  slug: 'eventHero',
  interfaceName: 'EventHeroBlock',
  labels: {
    singular: 'Event Hero',
    plural: 'Event Heroes',
  },
  fields: [
    {
      name: 'backgroundVideo',
      type: 'upload',
      relationTo: 'media',
      label: 'Background Video',
      admin: {
        description: 'Upload an .mp4 to use as the looping background video.',
      },
    },
    {
      name: 'subtitle',
      type: 'text',
      label: 'Subtitle',
      localized: true,
      admin: {
        placeholder: 'e.g. Future of Longevity',
      },
    },
    {
      name: 'poweredByLabel',
      type: 'text',
      label: 'Powered By Label',
      localized: true,
      defaultValue: 'Powered by',
    },
    {
      name: 'poweredByLogo',
      type: 'upload',
      relationTo: 'media',
      label: 'Powered By Logo',
    },
    {
      name: 'eventDate',
      type: 'text',
      label: 'Event Date Display Text',
      localized: true,
      required: true,
      admin: {
        placeholder: 'e.g. 7th – 10th November 2026',
      },
    },
    {
      name: 'venue',
      type: 'text',
      label: 'Venue',
      localized: true,
      required: true,
      admin: {
        placeholder: 'e.g. Atlantis The Royal, Dubai, UAE',
      },
    },
    {
      name: 'showCountdown',
      type: 'checkbox',
      label: 'Show Countdown',
      defaultValue: true,
    },
    {
      name: 'countdownDate',
      type: 'date',
      label: 'Countdown Target Date',
      admin: {
        date: {
          pickerAppearance: 'dayAndTime',
        },
        description: 'The countdown timer will count down to this date.',
        condition: (_, siblingData) => siblingData?.showCountdown,
      },
    },
    {
      name: 'countdownLabel',
      type: 'text',
      label: 'Countdown Label',
      localized: true,
      defaultValue: 'Early bird ticket sale',
      admin: {
        condition: (_, siblingData) => siblingData?.showCountdown,
      },
    },
    link({
      appearances: false,
      overrides: {
        name: 'ctaLink',
        label: 'CTA Button',
      },
    }),
  ],
}
