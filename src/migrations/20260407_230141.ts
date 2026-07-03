import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "partnership_submissions" ADD COLUMN "type_id" integer;
  ALTER TABLE "partnership_submissions" ADD CONSTRAINT "partnership_submissions_type_id_partnership_types_id_fk" FOREIGN KEY ("type_id") REFERENCES "public"."partnership_types"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "partnership_submissions_type_idx" ON "partnership_submissions" USING btree ("type_id");
  ALTER TABLE "partnership_submissions" DROP COLUMN IF EXISTS "type";
  DROP TYPE IF EXISTS "public"."enum_partnership_submissions_type";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_partnership_submissions_type" AS ENUM('sponsor', 'speaker', 'attendee', 'partner');
  ALTER TABLE "partnership_submissions" DROP CONSTRAINT "partnership_submissions_type_id_partnership_types_id_fk";
  DROP INDEX IF EXISTS "partnership_submissions_type_idx";
  ALTER TABLE "partnership_submissions" ADD COLUMN "type" "enum_partnership_submissions_type";
  ALTER TABLE "partnership_submissions" DROP COLUMN "type_id";`)
}
