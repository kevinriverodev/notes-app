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
(1, 'userAdmin', 'User', 'Admin', 'useradmin@gmail.com', '$2b$10$pqQ5mPBy/yICL3FuOEltyO/NfZOtZ2kV23T5FE.5sWaDyUv173mSS', 'ADMIN', 1, '2025-04-12 04:30:18', '2025-04-12 04:30:18'),
(2, 'usertest2', 'User', 'Test2', 'usertest2@gmail.com', '$2b$10$pqQ5mPBy/yICL3FuOEltyO/NfZOtZ2kV23T5FE.5sWaDyUv173mSS', 'USER', 1, '2025-04-12 04:30:18', '2025-04-12 04:30:18');

CREATE TABLE `notesapp`.`notes` (
    `id` BIGINT AUTO_INCREMENT PRIMARY KEY,
    `title` VARCHAR(255) NOT NULL,
    `description` TEXT NOT NULL,
    `status` TINYINT NOT NULL DEFAULT '1',
    `createdAt` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `updatedAt` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `userId`  bigint(20) NOT NULL,
    FOREIGN KEY (`userId`) REFERENCES `notesapp`.`users` (`id`)
);

INSERT INTO `notes` (`id`, `title`, `description`, `status`, `createdAt`, `updatedAt`, `userId`) VALUES 
(1, 'Receta torta galleta', '400 gramos de Crema De Galletas Lotus, 100 gramos de Mantequilla, 200 mililitros de Nata Para Montar, 400 gramos de Queso Mascarpone, 3 cucharadas de Azúcar Glas, Crema De Galletas Lotus', 1, '2025-04-12 04:30:18', '2025-04-12 04:30:18', 1),
(2, 'El coltán', 'El coltán es un mineral compuesto principalmente por columbita y tantalita, minerales de los cuales se extraen el niobio y el tantalio, respectivamente. El tantalio se utiliza en la fabricación de condensadores de tantalio, que son componentes clave en dispositivos electrónicos como teléfonos móviles, computadoras, automóviles y cámaras. La extracción de coltán es común en la República Democrática del Congo', 1, '2025-04-12 04:30:18', '2025-04-12 04:30:18', 1),
(3, 'Los pulpos tienen tres corazones', 'Dos corazones bombean sangre hacia sus branquias y el tercero se encarga de distribuirla al resto del cuerpo. Curiosamente, el corazón principal deja de latir cuando nadan.', 1, '2025-04-12 04:30:18', '2025-04-12 04:30:18', 1),
(4, 'La miel nunca caduca', 'Gracias a su composición química y las propiedades antimicrobianas, la miel se conserva prácticamente para siempre. Se han encontrado muestras de miel en tumbas egipcias que aún eran comestibles.', 1, '2025-04-12 04:30:18', '2025-04-12 04:30:18', 1),
(5, 'Los flamencos no son naturalmente rosados', 'Su color rosado proviene de los carotenoides en su dieta, principalmente del consumo de algas y pequeños crustáceos. Sin estos alimentos, serían de color gris o blanco.', 1, '2025-04-12 04:30:18', '2025-04-12 04:30:18', 1),
(6, 'Los árboles pueden comunicarse', 'A través de una red subterránea de hongos conocida como "Wood Wide Web", los árboles comparten recursos y envían señales químicas entre ellos, creando un sistema de cooperación.', 1, '2025-04-12 04:30:18', '2025-04-12 04:30:18', 1),
(7, 'Los tiburones existían antes que los árboles', 'Los tiburones han estado en la Tierra por más de 400 millones de años, mientras que los árboles aparecieron hace aproximadamente 350 millones de años. ¡Ellos son verdaderos fósiles vivientes!', 1, '2025-04-12 04:30:18', '2025-04-12 04:30:18', 1),
(8, 'Los koalas tienen huellas dactilares como los humanos', 'Las huellas dactilares de los koalas son tan similares a las de los humanos que, bajo un microscopio, pueden llegar a confundirse. Esto ha llevado a situaciones curiosas en investigaciones forenses.', 1, '2025-04-12 04:30:18', '2025-04-12 04:30:18', 2),
(9, 'Los plátanos son radiactivos', 'Los plátanos contienen potasio-40, un isótopo radiactivo. Aunque la cantidad de radiación es minúscula y completamente inofensiva, técnicamente los plátanos emiten radiación.', 1, '2025-04-12 04:30:18', '2025-04-12 04:30:18', 2),
(10, 'Las tortugas pueden respirar por su trasero', 'Algunas especies de tortugas, como la tortuga de caparazón blando, tienen estructuras en su cloaca que les permiten absorber oxígeno del agua, facilitando la "respiracion trasera"', 1, '2025-04-12 04:30:18', '2025-04-12 04:30:18', 2);
(11, 'Esta es una nota con texto lorem', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus rutrum malesuada mauris eget rutrum. Nunc id egestas turpis. In vel ex rhoncus ligula rutrum dignissim. Nulla feugiat tincidunt eros. Nulla facilisi. Sed eget condimentum metus, sit amet consectetur erat. Vestibulum fermentum, magna eu elementum tincidunt, lacus diam porttitor erat, et maximus tellus mi at enim. Curabitur venenatis lectus quis lacinia maximus. Morbi nibh erat, blandit id arcu vitae, iaculis varius leo. Morbi interdum lacus non sem tempus, eu tempor elit lacinia. Quisque porttitor elementum fringilla. Nulla semper felis rhoncus gravida accumsan. Cras hendrerit dui risus, eu porta mauris tincidunt sed. Aliquam sagittis lacinia mauris. Sed metus urna, fermentum a ante vitae, interdum egestas dui. Donec tristique nunc et tellus vestibulum tempus. Curabitur id congue diam, a imperdiet augue. Donec interdum dolor et justo blandit, eu efficitur erat hendrerit. Etiam semper feugiat mauris vel auctor. Suspendisse auctor at risus sit amet venenatis. Quisque vel maximus diam, suscipit luctus purus. Suspendisse ornare odio porttitor eros tempor, egestas cursus sapien scelerisque. In hac habitasse platea dictumst. Nam at diam blandit, dapibus risus nec, volutpat eros. Nunc eu nisi nec lectus bibendum aliquam. Nunc viverra massa sem, lobortis accumsan dolor feugiat non. Nunc non magna iaculis, posuere nisi quis, porta sapien. Cras accumsan pretium eros, semper tempus tortor tincidunt ac. Cras iaculis velit sed sem viverra, sit amet fermentum metus cursus. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Maecenas sem felis, suscipit mattis ex a, dignissim rhoncus erat. Donec at auctor velit. Pellentesque ultricies, nunc nec feugiat luctus, diam nunc eleifend tortor, non vulputate mauris sem vitae mi. In vel velit ac risus convallis convallis ultrices eget ipsum.', 1, '2025-04-12 04:30:18', '2025-04-12 04:30:18', 2);

ALTER TABLE `notesapp`.`users` ADD UNIQUE INDEX `email` (`email`) USING BTREE;
ALTER TABLE `notesapp`.`users` ADD UNIQUE INDEX `username` (`username`) USING BTREE;