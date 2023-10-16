import {ValidationChain, validationResult} from "express-validator";
import {Request, Response, NextFunction, RequestHandler} from "express";
import {StatusCodes} from "http-status-codes";

export default function validate(validations: ValidationChain[]): RequestHandler {

    return async (req: Request, res: Response, next: NextFunction) => {

        for (let validation of validations) {

            const result = await validation.run(req);
            if (result.context.errors.length){

                const errors = validationResult(req);
                return res
                    .status(StatusCodes.BAD_REQUEST)
                    .json({
                        errors: errors.array()
                    });

            }

        }

        next();

    }

}