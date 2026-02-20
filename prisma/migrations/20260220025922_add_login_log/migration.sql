-- CreateEnum
CREATE TYPE "LoginType" AS ENUM ('ADMIN', 'RESEARCHER', 'MEDICAL_PROFESSIONAL', 'ORG');

-- CreateTable
CREATE TABLE "LoginLog" (
    "id" SERIAL NOT NULL,
    "nationciteId" VARCHAR(50) NOT NULL,
    "loginType" "LoginType" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "LoginLog_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "LoginLog_nationciteId_idx" ON "LoginLog"("nationciteId");

-- CreateIndex
CREATE INDEX "LoginLog_loginType_idx" ON "LoginLog"("loginType");

-- CreateIndex
CREATE INDEX "LoginLog_createdAt_idx" ON "LoginLog"("createdAt");
