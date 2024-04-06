/*
  Warnings:

  - The primary key for the `Item` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - A unique constraint covering the columns `[bill_id,product_id]` on the table `Item` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Item" DROP CONSTRAINT "Item_pkey";

-- CreateIndex
CREATE UNIQUE INDEX "Item_bill_id_product_id_key" ON "Item"("bill_id", "product_id");
