-- DropForeignKey
ALTER TABLE "CategoriesOnProducts" DROP CONSTRAINT "CategoriesOnProducts_category_id_fkey";

-- DropForeignKey
ALTER TABLE "CategoriesOnProducts" DROP CONSTRAINT "CategoriesOnProducts_product_id_fkey";

-- AddForeignKey
ALTER TABLE "CategoriesOnProducts" ADD CONSTRAINT "CategoriesOnProducts_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "Category"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CategoriesOnProducts" ADD CONSTRAINT "CategoriesOnProducts_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;
