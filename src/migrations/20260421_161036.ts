import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

type LayoutBlock = {
  blockType?: string
  types?: Array<{ value?: unknown }>
  [key: string]: unknown
}

const cleanLayout = (layout: unknown): { next: unknown; changed: boolean } => {
  if (!Array.isArray(layout)) return { next: layout, changed: false }
  let changed = false
  const next = layout.map((block: LayoutBlock) => {
    if (block?.blockType !== 'partnerFormBlock' || !Array.isArray(block.types)) return block
    let blockChanged = false
    const nextTypes = block.types.map((t) => {
      if (t && typeof t.value !== 'number' && t.value != null) {
        blockChanged = true
        return { ...t, value: null }
      }
      return t
    })
    if (blockChanged) {
      changed = true
      return { ...block, types: nextTypes }
    }
    return block
  })
  return { next, changed }
}

export async function up({ db }: MigrateUpArgs): Promise<void> {
  const { rows } = await db.execute(sql`
    SELECT _parent_id, _locale, layout
    FROM pages_locales
    WHERE layout::text LIKE '%partnerFormBlock%'
  `)

  for (const row of rows as Array<{ _parent_id: number; _locale: string; layout: unknown }>) {
    const { next, changed } = cleanLayout(row.layout)
    if (!changed) continue
    const json = JSON.stringify(next)
    await db.execute(sql`
      UPDATE pages_locales
      SET layout = ${json}::jsonb
      WHERE _parent_id = ${row._parent_id} AND _locale = ${row._locale}
    `)
  }
}

export async function down(_args: MigrateDownArgs): Promise<void> {
  // Non-reversible: original string values are not retained post-migration.
}
