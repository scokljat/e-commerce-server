/*
  Warnings:

  - You are about to drop the column `quantity` on the `Products` table. All the data in the column will be lost.
  - Added the required column `quantity` to the `BagProducts` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "BagProducts" ADD COLUMN     "quantity" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Products" DROP COLUMN "quantity";
