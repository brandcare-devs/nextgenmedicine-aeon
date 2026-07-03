import type { Metadata } from 'next'

import type { Media, Page, Post, Config } from '../payload-types'

import { mergeOpenGraph } from './mergeOpenGraph'
import { getDefaultSEO } from './getDefaultSEO'
import { getServerSideURL } from './getURL'

const toAbsoluteURL = (url: string) => {
  if (/^https?:\/\//i.test(url)) return url
  return getServerSideURL() + url
}

const getImageURL = (
  image: Media | Config['db']['defaultIDType'] | null | undefined,
  fallback: string,
) => {
  if (image && typeof image === 'object' && image.url) {
    return toAbsoluteURL(image.url)
  }
  return fallback
}

export const generateMeta = async (args: {
  doc: Partial<Page> | Partial<Post> | null
  locale?: string
}): Promise<Metadata> => {
  const { doc, locale } = args
  const defaults = await getDefaultSEO(locale)

  const ogImage = getImageURL(doc?.meta?.image, defaults.imageURL)

  const title = doc?.meta?.title
    ? `${doc.meta.title} - ${defaults.siteName}`
    : defaults.title

  const description = doc?.meta?.description || defaults.description

  return {
    description,
    openGraph: await mergeOpenGraph(
      {
        description,
        images: [{ url: ogImage }],
        title,
        url: Array.isArray(doc?.slug) ? doc?.slug.join('/') : '/',
      },
      locale,
    ),
    title,
  }
}
