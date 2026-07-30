import React from 'react'
import type { Metadata } from 'next'

import './globals.css'

export const metadata: Metadata = {
  verification: {
    google: 'WvRxF-Ry4whDg0KQ5uQHWbfEH3IzliEcG7ansXESJo4',
  },
}

export default function FrontendLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
