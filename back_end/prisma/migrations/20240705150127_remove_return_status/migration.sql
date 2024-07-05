/*
  Warnings:

  - You are about to drop the column `return_status` on the `Bill` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Bill" DROP COLUMN "return_status";

-- DropEnum
DROP TYPE "ReturnStatus";
