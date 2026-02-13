/*
  Warnings:

  - You are about to drop the column `attachments` on the `TicketComments` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "TicketComments" DROP COLUMN "attachments";

-- AlterTable
ALTER TABLE "Tickets" ADD COLUMN     "attachments" TEXT[],
ADD COLUMN     "impactLevel" TEXT,
ADD COLUMN     "issueReason" TEXT,
ADD COLUMN     "links" TEXT[],
ADD COLUMN     "preferredOutcome" TEXT;
