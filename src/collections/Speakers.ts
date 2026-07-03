import type { CollectionConfig } from 'payload'
import { slugField } from 'payload'
import {
  BlocksFeature,
  FixedToolbarFeature,
  HeadingFeature,
  HorizontalRuleFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'

import { anyone } from '../access/anyone'
import { authenticated } from '../access/authenticated'
import { revalidateAllAfterChange, revalidateAllAfterDelete } from '../hooks/revalidateAll'
import { Banner } from '../blocks/Banner/config'
import { Code } from '../blocks/Code/config'
import { MediaBlock } from '../blocks/MediaBlock/config'
import { Content } from '../blocks/Content/config'
import { CallToAction } from '../blocks/CallToAction/config'

export const Speakers: CollectionConfig = {
  slug: 'speakers',
  access: {
    create: authenticated,
    delete: authenticated,
    read: anyone,
    update: authenticated,
  },
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'title', 'order', 'slug', 'updatedAt'],
  },
  hooks: {
    afterChange: [revalidateAllAfterChange],
    afterDelete: [revalidateAllAfterDelete],
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      localized: true,
    },
    {
      name: 'title',
      type: 'text',
      required: true,
      localized: true,
      admin: {
        description: 'e.g. "Executive Chairman & Founder AEON Clinic"',
      },
    },
    {
      name: 'photo',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'category',
      type: 'relationship',
      relationTo: 'speaker-categories',
      hasMany: true,
      admin: {
        description: 'Assign one or more categories to group this speaker in the speakers grid',
      },
    },
    {
      name: 'order',
      type: 'number',
      defaultValue: 0,
      admin: {
        description: 'Display order within category (lower numbers appear first)',
        position: 'sidebar',
      },
    },
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Details',
          fields: [
            {
              name: 'bio',
              type: 'textarea',
              localized: true,
              admin: {
                description: 'Short bio shown on the card flip (1-2 sentences)',
                rows: 3,
              },
            },
            {
              name: 'longBio',
              type: 'textarea',
              localized: true,
              label: 'Long Bio',
              admin: {
                description: 'Full biography shown on the speaker detail page',
                rows: 10,
              },
            },
            {
              name: 'linkedinUrl',
              type: 'text',
              label: 'LinkedIn URL',
              admin: {
                description: 'e.g. "https://linkedin.com/in/speaker-name"',
              },
            },
          ],
        },
        {
          label: 'Page Content',
          fields: [
            {
              name: 'layout',
              type: 'blocks',
              blocks: [Content, MediaBlock, CallToAction, Banner, Code],
              localized: true,
              admin: {
                initCollapsed: true,
                description: 'Build the speaker detail page content',
              },
            },
          ],
        },
      ],
    },
    slugField({ fieldToUse: 'name' }),
  ],
}
