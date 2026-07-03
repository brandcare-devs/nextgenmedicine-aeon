import type { CollectionConfig } from 'payload'

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
  fields: [
    {
      name: 'email',
      type: 'email',
      required: true,
      unique: true,
    },
  ],
}
