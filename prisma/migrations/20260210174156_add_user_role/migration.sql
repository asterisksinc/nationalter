-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('ADMIN', 'SCHOLAR', 'ORG');

-- AlterTable
ALTER TABLE "AuthUser" ADD COLUMN     "role" "UserRole" NOT NULL DEFAULT 'SCHOLAR';
