import type { Block } from 'payload'

import { partnerTypeOptions } from './options'

export const PartnerFormBlock: Block = {
  slug: 'partnerFormBlock',
  interfaceName: 'PartnerFormBlockType',
  labels: {
    singular: 'Partner Form Block',
    plural: 'Partner Form Blocks',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      localized: true,
      defaultValue: 'Become a Partner',
    },
    {
      name: 'subtitle',
      type: 'textarea',
      localized: true,
    },
    {
      type: 'row',
      fields: [
        {
          name: 'descriptionLeft',
          type: 'textarea',
          localized: true,
          admin: { width: '50%' },
        },
        {
          name: 'descriptionRight',
          type: 'textarea',
          localized: true,
          admin: { width: '50%' },
        },
      ],
    },
    {
      name: 'formTitle',
      type: 'text',
      localized: true,
      defaultValue: 'Fill out the Form',
    },
    {
      name: 'types',
      type: 'array',
      required: true,
      minRows: 1,
      admin: {
        initCollapsed: true,
        description: 'Configure benefits text for each partnership type.',
      },
      fields: [
        {
          name: 'value',
          type: 'select',
          required: true,
          options: [...partnerTypeOptions],
        },
        {
          name: 'benefitsTitle',
          type: 'text',
          localized: true,
          required: true,
        },
        {
          name: 'benefitsDescription',
          type: 'textarea',
          localized: true,
        },
      ],
    },
    {
      name: 'submitButtonText',
      type: 'text',
      localized: true,
      defaultValue: 'Become a Partner',
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
      defaultValue: 'Your partnership inquiry has been submitted. We will be in touch shortly.',
    },
  ],
}
