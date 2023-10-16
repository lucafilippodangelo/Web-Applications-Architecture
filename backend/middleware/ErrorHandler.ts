import {Request, Response} from "express";
import {ErrorModel} from "../models/Error";
import {randomUUID} from "crypto";
import {now} from "mongoose";
import StatusCodes from "http-status-codes";

interface IErrorResponse {
    message: string
}

export default async function handleErrors(err: Error, req: Request, res: Response): Promise<void> {

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
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(response);

}