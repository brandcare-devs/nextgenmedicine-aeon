import React from 'react'
import type { Metadata } from 'next'
import Script from 'next/script'

import './globals.css'

export const metadata: Metadata = {
  verification: {
    google: 'WvRxF-Ry4whDg0KQ5uQHWbfEH3IzliEcG7ansXESJo4',
  },
}

export default function FrontendLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=G-XNYD4HPL3M"
        strategy="afterInteractive"
      />
      <Script id="ga-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-XNYD4HPL3M');
        `}
      </Script>
      {children}
    </>
  )
}
