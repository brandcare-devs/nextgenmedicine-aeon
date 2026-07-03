import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

type LayoutBlock = {
  blockType?: string
  types?: Array<{ value?: unknown; benefitsTitle?: string }>
  [key: string]: unknown
}

const inferValue = (benefitsTitle: string | undefined): string => {
  const t = (benefitsTitle || '').toLowerCase()
  if (t.includes('sponsor')) return 'sponsor'
  if (t.includes('partner')) return 'partner'
  if (t.includes('speaker')) return 'speaker'
  return 'other'
}

const restoreLayout = (layout: unknown): { next: unknown; changed: boolean } => {
  if (!Array.isArray(layout)) return { next: layout, changed: false }
  let changed = false
  const next = layout.map((block: LayoutBlock) => {
    if (block?.blockType !== 'partnerFormBlock' || !Array.isArray(block.types)) return block
    let blockChanged = false
    const nextTypes = block.types.map((t) => {
      if (!t || typeof t.value === 'string') return t
      blockChanged = true
      return { ...t, value: inferValue(t.benefitsTitle) }
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
  // Schema: replace type_id integer FK with type varchar enum on partnership_submissions
  await db.execute(sql`
    ALTER TABLE "partnership_submissions" DROP CONSTRAINT IF EXISTS "partnership_submissions_type_id_partnership_types_id_fk";
    DROP INDEX IF EXISTS "partnership_submissions_type_idx";
    ALTER TABLE "partnership_submissions" DROP COLUMN IF EXISTS "type_id";
    DO $$ BEGIN
      CREATE TYPE "enum_partnership_submissions_type" AS ENUM ('sponsor', 'partner', 'speaker', 'other');
    EXCEPTION WHEN duplicate_object THEN NULL; END $$;
    ALTER TABLE "partnership_submissions" ADD COLUMN IF NOT EXISTS "type" "enum_partnership_submissions_type";
  `)

  // Data: restore partnerFormBlock types[].value strings (currently null from prior migration).
  const { rows } = await db.execute(sql`
    SELECT _parent_id, _locale, layout
    FROM pages_locales
    WHERE layout::text LIKE '%partnerFormBlock%'
  `)

  for (const row of rows as Array<{ _parent_id: number; _locale: string; layout: unknown }>) {
    const { next, changed } = restoreLayout(row.layout)
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
  // Non-reversible
}
