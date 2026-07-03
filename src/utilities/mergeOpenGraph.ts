import type { Metadata } from 'next'
import { getDefaultSEO } from './getDefaultSEO'

export const mergeOpenGraph = async (
  og?: Metadata['openGraph'],
  locale?: string,
): Promise<Metadata['openGraph']> => {
  const defaults = await getDefaultSEO(locale)

  const defaultOpenGraph: Metadata['openGraph'] = {
    type: 'website',
    description: defaults.description,
    images: [{ url: defaults.imageURL }],
    siteName: defaults.siteName,
    title: defaults.title,
  }

  return {
    ...defaultOpenGraph,
    ...og,
    images: og?.images ? og.images : defaultOpenGraph.images,
  }
}
