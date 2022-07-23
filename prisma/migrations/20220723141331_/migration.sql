/*
  Warnings:

  - You are about to alter the column `size` on the `product` table. The data in that column could be lost. The data in that column will be cast from `VarChar(45)` to `Int`.

*/
-- AlterTable
ALTER TABLE `product` MODIFY `size` INTEGER NOT NULL;
