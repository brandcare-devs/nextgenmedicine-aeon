import type { GlobalAfterChangeHook } from 'payload'

import { revalidatePath } from 'next/cache'
import { locales } from '@/i18n/config'

export const revalidateSiteSettings: GlobalAfterChangeHook = ({
  doc,
  req: { payload, context },
}) => {
  if (!context.disableRevalidate) {
    payload.logger.info(`Revalidating site settings`)

    for (const locale of locales) {
      revalidatePath(`/${locale}`, 'layout')
    }
  }

  return doc
}
