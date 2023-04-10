/*
  Warnings:

  - You are about to drop the `BoughtProducts` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "BoughtProducts" DROP CONSTRAINT "BoughtProducts_productId_fkey";

-- DropForeignKey
ALTER TABLE "BoughtProducts" DROP CONSTRAINT "BoughtProducts_userId_fkey";

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "image" SET DEFAULT E'https://img.freepik.com/premium-vector/person-avatar-design_24877-38130.jpg?w=2000';

-- DropTable
DROP TABLE "BoughtProducts";

-- CreateTable
CREATE TABLE "BagProducts" (
    "id" SERIAL NOT NULL,
    "productId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    "size" TEXT NOT NULL,

    CONSTRAINT "BagProducts_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "BagProducts" ADD CONSTRAINT "BagProducts_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BagProducts" ADD CONSTRAINT "BagProducts_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Products"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
