/*
  Warnings:

  - You are about to alter the column `name` on the `Trip` table. The data in that column could be lost. The data in that column will be cast from `VarChar(255)` to `VarChar(191)`.
  - You are about to alter the column `name` on the `User` table. The data in that column could be lost. The data in that column will be cast from `VarChar(255)` to `VarChar(191)`.
  - You are about to alter the column `email` on the `User` table. The data in that column could be lost. The data in that column will be cast from `VarChar(255)` to `VarChar(191)`.
  - You are about to alter the column `password` on the `User` table. The data in that column could be lost. The data in that column will be cast from `VarChar(255)` to `VarChar(191)`.

*/
-- DropForeignKey
ALTER TABLE `GpsPoint` DROP FOREIGN KEY `gps_points_tripId_fkey`;

-- DropForeignKey
ALTER TABLE `Trip` DROP FOREIGN KEY `trips_userId_fkey`;

-- DropIndex
DROP INDEX `gps_points_tripId_sequence_idx` ON `GpsPoint`;

-- DropIndex
DROP INDEX `trips_userId_createdAt_idx` ON `Trip`;

-- AlterTable
ALTER TABLE `GpsPoint` MODIFY `ignition` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `Trip` MODIFY `name` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `User` MODIFY `name` VARCHAR(191) NOT NULL,
    MODIFY `email` VARCHAR(191) NOT NULL,
    MODIFY `password` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `Trip` ADD CONSTRAINT `Trip_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `GpsPoint` ADD CONSTRAINT `GpsPoint_tripId_fkey` FOREIGN KEY (`tripId`) REFERENCES `Trip`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- RenameIndex
ALTER TABLE `User` RENAME INDEX `users_email_key` TO `User_email_key`;
