import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE "partnership_types" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"slug" varchar NOT NULL,
  	"order" numeric DEFAULT 0,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "partnership_types_locales" (
  	"name" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "partners_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"partnership_types_id" integer
  );
  
  ALTER TABLE "partners_partnership_types" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "partners_partnership_types" CASCADE;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "partnership_types_id" integer;
  ALTER TABLE "partnership_types_locales" ADD CONSTRAINT "partnership_types_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."partnership_types"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "partners_rels" ADD CONSTRAINT "partners_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."partners"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "partners_rels" ADD CONSTRAINT "partners_rels_partnership_types_fk" FOREIGN KEY ("partnership_types_id") REFERENCES "public"."partnership_types"("id") ON DELETE cascade ON UPDATE no action;
  CREATE UNIQUE INDEX "partnership_types_slug_idx" ON "partnership_types" USING btree ("slug");
  CREATE INDEX "partnership_types_updated_at_idx" ON "partnership_types" USING btree ("updated_at");
  CREATE INDEX "partnership_types_created_at_idx" ON "partnership_types" USING btree ("created_at");
  CREATE UNIQUE INDEX "partnership_types_locales_locale_parent_id_unique" ON "partnership_types_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "partners_rels_order_idx" ON "partners_rels" USING btree ("order");
  CREATE INDEX "partners_rels_parent_idx" ON "partners_rels" USING btree ("parent_id");
  CREATE INDEX "partners_rels_path_idx" ON "partners_rels" USING btree ("path");
  CREATE INDEX "partners_rels_partnership_types_id_idx" ON "partners_rels" USING btree ("partnership_types_id");
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_partnership_types_fk" FOREIGN KEY ("partnership_types_id") REFERENCES "public"."partnership_types"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "payload_locked_documents_rels_partnership_types_id_idx" ON "payload_locked_documents_rels" USING btree ("partnership_types_id");
  DROP TYPE "public"."enum_partners_partnership_types";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_partners_partnership_types" AS ENUM('sponsor', 'exhibitor', 'partner', 'strategic');
  CREATE TABLE "partners_partnership_types" (
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"value" "enum_partners_partnership_types",
  	"id" serial PRIMARY KEY NOT NULL
  );
  
  ALTER TABLE "partnership_types" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "partnership_types_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "partners_rels" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "partnership_types" CASCADE;
  DROP TABLE "partnership_types_locales" CASCADE;
  DROP TABLE "partners_rels" CASCADE;
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_partnership_types_fk";
  
  DROP INDEX "payload_locked_documents_rels_partnership_types_id_idx";
  ALTER TABLE "partners_partnership_types" ADD CONSTRAINT "partners_partnership_types_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."partners"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "partners_partnership_types_order_idx" ON "partners_partnership_types" USING btree ("order");
  CREATE INDEX "partners_partnership_types_parent_idx" ON "partners_partnership_types" USING btree ("parent_id");
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "partnership_types_id";`)
}
