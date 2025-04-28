import dotenv from 'dotenv';
import server from './config/server-config';

const main = () => {
    dotenv.config();

    server.listen();
}

main();