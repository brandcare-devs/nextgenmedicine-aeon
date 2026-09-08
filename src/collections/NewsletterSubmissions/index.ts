import type { CollectionConfig } from 'payload'
import { createSubmissionNotificationHook } from '../../utilities/createSubmissionNotificationHook'

export const NewsletterSubmissions: CollectionConfig = {
  slug: 'newsletter-submissions',
  labels: {
    singular: 'Newsletter Submission',
    plural: 'Newsletter Submissions',
  },
  access: {
    create: () => true,
    read: ({ req: { user } }) => Boolean(user),
    update: ({ req: { user } }) => Boolean(user),
    delete: ({ req: { user } }) => Boolean(user),
  },
  admin: {
    defaultColumns: ['email', 'createdAt'],
    useAsTitle: 'email',
  },
  hooks: {
    afterChange: [
      createSubmissionNotificationHook({
        subject: 'New Newsletter Signup',
        fields: [{ label: 'Email', key: 'email' }],
      }),
    ],
  },
  fields: [{ name: 'email', type: 'email', required: true, unique: true }],
}