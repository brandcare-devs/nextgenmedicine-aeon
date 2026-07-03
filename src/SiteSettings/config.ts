import type { GlobalConfig } from 'payload'

import { revalidateSiteSettings } from './hooks/revalidateSiteSettings'

export const SiteSettings: GlobalConfig = {
  slug: 'site-settings',
  label: 'Site Settings',
  access: {
    read: () => true,
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Default SEO',
          description:
            'Fallback values used when a page or post does not set its own SEO title, description, or image.',
          fields: [
            {
              name: 'seo',
              type: 'group',
              label: false,
              fields: [
                {
                  name: 'siteName',
                  type: 'text',
                  localized: true,
                  admin: { placeholder: 'Next Generation Medicine' },
                },
                {
                  name: 'defaultTitle',
                  type: 'text',
                  localized: true,
                  admin: {
                    placeholder: 'Next Generation Medicine',
                    description:
                      'Also used as the title suffix (e.g. "About Us - {siteName}").',
                  },
                },
                {
                  name: 'defaultDescription',
                  type: 'textarea',
                  localized: true,
                },
                {
                  name: 'defaultImage',
                  type: 'upload',
                  relationTo: 'media',
                  admin: {
                    description:
                      'Recommended 1200×630. Used as the Open Graph image when a page has no SEO image.',
                  },
                },
              ],
            },
          ],
        },
      ],
    },
  ],
  hooks: {
    afterChange: [revalidateSiteSettings],
  },
}
