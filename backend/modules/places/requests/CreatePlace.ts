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
    address: {
        isString: true,
        isLength: {
            options: {
                min: 1
            }
        }
    },
    latitude: {
        isNumeric: true
    },
    longitude: {
        isNumeric: true
    },
    imageUrl: {
        optional: true,
        isString: true
    }
}, ["body"]);