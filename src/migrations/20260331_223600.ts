import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "posts_populated_authors" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_posts_v_version_populated_authors" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "posts_populated_authors" CASCADE;
  DROP TABLE "_posts_v_version_populated_authors" CASCADE;
  ALTER TABLE "posts_rels" DROP CONSTRAINT "posts_rels_users_fk";
  
  ALTER TABLE "_posts_v_rels" DROP CONSTRAINT "_posts_v_rels_users_fk";
  
  ALTER TABLE "partnership_submissions" ALTER COLUMN "type" SET DATA TYPE text;
  DROP TYPE "public"."enum_partnership_submissions_type";
  CREATE TYPE "public"."enum_partnership_submissions_type" AS ENUM('sponsor', 'speaker', 'attendee', 'partner');
  ALTER TABLE "partnership_submissions" ALTER COLUMN "type" SET DATA TYPE "public"."enum_partnership_submissions_type" USING "type"::"public"."enum_partnership_submissions_type";
  DROP INDEX "posts_rels_users_id_idx";
  DROP INDEX "_posts_v_rels_users_id_idx";
  ALTER TABLE "posts_rels" DROP COLUMN "users_id";
  ALTER TABLE "_posts_v_rels" DROP COLUMN "users_id";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE "posts_populated_authors" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar
  );
  
  CREATE TABLE "_posts_v_version_populated_authors" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar,
  	"name" varchar
  );
  
  ALTER TABLE "partnership_submissions" ALTER COLUMN "type" SET DATA TYPE text;
  DROP TYPE "public"."enum_partnership_submissions_type";
  CREATE TYPE "public"."enum_partnership_submissions_type" AS ENUM('sponsor', 'exhibitor', 'partner');
  ALTER TABLE "partnership_submissions" ALTER COLUMN "type" SET DATA TYPE "public"."enum_partnership_submissions_type" USING "type"::"public"."enum_partnership_submissions_type";
  ALTER TABLE "posts_rels" ADD COLUMN "users_id" integer;
  ALTER TABLE "_posts_v_rels" ADD COLUMN "users_id" integer;
  ALTER TABLE "posts_populated_authors" ADD CONSTRAINT "posts_populated_authors_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_posts_v_version_populated_authors" ADD CONSTRAINT "_posts_v_version_populated_authors_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_posts_v"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "posts_populated_authors_order_idx" ON "posts_populated_authors" USING btree ("_order");
  CREATE INDEX "posts_populated_authors_parent_id_idx" ON "posts_populated_authors" USING btree ("_parent_id");
  CREATE INDEX "_posts_v_version_populated_authors_order_idx" ON "_posts_v_version_populated_authors" USING btree ("_order");
  CREATE INDEX "_posts_v_version_populated_authors_parent_id_idx" ON "_posts_v_version_populated_authors" USING btree ("_parent_id");
  ALTER TABLE "posts_rels" ADD CONSTRAINT "posts_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_posts_v_rels" ADD CONSTRAINT "_posts_v_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "posts_rels_users_id_idx" ON "posts_rels" USING btree ("users_id");
  CREATE INDEX "_posts_v_rels_users_id_idx" ON "_posts_v_rels" USING btree ("users_id");`)
}
