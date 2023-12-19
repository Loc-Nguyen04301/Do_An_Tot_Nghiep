/*
  Warnings:

  - You are about to drop the `Image` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Image" DROP CONSTRAINT "Image_product_id_fkey";

-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "image" TEXT NOT NULL DEFAULT 'linkImage';

-- DropTable
DROP TABLE "Image";
