/*
  Warnings:

  - Changed the type of `when` on the `Transaction` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Transaction" DROP COLUMN "when",
ADD COLUMN     "when" TIMESTAMP(3) NOT NULL;
