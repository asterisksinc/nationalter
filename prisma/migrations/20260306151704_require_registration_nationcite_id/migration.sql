/*
  Warnings:

  - Made the column `nationciteId` on table `Registration` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Registration" ALTER COLUMN "nationciteId" SET NOT NULL;
