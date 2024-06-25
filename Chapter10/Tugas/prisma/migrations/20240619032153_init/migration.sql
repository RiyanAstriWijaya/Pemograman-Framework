-- CreateTable
CREATE TABLE `user` (
    `id` VARCHAR(50) NOT NULL,
    `email` VARCHAR(100) NOT NULL,
    `verified_email` BOOLEAN NOT NULL DEFAULT false,
    `name` VARCHAR(100) NOT NULL,
    `given_name` VARCHAR(100) NOT NULL,
    `family_name` VARCHAR(100) NOT NULL,
    `picture` TEXT NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
