-- AlterTable
ALTER TABLE "Category" ADD COLUMN     "update_at" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "Item" ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "update_at" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "update_at" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "update_at" TIMESTAMP(3);
