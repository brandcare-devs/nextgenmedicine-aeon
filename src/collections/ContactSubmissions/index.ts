import type { CollectionConfig } from 'payload'
import { createSubmissionNotificationHook } from '../../utilities/createSubmissionNotificationHook'

export const ContactSubmissions: CollectionConfig = {
  slug: 'contact-submissions',
  labels: {
    singular: 'Contact Submission',
    plural: 'Contact Submissions',
  },
  access: {
    create: () => true,
    read: ({ req: { user } }) => Boolean(user),
    update: ({ req: { user } }) => Boolean(user),
    delete: ({ req: { user } }) => Boolean(user),
  },
  admin: {
    defaultColumns: ['firstName', 'lastName', 'email', 'createdAt'],
    useAsTitle: 'email',
  },
  hooks: {
    afterChange: [
      createSubmissionNotificationHook({
        subject: 'New Contact Form Submission',
        fields: [
          { label: 'First Name', key: 'firstName' },
          { label: 'Last Name', key: 'lastName' },
          { label: 'Email', key: 'email' },
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
    { name: 'message', type: 'textarea' },
  ],
}