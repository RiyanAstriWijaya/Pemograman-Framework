-- AlterTable
ALTER TABLE `user` MODIFY `thumbnail` VARCHAR(191) NULL,
    MODIFY `role` ENUM('dkr', 'mhs', 'admins') NOT NULL DEFAULT 'mhs';
