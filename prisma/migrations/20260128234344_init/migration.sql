-- AlterTable
ALTER TABLE "MedicalProfessional" ALTER COLUMN "medicalDegreeUrl" DROP NOT NULL,
ALTER COLUMN "regCertificateUrl" DROP NOT NULL;

-- AlterTable
ALTER TABLE "ScholarsPublic" ALTER COLUMN "mainSubject" DROP NOT NULL,
ALTER COLUMN "subField" DROP NOT NULL;
