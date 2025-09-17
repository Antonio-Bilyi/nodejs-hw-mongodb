import express from "express";
import cors from "cors";
import pino from "pino";
import pinoHttp from "pino-http";
import getEnvVar from "./utils/getEnvVar.js";
import router from "./routers/contacts.js";
import errorHandler from "./middlewares/errorHandler.js"
import notFoundHandler from "./middlewares/notFoundHandler.js"

const PORT = Number(getEnvVar("PORT") || 8080);

export default function setupServer() {
    const app = express();

    app.use(express.json());
    
    //CORS SETTINGS//
    app.use(cors());
    
    //PINO SETTINGS//
    const logger = pino({
        transport: {
            target: "pino-pretty",
            options: { colorize: true }
        }
    });

    app.use(pinoHttp({ logger }));

    app.get("/", (req, res) => {
        res.status(200).json({ message: "API is running" });
    });

    app.use(router);

    app.use(notFoundHandler);

    app.use(errorHandler);

    app.listen(PORT, (error) => {
        if (error) {
            throw error;
        }

        console.log(`Server is running on port ${PORT}`);
    });
}

