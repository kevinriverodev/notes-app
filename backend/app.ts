import dotenv from 'dotenv';
import cors from 'cors';
import ExpressServer from './models/expressServer';
import express from 'express';
import router from './routes/notes';
import DBConection from './models/dbConnection';

dotenv.config();

const db = new DBConection(null, null, null, null, 'mysql'); // Se estan utilizando las variables de entorno desde la clase, se pueden definir aqui al realizar una nueva instancia
const server = new ExpressServer(process.env.PORT || '8080');

db.getConnection();
server.setStaticPath('public'); // Establecer la ruta para los archivos estaticos de la app
server.setMiddlewares([cors, express.json]); // Agregar al arreglo la referencia de cada uno de los middlewares a ejecutar
server.setRoutes([{ path: '/api/notes', router }]); // Agregar cada ruta de la app en su respectivo objeto dentro de un mismo arreglo

server.listen();