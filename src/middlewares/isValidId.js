import { isValidObjectId } from "mongoose";
import createHttpError from "http-errors";

export function isValidId(req, res, next) {
    const { contactId } = req.params;

    if (!isValidObjectId(contactId)) {
        throw createHttpError(400, "Bad Request");
    }

    next();
};