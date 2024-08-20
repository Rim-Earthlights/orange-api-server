-- CreateTable
CREATE TABLE `User` (
    `id` BIGINT NOT NULL,
    `user_name` VARCHAR(191) NOT NULL,
    `nick_name` VARCHAR(191) NULL,
    `gender` INTEGER NULL,
    `address` VARCHAR(191) NULL,
    `birth_date` DATETIME(3) NULL,
    `pick_left` INTEGER NOT NULL DEFAULT 0,
    `voice_id` INTEGER NOT NULL DEFAULT 3,
    `voice_speed` DOUBLE NOT NULL DEFAULT 1.0,
    `grant` INTEGER NOT NULL DEFAULT 0,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,
    `deleted_at` DATETIME(3) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
