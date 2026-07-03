import type { GlobalConfig } from 'payload'

import { link } from '@/fields/link'
import { revalidateFooter } from './hooks/revalidateFooter'

export const Footer: GlobalConfig = {
  slug: 'footer',
  access: {
    read: () => true,
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Social & Newsletter',
          fields: [
            {
              name: 'socialLinks',
              type: 'array',
              label: 'Social Links',
              maxRows: 10,
              admin: { initCollapsed: true },
              fields: [
                {
                  name: 'platform',
                  type: 'select',
                  required: true,
                  options: [
                    { label: 'X (Twitter)', value: 'x' },
                    { label: 'Facebook', value: 'facebook' },
                    { label: 'LinkedIn', value: 'linkedin' },
                    { label: 'Instagram', value: 'instagram' },
                    { label: 'TikTok', value: 'tiktok' },
                    { label: 'YouTube', value: 'youtube' },
                  ],
                },
                {
                  name: 'url',
                  type: 'text',
                  required: true,
                  label: 'URL',
                },
              ],
            },
            {
              name: 'newsletterHeading',
              type: 'text',
              defaultValue: 'SIGN-UP FOR UPDATES',
              localized: true,
            },
            {
              name: 'newsletterPlaceholder',
              type: 'text',
              defaultValue: 'YOUR EMAIL HERE',
              localized: true,
            },
            {
              name: 'newsletterSuccessMessage',
              type: 'text',
              defaultValue: 'Thank you for subscribing!',
              localized: true,
            },
            {
              name: 'newsletterErrorMessage',
              type: 'text',
              defaultValue: 'Something went wrong. Please try again.',
              localized: true,
            },
          ],
        },
        {
          label: 'Navigation',
          fields: [
            {
              name: 'navItems',
              type: 'array',
              label: 'Footer Links',
              maxRows: 12,
              admin: {
                initCollapsed: true,
                components: {
                  RowLabel: '@/Footer/RowLabel#RowLabel',
                },
              },
              fields: [
                link({
                  appearances: false,
                }),
              ],
            },
          ],
        },
        {
          label: 'CTA & Legal',
          fields: [
            link({
              appearances: false,
              overrides: {
                name: 'ctaLink',
                label: 'CTA Button',
              },
            }),
            link({
              appearances: false,
              overrides: {
                name: 'termsLink',
                label: 'Terms & Conditions',
              },
            }),
            link({
              appearances: false,
              overrides: {
                name: 'privacyLink',
                label: 'Privacy Policy',
              },
            }),
            {
              name: 'copyright',
              type: 'text',
              defaultValue: '© NGM all right reserved 2023.',
              localized: true,
            },
            {
              name: 'contactEmailLabel',
              type: 'text',
              label: 'Contact Email Label',
              localized: true,
            },
            {
              name: 'contactEmailUrl',
              type: 'text',
              label: 'Contact Email URL',
              admin: {
                description: 'e.g. mailto:hello@example.com',
              },
            },
          ],
        },
      ],
    },
  ],
  hooks: {
    afterChange: [revalidateFooter],
  },
}
