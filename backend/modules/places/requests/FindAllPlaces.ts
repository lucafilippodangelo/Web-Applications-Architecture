import {checkSchema, query} from "express-validator";

export const findAllPlacesSchema = checkSchema({
    latitude: {
        isNumeric: {
            if: query("longitude").exists()
        }
    },
    longitude: {
        isNumeric: {
            if: query("latitude").exists()
        }
    },
    creatorId: {
        optional: true,
        isString: true
    }
}, ["query"]);