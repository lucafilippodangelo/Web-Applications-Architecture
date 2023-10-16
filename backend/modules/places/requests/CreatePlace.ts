import {checkSchema} from "express-validator";

export interface ICreatePlaceRequest {
    name: string
    latitude: number
    longitude: number
}

export const createPlaceSchema = checkSchema({
    name: {
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
    }
}, ["body"]);