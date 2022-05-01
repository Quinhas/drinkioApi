/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `drinks` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "drinks" ALTER COLUMN "name" SET DATA TYPE VARCHAR(150);

-- CreateIndex
CREATE UNIQUE INDEX "drinks_name_key" ON "drinks"("name");
