import type { CollectionConfig } from 'payload'

import { partnerTypeOptions } from '../../blocks/PartnerFormBlock/options'

export const PartnershipSubmissions: CollectionConfig = {
  slug: 'partnership-submissions',
  labels: {
    singular: 'Partnership Submission',
    plural: 'Partnership Submissions',
  },
  access: {
    create: () => true, // Public can submit
    read: ({ req: { user } }) => Boolean(user), // Only authenticated users can view
    update: ({ req: { user } }) => Boolean(user),
    delete: ({ req: { user } }) => Boolean(user),
  },
  admin: {
    defaultColumns: ['firstName', 'lastName', 'email', 'type', 'createdAt'],
    useAsTitle: 'email',
  },
  fields: [
    {
      type: 'row',
      fields: [
        {
          name: 'firstName',
          type: 'text',
          required: true,
        },
        {
          name: 'lastName',
          type: 'text',
          required: true,
        },
      ],
    },
    {
      name: 'email',
      type: 'email',
      required: true,
    },
    {
      name: 'companyName',
      type: 'text',
      required: true,
    },
    {
      name: 'type',
      type: 'select',
      options: [...partnerTypeOptions],
    },
    {
      name: 'message',
      type: 'textarea',
    },
  ],
}
