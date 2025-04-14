import dotenv from 'dotenv';

import server from './config/server-config';

const main = async () => {
    dotenv.config();

    server.listen();
}

main();