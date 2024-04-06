/*
  Warnings:

  - You are about to drop the `ReviewImage` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "ReviewImage" DROP CONSTRAINT "ReviewImage_review_id_fkey";

-- AlterTable
ALTER TABLE "Review" ADD COLUMN     "images" TEXT[];

-- DropTable
DROP TABLE "ReviewImage";
