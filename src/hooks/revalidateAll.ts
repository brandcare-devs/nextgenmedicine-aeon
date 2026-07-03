import type { CollectionAfterChangeHook, CollectionAfterDeleteHook } from 'payload'

import { revalidatePath } from 'next/cache'

export const revalidateAllAfterChange: CollectionAfterChangeHook = ({
  doc,
  req: { payload, context },
  collection,
}) => {
  if (!context.disableRevalidate) {
    payload.logger.info(`Revalidating all routes after change in ${collection.slug}`)
    revalidatePath('/', 'layout')
  }
  return doc
}

export const revalidateAllAfterDelete: CollectionAfterDeleteHook = ({
  doc,
  req: { payload, context },
  collection,
}) => {
  if (!context.disableRevalidate) {
    payload.logger.info(`Revalidating all routes after delete in ${collection.slug}`)
    revalidatePath('/', 'layout')
  }
  return doc
}
