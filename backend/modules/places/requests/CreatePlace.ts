import {checkSchema} from "express-validator";

export const createPlaceSchema = checkSchema({
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
    address: {
        isString: true,
        isLength: {
            options: {
                min: 1
            }
        }
    },
    imageUrl: {
        optional: true,
        isString: true
    },
    tags: {
        isArray: true
    }
}, ["body"]);