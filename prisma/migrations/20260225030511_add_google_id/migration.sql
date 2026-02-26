/*
  Warnings:

  - A unique constraint covering the columns `[googleId]` on the table `AuthUser` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "AuthUser" ADD COLUMN     "googleId" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "AuthUser_googleId_key" ON "AuthUser"("googleId");
