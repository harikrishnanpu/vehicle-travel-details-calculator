-- AlterTable
ALTER TABLE `trips` ADD COLUMN `overspeedDurationSec` INTEGER NOT NULL DEFAULT 0,
    ADD COLUMN `overspeedDistanceM` DOUBLE NOT NULL DEFAULT 0;
