import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE "speaker_categories" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" numeric DEFAULT 0,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "speaker_categories_locales" (
  	"title" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  ALTER TABLE "speakers" ADD COLUMN "category_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "speaker_categories_id" integer;
  ALTER TABLE "speaker_categories_locales" ADD CONSTRAINT "speaker_categories_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."speaker_categories"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "speaker_categories_updated_at_idx" ON "speaker_categories" USING btree ("updated_at");
  CREATE INDEX "speaker_categories_created_at_idx" ON "speaker_categories" USING btree ("created_at");
  CREATE UNIQUE INDEX "speaker_categories_locales_locale_parent_id_unique" ON "speaker_categories_locales" USING btree ("_locale","_parent_id");
  ALTER TABLE "speakers" ADD CONSTRAINT "speakers_category_id_speaker_categories_id_fk" FOREIGN KEY ("category_id") REFERENCES "public"."speaker_categories"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_speaker_categories_fk" FOREIGN KEY ("speaker_categories_id") REFERENCES "public"."speaker_categories"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "speakers_category_idx" ON "speakers" USING btree ("category_id");
  CREATE INDEX "payload_locked_documents_rels_speaker_categories_id_idx" ON "payload_locked_documents_rels" USING btree ("speaker_categories_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "speaker_categories" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "speaker_categories_locales" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "speaker_categories" CASCADE;
  DROP TABLE "speaker_categories_locales" CASCADE;
  ALTER TABLE "speakers" DROP CONSTRAINT "speakers_category_id_speaker_categories_id_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_speaker_categories_fk";
  
  DROP INDEX "speakers_category_idx";
  DROP INDEX "payload_locked_documents_rels_speaker_categories_id_idx";
  ALTER TABLE "speakers" DROP COLUMN "category_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "speaker_categories_id";`)
}
