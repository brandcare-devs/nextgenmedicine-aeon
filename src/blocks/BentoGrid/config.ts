import type { Block } from 'payload'

import { link } from '../../fields/link'

export const BentoGrid: Block = {
  slug: 'bentoGrid',
  interfaceName: 'BentoGridBlock',
  labels: {
    singular: 'Bento Grid',
    plural: 'Bento Grids',
  },
  fields: [
    {
      name: 'cells',
      type: 'array',
      label: 'Grid Cells',
      minRows: 1,
      maxRows: 8,
      admin: {
        initCollapsed: true,
      },
      fields: [
        {
          name: 'title',
          type: 'text',
          localized: true,
          admin: {
            placeholder: 'e.g. The premier congress for longevity',
          },
        },
        {
          name: 'description',
          type: 'textarea',
          localized: true,
          admin: {
            placeholder: 'e.g. Uniting the world\'s leading physicians...',
          },
        },
        {
          name: 'media',
          type: 'upload',
          relationTo: 'media',
          admin: {
            description: 'Optional background image for this cell',
          },
        },
        {
          name: 'cellSize',
          type: 'select',
          defaultValue: 'oneThird',
          required: true,
          options: [
            { label: 'Three Columns (3/12)', value: 'threeCol' },
            { label: 'One Third (4/12)', value: 'oneThird' },
            { label: 'Five Columns (5/12)', value: 'fiveCol' },
            { label: 'Half (6/12)', value: 'half' },
            { label: 'Seven Columns (7/12)', value: 'sevenCol' },
          ],
        },
        {
          name: 'style',
          type: 'select',
          defaultValue: 'light',
          required: true,
          options: [
            { label: 'Light', value: 'light' },
            { label: 'Warm', value: 'warm' },
            { label: 'Image Overlay', value: 'overlay' },
            { label: 'Video (click to play)', value: 'video' },
            { label: 'Video (autoplay)', value: 'videoAutoplay' },
          ],
          admin: {
            description:
              'Light = light beige bg, Warm = tan/gold bg, Image Overlay = dark text over image, Video (click to play) = thumbnail with play button, Video (autoplay) = video plays inline muted',
          },
        },
        {
          name: 'video',
          type: 'upload',
          relationTo: 'media',
          admin: {
            description: 'Video file. For "click to play" it opens in a lightbox; for autoplay it plays inline.',
            condition: (_data, siblingData) =>
              siblingData?.style === 'video' || siblingData?.style === 'videoAutoplay',
          },
        },
        {
          name: 'enableLink',
          type: 'checkbox',
          label: 'Enable Link',
        },
        link({
          appearances: ['default', 'outline'],
          overrides: {
            admin: {
              condition: (_data, siblingData) => Boolean(siblingData?.enableLink),
            },
          },
        }),
      ],
    },
  ],
}
