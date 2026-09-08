import type { CollectionConfig } from 'payload'
import { partnerTypeOptions } from '../../blocks/PartnerFormBlock/options'
import { createSubmissionNotificationHook } from '../../utilities/createSubmissionNotificationHook'

export const PartnershipSubmissions: CollectionConfig = {
  slug: 'partnership-submissions',
  labels: {
    singular: 'Partnership Submission',
    plural: 'Partnership Submissions',
  },
  access: {
    create: () => true,
    read: ({ req: { user } }) => Boolean(user),
    update: ({ req: { user } }) => Boolean(user),
    delete: ({ req: { user } }) => Boolean(user),
  },
  admin: {
    defaultColumns: ['firstName', 'lastName', 'email', 'type', 'createdAt'],
    useAsTitle: 'email',
  },
  hooks: {
    afterChange: [
      createSubmissionNotificationHook({
        subject: 'New Partnership Form Submission',
        fields: [
          { label: 'First Name', key: 'firstName' },
          { label: 'Last Name', key: 'lastName' },
          { label: 'Email', key: 'email' },
          { label: 'Company Name', key: 'companyName' },
          { label: 'Partnership Type', key: 'type' },
          { label: 'Message', key: 'message' },
        ],
      }),
    ],
  },
  fields: [
    {
      type: 'row',
      fields: [
        { name: 'firstName', type: 'text', required: true },
        { name: 'lastName', type: 'text', required: true },
      ],
    },
    { name: 'email', type: 'email', required: true },
    { name: 'companyName', type: 'text', required: true },
    { name: 'type', type: 'select', options: [...partnerTypeOptions] },
    { name: 'message', type: 'textarea' },
  ],
}