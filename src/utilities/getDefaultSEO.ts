import configPromise from '@payload-config'
import { getPayload } from 'payload'
import type { Media } from '@/payload-types'
import { getServerSideURL } from './getURL'

export type DefaultSEO = {
  siteName: string
  title: string
  description: string
  imageURL: string
}

const HARDCODED_FALLBACK: DefaultSEO = {
  siteName: 'Next Generation Medicine',
  title: 'Next Generation Medicine',
  description: 'Next Generation Medicine',
  imageURL: '/og-image.png',
}

const toAbsoluteURL = (url: string) => {
  if (/^https?:\/\//i.test(url)) return url
  return getServerSideURL() + url
}

export async function getDefaultSEO(locale?: string): Promise<DefaultSEO> {
  try {
    const payload = await getPayload({ config: configPromise })
    const settings = await payload.findGlobal({
      slug: 'site-settings',
      depth: 1,
      locale: locale as 'en' | 'ar' | 'all' | undefined,
    })

    const seo = (settings as { seo?: Record<string, unknown> } | null)?.seo ?? {}
    const siteName =
      (seo.siteName as string | undefined) || HARDCODED_FALLBACK.siteName
    const title =
      (seo.defaultTitle as string | undefined) || HARDCODED_FALLBACK.title
    const description =
      (seo.defaultDescription as string | undefined) ||
      HARDCODED_FALLBACK.description

    const image = seo.defaultImage as Media | number | null | undefined
    let imageURL = toAbsoluteURL(HARDCODED_FALLBACK.imageURL)
    if (image && typeof image === 'object' && image.url) {
      imageURL = toAbsoluteURL(image.url)
    }

    return { siteName, title, description, imageURL }
  } catch {
    return {
      ...HARDCODED_FALLBACK,
      imageURL: toAbsoluteURL(HARDCODED_FALLBACK.imageURL),
    }
  }
}
