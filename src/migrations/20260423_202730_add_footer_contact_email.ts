import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    ALTER TABLE "footer" ADD COLUMN "contact_email_url" varchar;
    ALTER TABLE "footer_locales" ADD COLUMN "contact_email_label" varchar;
  `)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
    ALTER TABLE "footer" DROP COLUMN "contact_email_url";
    ALTER TABLE "footer_locales" DROP COLUMN "contact_email_label";
  `)
}
