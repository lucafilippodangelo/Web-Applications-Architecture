import {model, Schema} from "mongoose";

export interface IError {
    id: string,
    name: string,
    message: string,
    stackTrace: string,
    request: IErrorRequest,
    timestamp: string
}

export interface IErrorRequest {
    method: string,
    url: string
}

const requestSchema = new Schema<IErrorRequest>({
    method: {
        type: String,
        required: true
    },
    url: {
        type: String,
        required: true
    }
});

const errorSchema = new Schema<IError>({
    id: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    },
    stackTrace: {
        type: String,
        required: true
    },
    request: requestSchema,
    timestamp: {
        type: String,
        required: true
    }
});

export const ErrorModel = model<IError>("error", errorSchema);