import express from "express";
import cors from "cors";
import pino from "pino";
import pinoHttp from "pino-http";
import getEnvVar from "./utils/getEnvVar.js";
import { getAllContacts, getContactById } from "./services/contacts.js"

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

    app.get("/contacts", async (req, res) => {
        const contacts = await getAllContacts();
        
        res.json({
            status: 200,
            message: "Successfully found contacts!",
            data: contacts,
        });
    });

    app.get("/contacts/:contactId", async (req, res, next) => {
        const { contactId } = req.params;
        const contact = await getContactById(contactId);

        if (!contact) {
            res.status(404).json({
                message: "Contact not found",
            });

            return;
        }

        res.status(200).json({
            status: 200,
            message: `"Successfully found contact with id ${contactId}!"`,
            data: contact,
        });
    })

  app.use((req, res) => {
    res.status(404).json({ message: "Not Found" });
  });

    app.use((err, req, res, next) => {
        res.status(500).json({
            message: "Something went wrong",
            error: err.message,
        });
    });

    app.listen(PORT, (error) => {
        if (error) {
            throw error;
        }

        console.log(`Server is running on port ${PORT}`);
    });
}

