export const partnerTypeOptions = [
  { label: 'Sponsor', value: 'sponsor' },
  { label: 'Partner', value: 'partner' },
  { label: 'Speaker', value: 'speaker' },
  { label: 'Other', value: 'other' },
] as const

export type PartnerTypeValue = (typeof partnerTypeOptions)[number]['value']
