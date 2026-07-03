import type { Block } from 'payload'

export const ContactBlock: Block = {
  slug: 'contactBlock',
  interfaceName: 'ContactBlockType',
  labels: {
    singular: 'Contact Block',
    plural: 'Contact Blocks',
  },
  fields: [
    {
      name: 'detailsTitle',
      type: 'text',
      required: true,
      localized: true,
      defaultValue: 'Contact details',
    },
    {
      name: 'detailsDescription',
      type: 'textarea',
      localized: true,
    },
    {
      name: 'address',
      type: 'textarea',
      localized: true,
    },
    {
      name: 'phone',
      type: 'text',
    },
    {
      name: 'email',
      type: 'text',
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'formTitle',
      type: 'text',
      localized: true,
      defaultValue: 'Contact form',
    },
    {
      name: 'submitButtonText',
      type: 'text',
      localized: true,
      defaultValue: 'Send a message',
    },
    {
      name: 'successTitle',
      type: 'text',
      localized: true,
      defaultValue: 'Thank you!',
    },
    {
      name: 'successMessage',
      type: 'textarea',
      localized: true,
      defaultValue: 'Your message has been received. We\'ll be in touch shortly.',
    },
  ],
}
