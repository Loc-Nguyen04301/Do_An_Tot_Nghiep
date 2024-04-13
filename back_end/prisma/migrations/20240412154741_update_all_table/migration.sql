/*
  Warnings:

  - Made the column `created_at` on table `Category` required. This step will fail if there are existing NULL values in that column.
  - Made the column `available` on table `Product` required. This step will fail if there are existing NULL values in that column.
  - Made the column `created_at` on table `Product` required. This step will fail if there are existing NULL values in that column.
  - Made the column `star` on table `Review` required. This step will fail if there are existing NULL values in that column.
  - Made the column `created_at` on table `Review` required. This step will fail if there are existing NULL values in that column.
  - Made the column `avatar` on table `User` required. This step will fail if there are existing NULL values in that column.
  - Made the column `role` on table `User` required. This step will fail if there are existing NULL values in that column.
  - Made the column `active` on table `User` required. This step will fail if there are existing NULL values in that column.
  - Made the column `created_at` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- CreateEnum
CREATE TYPE "OrderStatus" AS ENUM ('PROCESSING', 'SUCCESS', 'CANCELLED');

-- CreateEnum
CREATE TYPE "ReturnStatus" AS ENUM ('NONE', 'REQUESTED', 'PROCESSING', 'RETURNED');

-- AlterTable
ALTER TABLE "Bill" ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "order_status" "OrderStatus" NOT NULL DEFAULT 'PROCESSING',
ADD COLUMN     "payment_status" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "return_status" "ReturnStatus" NOT NULL DEFAULT 'NONE',
ADD COLUMN     "update_at" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "Category" ALTER COLUMN "created_at" SET NOT NULL;

-- AlterTable
ALTER TABLE "Product" ALTER COLUMN "available" SET NOT NULL,
ALTER COLUMN "created_at" SET NOT NULL;

-- AlterTable
ALTER TABLE "Review" ADD COLUMN     "update_at" TIMESTAMP(3),
ALTER COLUMN "star" SET NOT NULL,
ALTER COLUMN "created_at" SET NOT NULL;

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "avatar" SET NOT NULL,
ALTER COLUMN "role" SET NOT NULL,
ALTER COLUMN "active" SET NOT NULL,
ALTER COLUMN "active" SET DEFAULT false,
ALTER COLUMN "created_at" SET NOT NULL;
