/*
  Warnings:

  - Made the column `image` on table `Product` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Product" ALTER COLUMN "image" SET NOT NULL,
ALTER COLUMN "image" DROP DEFAULT;

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "avatar" SET DEFAULT 'https://res.cloudinary.com/dr98sm712/image/upload/v1712373133/guest-user_it2nym.png';
