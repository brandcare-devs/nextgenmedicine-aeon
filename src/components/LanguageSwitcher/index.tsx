'use client'
import Link from 'next/link'
import { useParams, usePathname } from 'next/navigation'
import React from 'react'
import { locales, type Locale } from '@/i18n/config'

const localeLabels: Record<Locale, string> = {
  en: 'EN',
  ar: 'عربي',
}

export const LanguageSwitcher: React.FC = () => {
  const { locale: currentLocale } = useParams()
  const pathname = usePathname()

  return (
    <div className="flex gap-2 items-center">
      {locales.map((locale) => {
        // Replace the current locale prefix in the path
        const newPath = pathname.replace(`/${currentLocale}`, `/${locale}`)

        const isActive = locale === currentLocale

        return (
          <Link
            key={locale}
            href={newPath}
            className={`text-sm px-2 py-1 rounded transition-colors ${
              isActive
                ? 'font-bold text-primary'
                : 'text-muted-foreground hover:text-foreground'
            }`}
            onClick={() => {
              document.cookie = `NEXT_LOCALE=${locale};path=/;max-age=31536000`
            }}
          >
            {localeLabels[locale]}
          </Link>
        )
      })}
    </div>
  )
}
