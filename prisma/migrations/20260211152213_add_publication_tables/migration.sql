/*
  Warnings:

  - You are about to drop the `PublicationOrg` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `PublicationScholar` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `nationciteId` to the `Publication` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "PublicationOrg" DROP CONSTRAINT "PublicationOrg_publicationId_fkey";

-- DropForeignKey
ALTER TABLE "PublicationScholar" DROP CONSTRAINT "PublicationScholar_publicationId_fkey";

-- AlterTable
ALTER TABLE "Publication" ADD COLUMN     "nationciteId" TEXT NOT NULL,
ALTER COLUMN "citationsTotal" SET DEFAULT 0,
ALTER COLUMN "citationsLast5Years" SET DEFAULT 0;

-- DropTable
DROP TABLE "PublicationOrg";

-- DropTable
DROP TABLE "PublicationScholar";
