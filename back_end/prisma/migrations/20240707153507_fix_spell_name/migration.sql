/*
  Warnings:

  - You are about to drop the `ShippingBilll` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "ShippingBilll" DROP CONSTRAINT "ShippingBilll_bill_id_fkey";

-- DropTable
DROP TABLE "ShippingBilll";

-- CreateTable
CREATE TABLE "ShippingBill" (
    "bill_id" INTEGER NOT NULL,
    "ghn_order_code" TEXT NOT NULL,
    "shipping_status" "ShippingStatus" NOT NULL DEFAULT 'READY_TO_PICK',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "update_at" TIMESTAMP(3)
);

-- CreateIndex
CREATE UNIQUE INDEX "ShippingBill_bill_id_key" ON "ShippingBill"("bill_id");

-- CreateIndex
CREATE UNIQUE INDEX "ShippingBill_ghn_order_code_key" ON "ShippingBill"("ghn_order_code");

-- AddForeignKey
ALTER TABLE "ShippingBill" ADD CONSTRAINT "ShippingBill_bill_id_fkey" FOREIGN KEY ("bill_id") REFERENCES "Bill"("id") ON DELETE CASCADE ON UPDATE CASCADE;
