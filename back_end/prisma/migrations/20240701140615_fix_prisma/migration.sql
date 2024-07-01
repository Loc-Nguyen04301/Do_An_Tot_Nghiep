-- AlterTable
ALTER TABLE "CategoriesOnProducts" ADD COLUMN     "update_at" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "NotifiBill" ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "update_at" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "ReasonCancelledBill" ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "update_at" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "Review" ADD COLUMN     "active" BOOLEAN NOT NULL DEFAULT true;
