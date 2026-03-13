-- AlterTable
ALTER TABLE "Blog" ALTER COLUMN "sections" DROP DEFAULT;

-- CreateTable
CREATE TABLE "Cms" (
    "key" TEXT NOT NULL,
    "value" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Cms_pkey" PRIMARY KEY ("key")
);
