export const locales = ['en', 'ar'] as const
export type Locale = (typeof locales)[number]
export const defaultLocale: Locale = 'en'

export const rtlLocales: readonly Locale[] = ['ar']

export function isRTL(locale: Locale): boolean {
  return (rtlLocales as readonly string[]).includes(locale)
}

export function getDirection(locale: Locale): 'ltr' | 'rtl' {
  return isRTL(locale) ? 'rtl' : 'ltr'
}

export function isValidLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value)
}
