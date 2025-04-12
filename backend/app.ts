import dotenv from 'dotenv';

import server from "./config/serverConfig";

const main = async () => {
    dotenv.config();

    server.listen();
}

main();