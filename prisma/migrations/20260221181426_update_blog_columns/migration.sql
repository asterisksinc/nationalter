-- Drop old columns
ALTER TABLE "Blog" DROP COLUMN IF EXISTS "subtitle";
ALTER TABLE "Blog" DROP COLUMN IF EXISTS "mainText";
ALTER TABLE "Blog" DROP COLUMN IF EXISTS "images";

-- Add new columns
ALTER TABLE "Blog" ADD COLUMN "coverImage" TEXT;
ALTER TABLE "Blog" ADD COLUMN "intro" TEXT NOT NULL DEFAULT '';
ALTER TABLE "Blog" ADD COLUMN "sections" JSONB NOT NULL DEFAULT '[]';
ALTER TABLE "Blog" ADD COLUMN "conclusion" TEXT;

-- Remove the default on intro
ALTER TABLE "Blog" ALTER COLUMN "intro" DROP DEFAULT;