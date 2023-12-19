/*
  Warnings:

  - Changed the type of `old_price` on the `Product` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `new_price` on the `Product` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Product" DROP COLUMN "old_price",
ADD COLUMN     "old_price" INTEGER NOT NULL,
DROP COLUMN "new_price",
ADD COLUMN     "new_price" INTEGER NOT NULL;
