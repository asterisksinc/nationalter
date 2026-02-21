-- CreateTable
CREATE TABLE "Blog" (
    "id" SERIAL NOT NULL,
    "nationciteId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "subtitle" TEXT,
    "mainText" TEXT NOT NULL,
    "images" TEXT[],
    "authorId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Blog_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Blog_nationciteId_idx" ON "Blog"("nationciteId");

-- CreateIndex
CREATE INDEX "Blog_authorId_idx" ON "Blog"("authorId");

-- CreateIndex
CREATE INDEX "Blog_createdAt_idx" ON "Blog"("createdAt");

-- AddForeignKey
ALTER TABLE "Blog" ADD CONSTRAINT "Blog_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "AuthUser"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
