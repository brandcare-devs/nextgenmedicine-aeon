import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE "newsletter_submissions" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"email" varchar NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "newsletter_submissions_id" integer;
  ALTER TABLE "footer_locales" ADD COLUMN "newsletter_success_message" varchar DEFAULT 'Thank you for subscribing!';
  ALTER TABLE "footer_locales" ADD COLUMN "newsletter_error_message" varchar DEFAULT 'Something went wrong. Please try again.';
  CREATE UNIQUE INDEX "newsletter_submissions_email_idx" ON "newsletter_submissions" USING btree ("email");
  CREATE INDEX "newsletter_submissions_updated_at_idx" ON "newsletter_submissions" USING btree ("updated_at");
  CREATE INDEX "newsletter_submissions_created_at_idx" ON "newsletter_submissions" USING btree ("created_at");
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_newsletter_submissions_fk" FOREIGN KEY ("newsletter_submissions_id") REFERENCES "public"."newsletter_submissions"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "payload_locked_documents_rels_newsletter_submissions_id_idx" ON "payload_locked_documents_rels" USING btree ("newsletter_submissions_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "newsletter_submissions" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "newsletter_submissions" CASCADE;
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_newsletter_submissions_fk";
  
  DROP INDEX "payload_locked_documents_rels_newsletter_submissions_id_idx";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "newsletter_submissions_id";
  ALTER TABLE "footer_locales" DROP COLUMN "newsletter_success_message";
  ALTER TABLE "footer_locales" DROP COLUMN "newsletter_error_message";`)
}
