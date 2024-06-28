/*
  Warnings:

  - You are about to drop the column `title` on the `Category` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[path]` on the table `Category` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `path` to the `Category` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Category_title_key";

-- AlterTable
ALTER TABLE "Category" DROP COLUMN "title",
ADD COLUMN     "path" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Category_path_key" ON "Category"("path");
