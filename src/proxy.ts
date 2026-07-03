import { NextRequest, NextResponse } from 'next/server'
import { locales, defaultLocale } from './i18n/config'

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Check if the pathname already has a locale
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`,
  )

  if (pathnameHasLocale) return NextResponse.next()

  // Detect locale from cookie or fall back to default
  const cookieLocale = request.cookies.get('NEXT_LOCALE')?.value
  const locale =
    cookieLocale && (locales as readonly string[]).includes(cookieLocale)
      ? cookieLocale
      : defaultLocale

  // Redirect to locale-prefixed path
  request.nextUrl.pathname = `/${locale}${pathname}`
  return NextResponse.redirect(request.nextUrl)
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next (Next.js internals)
     * - api (API routes, including Payload REST/GraphQL)
     * - admin (Payload admin panel)
     * - next (preview/seed/exit-preview routes)
     * - sitemaps
     * - static files (favicon, media, etc.)
     */
    '/((?!_next|api|admin|next/|.*-sitemap\\.xml|media|favicon\\.ico|favicon\\.svg|.*\\..*).*)',
  ],
}
