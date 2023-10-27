import {Response} from "express";
import StatusCodes from "http-status-codes";

interface IError {
    message: string
    statusCode: number
}

export default class Result<T> {

    private readonly data?: T;
    private readonly error?: IError;

    private constructor(data?: T, error?: IError) {
        this.data = data;
        this.error = error;
    }

    static result<T>(data: T): Result<T> {
        return new Result<T>(data, undefined);
    }

    static error<T>(message: string, statusCode: number = StatusCodes.BAD_REQUEST): Result<T> {
        return new Result<T>(undefined, {
            message,
            statusCode: statusCode ?? StatusCodes.BAD_REQUEST
        });
    }

    evaluate(action: (result: T) => void, res: Response): void {

        if (this.error) {
            res.status(this.error.statusCode).json({
                message: this.error.message
            });
            return;
        }

        action(this.data!);

    }

}