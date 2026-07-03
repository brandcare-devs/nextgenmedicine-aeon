import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE "speakers_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"speaker_categories_id" integer
  );
  
  ALTER TABLE "speakers" DROP CONSTRAINT "speakers_category_id_speaker_categories_id_fk";
  
  DROP INDEX "speakers_category_idx";
  ALTER TABLE "speakers_rels" ADD CONSTRAINT "speakers_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."speakers"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "speakers_rels" ADD CONSTRAINT "speakers_rels_speaker_categories_fk" FOREIGN KEY ("speaker_categories_id") REFERENCES "public"."speaker_categories"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "speakers_rels_order_idx" ON "speakers_rels" USING btree ("order");
  CREATE INDEX "speakers_rels_parent_idx" ON "speakers_rels" USING btree ("parent_id");
  CREATE INDEX "speakers_rels_path_idx" ON "speakers_rels" USING btree ("path");
  CREATE INDEX "speakers_rels_speaker_categories_id_idx" ON "speakers_rels" USING btree ("speaker_categories_id");

  -- Migrate existing single-category data into the new rels table
  INSERT INTO "speakers_rels" ("order", "parent_id", "path", "speaker_categories_id")
  SELECT 1, "id", 'category', "category_id"
  FROM "speakers"
  WHERE "category_id" IS NOT NULL;

  ALTER TABLE "speakers" DROP COLUMN "category_id";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "speakers_rels" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "speakers_rels" CASCADE;
  ALTER TABLE "speakers" ADD COLUMN "category_id" integer;
  ALTER TABLE "speakers" ADD CONSTRAINT "speakers_category_id_speaker_categories_id_fk" FOREIGN KEY ("category_id") REFERENCES "public"."speaker_categories"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "speakers_category_idx" ON "speakers" USING btree ("category_id");`)
}
