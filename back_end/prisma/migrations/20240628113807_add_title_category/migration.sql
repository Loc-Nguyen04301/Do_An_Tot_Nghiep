/*
  Warnings:

  - A unique constraint covering the columns `[title]` on the table `Category` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `title` to the `Category` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Category" ADD COLUMN     "title" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Category_title_key" ON "Category"("title");
