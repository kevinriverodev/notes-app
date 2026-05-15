import dotenv from "dotenv";
dotenv.config();
import server from "./config/server-config";

const main = () => {
    try {
        server.listen();
    } catch (error) {
        console.error("Failed to start the server:", error);
        process.exit(1);
    }
};

main();