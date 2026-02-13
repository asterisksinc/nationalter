/*
  Warnings:

  - A unique constraint covering the columns `[mobile]` on the table `MedicalProfessional` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[number]` on the table `OrgsRegistered` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[mobile]` on the table `Researchers` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "MedicalProfessional_mobile_key" ON "MedicalProfessional"("mobile");

-- CreateIndex
CREATE UNIQUE INDEX "OrgsRegistered_number_key" ON "OrgsRegistered"("number");

-- CreateIndex
CREATE UNIQUE INDEX "Researchers_mobile_key" ON "Researchers"("mobile");
