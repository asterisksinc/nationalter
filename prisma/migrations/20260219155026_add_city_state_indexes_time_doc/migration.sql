/*
  Warnings:

  - Added the required column `city` to the `MedicalProfessional` table without a default value. This is not possible if the table is not empty.
  - Added the required column `state` to the `MedicalProfessional` table without a default value. This is not possible if the table is not empty.
  - Added the required column `city` to the `OrgsRegistered` table without a default value. This is not possible if the table is not empty.
  - Added the required column `state` to the `OrgsRegistered` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Registration` table without a default value. This is not possible if the table is not empty.
  - Added the required column `city` to the `Researchers` table without a default value. This is not possible if the table is not empty.
  - Added the required column `state` to the `Researchers` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "MedicalProfessional" ADD COLUMN     "city" VARCHAR(100) NOT NULL,
ADD COLUMN     "state" VARCHAR(100) NOT NULL;

-- AlterTable
ALTER TABLE "OrgsRegistered" ADD COLUMN     "city" VARCHAR(100) NOT NULL,
ADD COLUMN     "state" VARCHAR(100) NOT NULL;

-- AlterTable
ALTER TABLE "Registration" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "Researchers" ADD COLUMN     "city" VARCHAR(100) NOT NULL,
ADD COLUMN     "state" VARCHAR(100) NOT NULL;

-- AlterTable
ALTER TABLE "Tickets" ALTER COLUMN "createdAt" SET DEFAULT CURRENT_TIMESTAMP;
