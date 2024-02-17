/*
  Warnings:

  - You are about to drop the column `grandTotal` on the `orders` table. All the data in the column will be lost.
  - You are about to drop the column `totalOngkir` on the `orders` table. All the data in the column will be lost.
  - You are about to drop the column `totalOrder` on the `orders` table. All the data in the column will be lost.
  - Added the required column `grand_total` to the `orders` table without a default value. This is not possible if the table is not empty.
  - Added the required column `total_ongkir` to the `orders` table without a default value. This is not possible if the table is not empty.
  - Added the required column `total_order` to the `orders` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `orders` DROP COLUMN `grandTotal`,
    DROP COLUMN `totalOngkir`,
    DROP COLUMN `totalOrder`,
    ADD COLUMN `grand_total` DOUBLE NOT NULL,
    ADD COLUMN `total_ongkir` DOUBLE NOT NULL,
    ADD COLUMN `total_order` DOUBLE NOT NULL;
