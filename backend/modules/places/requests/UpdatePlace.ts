import {checkSchema} from "express-validator";

export const updatePlaceSchema = checkSchema({
    name: {
        isString: true,
        isLength: {
            options: {
                min: 1
            }
        }
    },
    description: {
        isString: true
    },
    imageUrl: {
        optional: true,
        isString: true
    },
    tags: {
        isArray: true
    }
}, ["body"]);