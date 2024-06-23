-- CreateTable
CREATE TABLE "ReasonCancelledBill" (
    "bill_id" INTEGER NOT NULL,
    "reason_cancelled" TEXT
);

-- CreateIndex
CREATE UNIQUE INDEX "ReasonCancelledBill_bill_id_key" ON "ReasonCancelledBill"("bill_id");

-- AddForeignKey
ALTER TABLE "ReasonCancelledBill" ADD CONSTRAINT "ReasonCancelledBill_bill_id_fkey" FOREIGN KEY ("bill_id") REFERENCES "Bill"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
