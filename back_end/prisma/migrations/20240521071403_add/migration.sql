-- CreateTable
CREATE TABLE "NotifiBill" (
    "bill_id" INTEGER NOT NULL,
    "is_read" BOOLEAN NOT NULL DEFAULT false
);

-- CreateIndex
CREATE UNIQUE INDEX "NotifiBill_bill_id_key" ON "NotifiBill"("bill_id");

-- AddForeignKey
ALTER TABLE "NotifiBill" ADD CONSTRAINT "NotifiBill_bill_id_fkey" FOREIGN KEY ("bill_id") REFERENCES "Bill"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
