import {checkSchema, query} from "express-validator";

export interface IFindAllPlacesRequest {
    latitude?: number
    longitude?: number
}

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
    }
}, ["query"]);