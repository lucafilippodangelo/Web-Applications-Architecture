import {NextFunction, Request, Response} from "express";
import {ErrorModel} from "../models";
import {randomUUID} from "crypto";
import {now} from "mongoose";
import StatusCodes from "http-status-codes";

interface IErrorResponse {
    message: string
    error?: string
    stackTrace?: string
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
    } catch (e) {
        console.error("Failed to write error to MongoDB", e);
    }

    const response: IErrorResponse = {
        message: `An unexpected error has occurred. Error ID: ${error.id}`,
        error: err.message,
        stackTrace: err.stack
    }

    try {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(response);
    } catch {
        next()
    }

}