-- CreateEnum
CREATE TYPE "RegistrationStatus" AS ENUM ('PENDING', 'APPROVED', 'REJECTED');

-- CreateTable
CREATE TABLE "AuthUser" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "passwordHash" TEXT NOT NULL,
    "isEmailVerified" BOOLEAN NOT NULL DEFAULT false,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "lastLoginAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "AuthUser_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ScholarsPublic" (
    "id" SERIAL NOT NULL,
    "nationciteId" TEXT NOT NULL,
    "worldRank" INTEGER,
    "countryRank" INTEGER,
    "universityRank" INTEGER,
    "scholarName" TEXT NOT NULL,
    "orgName" TEXT NOT NULL,
    "mainSubject" TEXT,
    "subField" TEXT,
    "hIndexTotal" INTEGER NOT NULL,
    "hIndexLast5" INTEGER NOT NULL,
    "hIndexRatio" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "ScholarsPublic_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OrgsPublic" (
    "id" SERIAL NOT NULL,
    "nationciteId" TEXT NOT NULL,
    "worldRank" INTEGER,
    "countryRank" INTEGER,
    "orgName" TEXT NOT NULL,
    "hIndexTotal" INTEGER NOT NULL,
    "hIndexLast5" INTEGER NOT NULL,

    CONSTRAINT "OrgsPublic_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Registration" (
    "id" SERIAL NOT NULL,
    "nationciteId" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "status" "RegistrationStatus" NOT NULL DEFAULT 'PENDING',
    "authUserId" INTEGER,
    "ticketId" TEXT,

    CONSTRAINT "Registration_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MedicalProfessional" (
    "id" SERIAL NOT NULL,
    "registrationId" INTEGER,
    "nationciteId" TEXT,
    "name" TEXT NOT NULL,
    "medCouncilRegNo" TEXT NOT NULL,
    "stateCouncil" TEXT NOT NULL,
    "mobile" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "primaryHospital" TEXT NOT NULL,
    "specialty" TEXT NOT NULL,
    "researchFocus" TEXT NOT NULL,
    "medicalDegreeUrl" TEXT,
    "regCertificateUrl" TEXT,
    "status" TEXT NOT NULL,
    "plan" TEXT NOT NULL,

    CONSTRAINT "MedicalProfessional_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Researchers" (
    "id" SERIAL NOT NULL,
    "registrationId" INTEGER,
    "nationciteId" TEXT,
    "name" TEXT NOT NULL,
    "institute" TEXT NOT NULL,
    "instituteEmail" TEXT NOT NULL,
    "orcidId" TEXT NOT NULL,
    "institutionalIdCardUrl" TEXT,
    "mobile" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "primaryDomain" TEXT NOT NULL,
    "googleScholarUrl" TEXT NOT NULL,
    "profilePhotoUrl" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "plan" TEXT NOT NULL,

    CONSTRAINT "Researchers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OrgsRegistered" (
    "id" SERIAL NOT NULL,
    "registrationId" INTEGER,
    "nationciteId" TEXT,
    "domain" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "number" TEXT NOT NULL,
    "letterOfAuthorizationUrl" TEXT NOT NULL,
    "accreditationProofUrl" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "plan" TEXT NOT NULL,

    CONSTRAINT "OrgsRegistered_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Tickets" (
    "id" SERIAL NOT NULL,
    "ticketId" TEXT NOT NULL,
    "nationciteId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "issueType" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Tickets_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TicketComments" (
    "id" SERIAL NOT NULL,
    "ticketId" TEXT NOT NULL,
    "comments" TEXT NOT NULL,
    "attachments" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TicketComments_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "AuthUser_email_key" ON "AuthUser"("email");

-- CreateIndex
CREATE UNIQUE INDEX "ScholarsPublic_nationciteId_key" ON "ScholarsPublic"("nationciteId");

-- CreateIndex
CREATE UNIQUE INDEX "OrgsPublic_nationciteId_key" ON "OrgsPublic"("nationciteId");

-- CreateIndex
CREATE UNIQUE INDEX "Registration_authUserId_key" ON "Registration"("authUserId");

-- CreateIndex
CREATE UNIQUE INDEX "MedicalProfessional_registrationId_key" ON "MedicalProfessional"("registrationId");

-- CreateIndex
CREATE UNIQUE INDEX "Researchers_registrationId_key" ON "Researchers"("registrationId");

-- CreateIndex
CREATE UNIQUE INDEX "OrgsRegistered_registrationId_key" ON "OrgsRegistered"("registrationId");

-- CreateIndex
CREATE UNIQUE INDEX "Tickets_ticketId_key" ON "Tickets"("ticketId");

-- AddForeignKey
ALTER TABLE "Registration" ADD CONSTRAINT "Registration_authUserId_fkey" FOREIGN KEY ("authUserId") REFERENCES "AuthUser"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Registration" ADD CONSTRAINT "Registration_ticketId_fkey" FOREIGN KEY ("ticketId") REFERENCES "Tickets"("ticketId") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MedicalProfessional" ADD CONSTRAINT "MedicalProfessional_registrationId_fkey" FOREIGN KEY ("registrationId") REFERENCES "Registration"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Researchers" ADD CONSTRAINT "Researchers_registrationId_fkey" FOREIGN KEY ("registrationId") REFERENCES "Registration"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrgsRegistered" ADD CONSTRAINT "OrgsRegistered_registrationId_fkey" FOREIGN KEY ("registrationId") REFERENCES "Registration"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TicketComments" ADD CONSTRAINT "TicketComments_ticketId_fkey" FOREIGN KEY ("ticketId") REFERENCES "Tickets"("ticketId") ON DELETE RESTRICT ON UPDATE CASCADE;
