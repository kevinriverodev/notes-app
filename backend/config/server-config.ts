import express from 'express';
import cors from 'cors';

import ExpressServer from '../models/expressServer';
import { noteRouter }  from '../routes/note';
import { userRouter } from '../routes/user';
import { authRouter } from '../routes/auth';

const server = new ExpressServer(process.env.PORT || '8080');

server.setStaticPath('public'); // Establecer la ruta para los archivos estaticos

server.setMiddlewares([
    () => cors({ origin: 'http://localhost:5173' }),
    express.json
]); // Agregar al arreglo la referencia de cada uno de los middlewares a ejecutar

server.setRoutes([
    { path: '/api/notes', router: noteRouter }, 
    { path: '/api/users', router: userRouter },
    { path: '/api/auth', router: authRouter }
]); // Agregar cada ruta de la app en su respectivo objeto dentro de un mismo arreglo

export default server;