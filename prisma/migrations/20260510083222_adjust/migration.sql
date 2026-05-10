/*
  Warnings:

  - Made the column `image` on table `products` required. This step will fail if there are existing NULL values in that column.
  - Made the column `detailDesc` on table `products` required. This step will fail if there are existing NULL values in that column.
  - Made the column `shortDesc` on table `products` required. This step will fail if there are existing NULL values in that column.
  - Made the column `factory` on table `products` required. This step will fail if there are existing NULL values in that column.
  - Made the column `target` on table `products` required. This step will fail if there are existing NULL values in that column.
  - Made the column `accountType` on table `users` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `products` MODIFY `image` VARCHAR(255) NOT NULL,
    MODIFY `detailDesc` VARCHAR(255) NOT NULL,
    MODIFY `shortDesc` VARCHAR(255) NOT NULL,
    MODIFY `factory` VARCHAR(255) NOT NULL,
    MODIFY `target` VARCHAR(255) NOT NULL;

-- AlterTable
ALTER TABLE `users` MODIFY `accountType` VARCHAR(255) NOT NULL;
