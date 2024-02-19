/*
  Warnings:

  - You are about to drop the column `total` on the `orders` table. All the data in the column will be lost.
  - Added the required column `destination` to the `orders` table without a default value. This is not possible if the table is not empty.
  - Added the required column `grandTotal` to the `orders` table without a default value. This is not possible if the table is not empty.
  - Added the required column `totalOngkir` to the `orders` table without a default value. This is not possible if the table is not empty.
  - Added the required column `totalOrder` to the `orders` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `orders` DROP COLUMN `total`,
    ADD COLUMN `destination` INTEGER NOT NULL,
    ADD COLUMN `grandTotal` DOUBLE NOT NULL,
    ADD COLUMN `totalOngkir` DOUBLE NOT NULL,
    ADD COLUMN `totalOrder` DOUBLE NOT NULL;
