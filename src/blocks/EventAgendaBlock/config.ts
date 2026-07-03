import type { Block, Field } from 'payload'

const sessionFields: Field[] = [
  {
    name: 'isTheme',
    type: 'checkbox',
    label: 'Theme row (renders as right-aligned uppercase text)',
    defaultValue: false,
  },
  {
    name: 'themeText',
    type: 'text',
    localized: true,
    admin: {
      placeholder: 'THEME: FROM EVIDENCE TO ADOPTION...',
      condition: (_, siblingData) => siblingData?.isTheme === true,
    },
  },
  {
    type: 'row',
    admin: {
      condition: (_, siblingData) => siblingData?.isTheme !== true,
    },
    fields: [
      {
        name: 'timeStart',
        type: 'text',
        admin: { placeholder: '9:00 AM', width: '50%' },
      },
      {
        name: 'timeEnd',
        type: 'text',
        admin: { placeholder: '9:45 AM', width: '50%' },
      },
    ],
  },
  {
    name: 'isBreak',
    type: 'checkbox',
    label: 'Break / Social (renders as a muted pill)',
    defaultValue: false,
    admin: {
      condition: (_, siblingData) => siblingData?.isTheme !== true,
    },
  },
  {
    name: 'showTime',
    type: 'checkbox',
    label: 'Show start/end time on break pill',
    defaultValue: false,
    admin: {
      condition: (_, siblingData) =>
        siblingData?.isBreak === true && siblingData?.isTheme !== true,
    },
  },
  {
    name: 'moderator',
    type: 'text',
    localized: true,
    admin: {
      placeholder: 'Moderator: Dr. Jane Smith',
      condition: (_, siblingData) => siblingData?.isTheme !== true,
    },
  },
  {
    name: 'content',
    type: 'richText',
    localized: true,
    admin: {
      condition: (_, siblingData) => siblingData?.isTheme !== true,
    },
  },
]

export const EventAgendaBlock: Block = {
  slug: 'eventAgendaBlock',
  interfaceName: 'EventAgendaBlockType',
  labels: {
    singular: 'Event Agenda Block',
    plural: 'Event Agenda Blocks',
  },
  fields: [
    {
      name: 'subtitleLeft',
      type: 'textarea',
      localized: true,
      admin: { placeholder: 'World-class presentations and workshops from globally renewed experts' },
    },
    {
      name: 'subtitleRight',
      type: 'textarea',
      localized: true,
      admin: { placeholder: 'Uniting the world\'s leading physicians, researchers...' },
    },
    {
      name: 'pdfDownload',
      type: 'upload',
      relationTo: 'media',
      label: 'Agenda PDF Download',
    },
    {
      name: 'pdfButtonLabel',
      type: 'text',
      defaultValue: 'Download Full Agenda (PDF)',
      localized: true,
      admin: { placeholder: 'Download Full Agenda (PDF)' },
    },
    {
      name: 'days',
      type: 'array',
      label: 'Days',
      required: true,
      minRows: 1,
      maxRows: 10,
      admin: { initCollapsed: true },
      fields: [
        {
          type: 'row',
          fields: [
            {
              name: 'label',
              type: 'text',
              required: true,
              admin: { placeholder: 'Day 1', width: '30%' },
            },
            {
              name: 'date',
              type: 'text',
              required: true,
              admin: { placeholder: '07/11/2025', width: '30%' },
            },
          ],
        },
        {
          name: 'title',
          type: 'text',
          required: true,
          localized: true,
          admin: { placeholder: 'The New Discipline: Standards, Safety, and the 2030 Clinic' },
        },
        {
          name: 'theme',
          type: 'text',
          localized: true,
          admin: { placeholder: 'THEME: FROM EVIDENCE TO ADOPTION...' },
        },
        {
          name: 'moderator',
          type: 'text',
          localized: true,
          admin: { placeholder: 'Moderator: Dr. Jane Smith' },
        },
        {
          name: 'sessions',
          type: 'array',
          label: 'Main Sessions',
          required: true,
          minRows: 1,
          admin: { initCollapsed: true },
          fields: sessionFields,
        },
        {
          name: 'tracks',
          type: 'array',
          label: 'Tracks',
          admin: { initCollapsed: true },
          fields: [
            {
              name: 'name',
              type: 'text',
              required: true,
              admin: { placeholder: 'Track A' },
            },
            {
              name: 'title',
              type: 'text',
              required: true,
              localized: true,
              admin: { placeholder: 'Data to decisions: Digital twins, RWE...' },
            },
            {
              name: 'moderator',
              type: 'text',
              admin: { placeholder: 'Moderator: Mr. Philippe Gerwill' },
            },
            {
              name: 'sessions',
              type: 'array',
              label: 'Track Sessions',
              required: true,
              minRows: 1,
              admin: { initCollapsed: true },
              fields: sessionFields,
            },
          ],
        },
      ],
    },
  ],
}
