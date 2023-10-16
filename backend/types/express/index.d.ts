import {IUser} from "../../core/IUser";

export {}

declare global {
    namespace Express {
        export interface Request {
            user?: IUser
        }
    }
}