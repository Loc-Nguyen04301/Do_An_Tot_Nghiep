-- CreateEnum
CREATE TYPE "ShippingStatus" AS ENUM ('READY_TO_PICK', 'DELIVERED', 'CANCEL');

-- CreateTable
CREATE TABLE "ShippingBilll" (
    "bill_id" INTEGER NOT NULL,
    "ghn_order_code" INTEGER NOT NULL,
    "shipping_status" "ShippingStatus" NOT NULL DEFAULT 'READY_TO_PICK',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "update_at" TIMESTAMP(3)
);

-- CreateIndex
CREATE UNIQUE INDEX "ShippingBilll_bill_id_key" ON "ShippingBilll"("bill_id");

-- CreateIndex
CREATE UNIQUE INDEX "ShippingBilll_ghn_order_code_key" ON "ShippingBilll"("ghn_order_code");

-- AddForeignKey
ALTER TABLE "ShippingBilll" ADD CONSTRAINT "ShippingBilll_bill_id_fkey" FOREIGN KEY ("bill_id") REFERENCES "Bill"("id") ON DELETE CASCADE ON UPDATE CASCADE;
