import {checkSchema} from "express-validator";

export const createUserSchema = checkSchema({
    name: {
        isLength: {
            options: {min: 1}
        }
    },
    email: {
        isEmail: true
    },
    password: {
        errorMessage: "Password must be 8 characters",
        isLength: {
            options: {min: 8}
        }
    }
}, ["body"]);