import {NextFunction, Request, Response} from "express";
import {verify} from "jsonwebtoken";
import StatusCodes from "http-status-codes";
import {IUser} from "../core/IUser";

export default function authenticate(req: Request, res: Response, next: NextFunction) {

    const token = req.header("Authorization");
    if (!token) return unauthorized(res);

    try {
        req.user = verify(token, process.env.JWT_SECRET!) as IUser;
        next();
    } catch {
        return unauthorized(res);
    }

}

function unauthorized(res: Response) {

    res.status(StatusCodes.UNAUTHORIZED).json({
        message: "Invalid credentials provided"
    });

}