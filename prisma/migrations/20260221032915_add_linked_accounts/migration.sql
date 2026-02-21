-- AlterTable
ALTER TABLE "MedicalProfessional" ADD COLUMN     "linkedAccounts" TEXT[] DEFAULT ARRAY[]::TEXT[];

-- AlterTable
ALTER TABLE "OrgsRegistered" ADD COLUMN     "linkedAccounts" TEXT[] DEFAULT ARRAY[]::TEXT[];

-- AlterTable
ALTER TABLE "Researchers" ADD COLUMN     "linkedAccounts" TEXT[] DEFAULT ARRAY[]::TEXT[];
