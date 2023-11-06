import {checkSchema} from "express-validator";

const passwordNegativeRegex = new RegExp("^(.{0,4}|[^0-9]*|[^A-Z]*)$");

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
        errorMessage: "Password must contain 1 uppercase letter, 1 number and be a minimum of 5 characters in length",
        custom: {
            options: v => !passwordNegativeRegex.test(v)
        }
    },
    imageUrl: {
        isString: true,
        optional: true
    }
}, ["body"]);