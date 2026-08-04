import type { CollectionConfig } from 'payload'

import { authenticated } from '../../access/authenticated'
import { authenticatedOrPublished } from '../../access/authenticatedOrPublished'
import { Archive } from '../../blocks/ArchiveBlock/config'
import { CallToAction } from '../../blocks/CallToAction/config'
import { Content } from '../../blocks/Content/config'
import { FormBlock } from '../../blocks/Form/config'
import { MediaBlock } from '../../blocks/MediaBlock/config'
import { EventHero } from '../../blocks/EventHero/config'
import { BentoGrid } from '../../blocks/BentoGrid/config'
import { HighlightsBlock } from '../../blocks/HighlightsBlock/config'
import { SpeakersBlock } from '../../blocks/SpeakersBlock/config'
import { SpeakerHighlightBlock } from '../../blocks/SpeakerHighlightBlock/config'
import { StatsBlock } from '../../blocks/StatsBlock/config'
import { ProgramBlock } from '../../blocks/ProgramBlock/config'
import { PartnersBlock } from '../../blocks/PartnersBlock/config'
import { PromoBannerBlock } from '../../blocks/PromoBannerBlock/config'
import { PressBlock } from '../../blocks/PressBlock/config'
import { PageBannerBlock } from '../../blocks/PageBannerBlock/config'
import { GalleryBlock } from '../../blocks/GalleryBlock/config'
import { FullSpeakersBlock } from '../../blocks/FullSpeakersBlock/config'
import { EventHighlightsBlock } from '../../blocks/EventHighlightsBlock/config'
import { AboutBlock } from '../../blocks/AboutBlock/config'
import { EventAgendaBlock } from '../../blocks/EventAgendaBlock/config'
import { PartnersGridBlock } from '../../blocks/PartnersGridBlock/config'
import { PartnerCtaBlock } from '../../blocks/PartnerCtaBlock/config'
import { AllPostsBlock } from '../../blocks/AllPostsBlock/config'
import { TextCardBlock } from '../../blocks/TextCardBlock/config'
import { VenueHeroBlock } from '../../blocks/VenueHeroBlock/config'
import { VenueBentoBlock } from '../../blocks/VenueBentoBlock/config'
import { FullWidthImageBlock } from '../../blocks/FullWidthImageBlock/config'
import { LocationBlock } from '../../blocks/LocationBlock/config'
import { PartnerFormBlock } from '../../blocks/PartnerFormBlock/config'
import { ContactBlock } from '../../blocks/ContactBlock/config'
import { AllPressBlock } from '../../blocks/AllPressBlock/config'
import { CtaButtonBlock } from '../../blocks/CtaButtonBlock/config'
import { CtaBannerBlock } from '../../blocks/CtaBannerBlock/config'
import { FAQBlock } from '../../blocks/FAQBlock/config'
import { hero } from '@/heros/config'
import { slugField } from 'payload'
import { populatePublishedAt } from '../../hooks/populatePublishedAt'
import { generatePreviewPath } from '../../utilities/generatePreviewPath'
import { revalidateDelete, revalidatePage } from './hooks/revalidatePage'

import {
  MetaDescriptionField,
  MetaImageField,
  MetaTitleField,
  OverviewField,
  PreviewField,
} from '@payloadcms/plugin-seo/fields'

export const Pages: CollectionConfig<'pages'> = {
  slug: 'pages',
  access: {
    create: authenticated,
    delete: authenticated,
    read: authenticatedOrPublished,
    update: authenticated,
  },
  // This config controls what's populated by default when a page is referenced
  // https://payloadcms.com/docs/queries/select#defaultpopulate-collection-config-property
  // Type safe if the collection slug generic is passed to `CollectionConfig` - `CollectionConfig<'pages'>
  defaultPopulate: {
    title: true,
    slug: true,
  },
  admin: {
    defaultColumns: ['title', 'slug', 'updatedAt'],
    livePreview: {
      url: ({ data, req, locale }) =>
        generatePreviewPath({
          slug: data?.slug,
          collection: 'pages',
          req,
          locale: locale?.code,
        }),
    },
    preview: (data, { req, locale }) =>
      generatePreviewPath({
        slug: data?.slug as string,
        collection: 'pages',
        req,
        locale,
      }),
    useAsTitle: 'title',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      localized: true,
    },
    {
      type: 'tabs',
      tabs: [
        {
          fields: [hero],
          label: 'Hero',
        },
        {
          fields: [
            {
              name: 'layout',
              type: 'blocks',
              blocks: [EventHero, StatsBlock, BentoGrid, HighlightsBlock, SpeakersBlock, SpeakerHighlightBlock, FullSpeakersBlock, ProgramBlock, PartnersBlock, PartnersGridBlock, PartnerCtaBlock, PromoBannerBlock, PressBlock, PageBannerBlock, GalleryBlock, EventHighlightsBlock, AboutBlock, EventAgendaBlock, AllPostsBlock, TextCardBlock, CallToAction, Content, MediaBlock, Archive, FormBlock, VenueHeroBlock, VenueBentoBlock, FullWidthImageBlock, LocationBlock, PartnerFormBlock, ContactBlock, AllPressBlock, CtaButtonBlock, CtaBannerBlock],
              required: true,
              localized: true,
              admin: {
                initCollapsed: true,
              },
            },
          ],
          label: 'Content',
        },
        {
          name: 'meta',
          label: 'SEO',
          fields: [
            OverviewField({
              titlePath: 'meta.title',
              descriptionPath: 'meta.description',
              imagePath: 'meta.image',
            }),
            MetaTitleField({
              hasGenerateFn: true,
            }),
            MetaImageField({
              relationTo: 'media',
            }),

            MetaDescriptionField({}),
            PreviewField({
              // if the `generateUrl` function is configured
              hasGenerateFn: true,

              // field paths to match the target field for data
              titlePath: 'meta.title',
              descriptionPath: 'meta.description',
            }),
          ],
        },
      ],
    },
    {
      name: 'publishedAt',
      type: 'date',
      admin: {
        position: 'sidebar',
      },
    },
    slugField(),
  ],
  hooks: {
    afterChange: [revalidatePage],
    beforeChange: [populatePublishedAt],
    afterDelete: [revalidateDelete],
  },
  versions: {
    drafts: {
      schedulePublish: true,
    },
    maxPerDoc: 50,
  },
}
