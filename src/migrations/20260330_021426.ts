import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_partnership_submissions_type" AS ENUM('sponsor', 'exhibitor', 'partner');
  CREATE TABLE "partnership_submissions" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"first_name" varchar NOT NULL,
  	"last_name" varchar NOT NULL,
  	"email" varchar NOT NULL,
  	"company_name" varchar NOT NULL,
  	"type" "enum_partnership_submissions_type" NOT NULL,
  	"message" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "partnership_submissions_id" integer;
  CREATE INDEX "partnership_submissions_updated_at_idx" ON "partnership_submissions" USING btree ("updated_at");
  CREATE INDEX "partnership_submissions_created_at_idx" ON "partnership_submissions" USING btree ("created_at");
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_partnership_submissions_fk" FOREIGN KEY ("partnership_submissions_id") REFERENCES "public"."partnership_submissions"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "payload_locked_documents_rels_partnership_submissions_id_idx" ON "payload_locked_documents_rels" USING btree ("partnership_submissions_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "partnership_submissions" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "partnership_submissions" CASCADE;
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_partnership_submissions_fk";
  
  DROP INDEX "payload_locked_documents_rels_partnership_submissions_id_idx";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "partnership_submissions_id";
  DROP TYPE "public"."enum_partnership_submissions_type";`)
}
