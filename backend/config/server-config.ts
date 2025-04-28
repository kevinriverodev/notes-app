import express from 'express';
import cors from 'cors';
import  cookieParser from 'cookie-parser';

import ExpressServer from '../models/expressServer';
import { noteRouter }  from '../routes/note';
import { userRouter } from '../routes/user';
import { authRouter } from '../routes/auth';

const server = new ExpressServer(process.env.PORT || '8080');

server.setStaticPath('public');

server.setMiddlewares([
    () => cors({ origin: 'http://localhost:5173', credentials: true }),
    cookieParser,
    express.json
]); // Agregar al arreglo la referencia de cada uno de los middlewares a establecer

server.setRoutes([
    { path: '/api/notes', router: noteRouter }, 
    { path: '/api/users', router: userRouter },
    { path: '/api/auth', router: authRouter }
]); // Agregar un array con un objeto por cada ruta de la app

export default server;