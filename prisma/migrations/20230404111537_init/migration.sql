/*
  Warnings:

  - Added the required column `size` to the `BoughtProducts` table without a default value. This is not possible if the table is not empty.
  - Added the required column `price` to the `Products` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "BoughtProducts" ADD COLUMN     "size" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Products" ADD COLUMN     "price" TEXT NOT NULL;
