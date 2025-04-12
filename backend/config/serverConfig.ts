import express from 'express';
import cors from 'cors';
import ExpressServer from '../models/expressServer';
import router from '../routes/note';

const server = new ExpressServer(process.env.PORT || '8080');

server.setStaticPath('public'); // Establecer la ruta para los archivos estaticos
server.setMiddlewares([cors, express.json]); // Agregar al arreglo la referencia de cada uno de los middlewares a ejecutar
server.setRoutes([{ path: '/api/notes', router }]); // Agregar cada ruta de la app en su respectivo objeto dentro de un mismo arreglo

export default server;