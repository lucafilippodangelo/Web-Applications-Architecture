import {checkSchema} from "express-validator";

export interface IAuthenticateUserRequest {
    email: string
    password: string
}

export const authenticateUserSchema = checkSchema({
    email: {
        isEmail: true
    },
    password: {
        isLength: {
            options: {min: 1}
        }
    }
}, ["body"]);