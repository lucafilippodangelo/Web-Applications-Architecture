import {Request, Response, NextFunction} from "express";
import {ErrorModel} from "../models/Error";
import {randomUUID} from "crypto";
import {now} from "mongoose";

interface IErrorResponse {
    message: string
}

export default async function handleErrors(err: Error, req: Request, res: Response, next: NextFunction): Promise<void> {

    const error = new ErrorModel({
        id: randomUUID(),
        name: err.name,
        message: err.message,
        stackTrace: err.stack,
        request: {
            method: req.method,
            url: req.url
        },
        timestamp: now()
    });
    try {
        await error.save();
    } catch {
        console.error("Failed to write error to MongoDB");
    }

    const response: IErrorResponse = {
        message: `An unexpected error has occurred. Error ID: ${error.id}`
    }
    res.status(500).json(response);

}