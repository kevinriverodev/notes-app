--CREATE database `notesapp`;

DROP TABLE IF EXISTS `notesapp`.`notes`;
DROP TABLE IF EXISTS `notesapp`.`users`;

CREATE TABLE `notesapp`.`users` (
    `id` BIGINT AUTO_INCREMENT PRIMARY KEY,
    `username` VARCHAR(50) NOT NULL,
    `firstName` VARCHAR(100) NOT NULL,
    `lastName` VARCHAR(100) NOT NULL,
    `email` VARCHAR(100) NOT NULL,
    `password` VARCHAR(100) NOT NULL,
    `role` VARCHAR(20) NOT NULL,
    `status` TINYINT NOT NULL DEFAULT '1',
    `createdAt` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `updatedAt` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO `users` (`id`, `username`, `firstName`, `lastName`, `email`, `password`, `role`, `status`, `createdAt`, `updatedAt`) VALUES
(1, 'kevingrivero', 'Kevin', 'Rivero', 'kevinriverodev@gmail.com', '$2b$10$pqQ5mPBy/yICL3FuOEltyO/NfZOtZ2kV23T5FE.5sWaDyUv173mSS', 'ADMIN', 1, '2025-04-12 04:30:18', '2025-04-12 04:30:18'),
(2, 'usertest2', 'User', 'Test2', 'usertest2@gmail.com', '$2b$10$pqQ5mPBy/yICL3FuOEltyO/NfZOtZ2kV23T5FE.5sWaDyUv173mSS', 'USER', 1, '2025-04-12 04:30:18', '2025-04-12 04:30:18');

CREATE TABLE `notesapp`.`notes` (
    `id` BIGINT AUTO_INCREMENT PRIMARY KEY,
    `title` VARCHAR(255) NOT NULL,
    `description` VARCHAR(255) NOT NULL,
    `status` TINYINT NOT NULL DEFAULT '1',
    `createdAt` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `updatedAt` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `userId`  bigint(20) NOT NULL,
    FOREIGN KEY (`userId`) REFERENCES `notesapp`.`users` (`id`)
);

INSERT INTO `notes` (`id`, `title`, `description`, `status`, `createdAt`, `updatedAt`, `userId`) VALUES 
(1, 'Nota de prueba1', 'Descripcion de una nota de prueba 1', 1, '2025-04-12 04:30:18', '2025-04-12 04:30:18', 1),
(2, 'Nota de prueba2', 'Descripcion de una nota de prueba 2', 1, '2025-04-12 04:30:18', '2025-04-12 04:30:18', 1),
(3, 'Nota de prueba3', 'Descripcion de una nota de prueba 3', 1, '2025-04-12 04:30:18', '2025-04-12 04:30:18', 1),
(4, 'Nota de prueba4', 'Descripcion de una nota de prueba 4', 1, '2025-04-12 04:30:18', '2025-04-12 04:30:18', 1),
(5, 'Nota de prueba5', 'Descripcion de una nota de prueba 5', 1, '2025-04-12 04:30:18', '2025-04-12 04:30:18', 1),
(6, 'Nota de prueba6', 'Descripcion de una nota de prueba 6', 1, '2025-04-12 04:30:18', '2025-04-12 04:30:18', 1),
(7, 'Nota de prueba7', 'Descripcion de una nota de prueba 7', 1, '2025-04-12 04:30:18', '2025-04-12 04:30:18', 1),
(8, 'Nota de prueba8', 'Descripcion de una nota de prueba 8', 1, '2025-04-12 04:30:18', '2025-04-12 04:30:18', 2),
(9, 'Nota de prueba9', 'Descripcion de una nota de prueba 9', 1, '2025-04-12 04:30:18', '2025-04-12 04:30:18', 2),
(10, 'Nota de prueba10', 'Descripcion de una nota de prueba 10', 1, '2025-04-12 04:30:18', '2025-04-12 04:30:18', 2);

ALTER TABLE `notesapp`.`users` ADD UNIQUE INDEX `email` (`email`) USING BTREE;
ALTER TABLE `notesapp`.`users` ADD UNIQUE INDEX `username` (`username`) USING BTREE;