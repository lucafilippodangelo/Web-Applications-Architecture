import {checkSchema} from "express-validator";

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