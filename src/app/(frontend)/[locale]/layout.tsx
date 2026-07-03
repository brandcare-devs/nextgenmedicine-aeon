import type { Metadata } from 'next'

import { cn } from '@/utilities/ui'
import { Roboto } from 'next/font/google'
import { GeistMono } from 'geist/font/mono'
import Script from 'next/script'
import React from 'react'

const GTM_ID = 'GTM-TQZ28MWT'

const roboto = Roboto({
  subsets: ['latin'],
  weight: ['200', '300', '400', '500', '700'],
  variable: '--font-roboto',
  display: 'swap',
})

import { Footer } from '@/Footer/Component'
import { Header } from '@/Header/Component'
import { Providers } from '@/providers'
import { mergeOpenGraph } from '@/utilities/mergeOpenGraph'
import { getServerSideURL } from '@/utilities/getURL'
import { getDirection, type Locale, locales } from '@/i18n/config'

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }))
}

type Props = {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}

export default async function LocaleLayout({ children, params: paramsPromise }: Props) {
  const { locale: localeParam } = await paramsPromise
  const locale = localeParam as Locale
  const dir = getDirection(locale)

  return (
    <html className={cn(roboto.variable, GeistMono.variable)} lang={locale} dir={dir}>
      <head>
        <link href="/favicon.ico" rel="icon" sizes="32x32" />
        <link href="/favicon.svg" rel="icon" type="image/svg+xml" />
        {locale === 'ar' && (
          <link
            href="https://fonts.googleapis.com/css2?family=Noto+Sans+Arabic:wght@400;500;600;700&display=swap"
            rel="stylesheet"
          />
        )}
        <Script id="gtm" strategy="afterInteractive">
          {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${GTM_ID}');`}
        </Script>
      </head>
      <body>
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          />
        </noscript>
        <Providers>
          <Header locale={locale} />
          {children}
          <Footer locale={locale} />
        </Providers>
      </body>
    </html>
  )
}

export async function generateMetadata({
  params: paramsPromise,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await paramsPromise
  return {
    metadataBase: new URL(getServerSideURL()),
    openGraph: await mergeOpenGraph(undefined, locale),
    twitter: {
      card: 'summary_large_image',
    },
  }
}
