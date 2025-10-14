import express from "express";
import cors from "cors";
import pino from "pino";
import pinoHttp from "pino-http";
import getEnvVar from "./utils/getEnvVar.js";
import router from "./routers/index.js";
import errorHandler from "./middlewares/errorHandler.js";
import notFoundHandler from "./middlewares/notFoundHandler.js";
import cookieParser from "cookie-parser";
import path from "node:path";

const PORT = Number(getEnvVar("PORT") || 8080);

export default function setupServer() {
    const app = express();

    app.use(express.json());
    
    app.use(cors());

    app.use(cookieParser());
    
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

    app.use("/avatars", express.static(path.resolve("src", "uploads", "avatars")));

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

