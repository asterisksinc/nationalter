-- CreateTable
CREATE TABLE "Publication" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "journalName" TEXT NOT NULL,
    "datePublished" TIMESTAMP(3) NOT NULL,
    "citationsTotal" INTEGER NOT NULL,
    "citationsLast5Years" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Publication_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PublicationScholar" (
    "publicationId" INTEGER NOT NULL,
    "scholarNationciteId" VARCHAR(256) NOT NULL,

    CONSTRAINT "PublicationScholar_pkey" PRIMARY KEY ("publicationId","scholarNationciteId")
);

-- CreateTable
CREATE TABLE "PublicationOrg" (
    "publicationId" INTEGER NOT NULL,
    "orgNationciteId" VARCHAR(256) NOT NULL,

    CONSTRAINT "PublicationOrg_pkey" PRIMARY KEY ("publicationId","orgNationciteId")
);

-- AddForeignKey
ALTER TABLE "PublicationScholar" ADD CONSTRAINT "PublicationScholar_publicationId_fkey" FOREIGN KEY ("publicationId") REFERENCES "Publication"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PublicationOrg" ADD CONSTRAINT "PublicationOrg_publicationId_fkey" FOREIGN KEY ("publicationId") REFERENCES "Publication"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
