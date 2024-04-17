/*
  Warnings:

  - Added the required column `payment_method` to the `Bill` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "PaymentMethod" AS ENUM ('SHIPCOD', 'BANK_TRANSFER', 'VNPAY');

-- AlterTable
ALTER TABLE "Bill" ADD COLUMN     "payment_method" "PaymentMethod" NOT NULL;
