import {model, Schema} from "mongoose";

export interface IPlace {
    id: string,
    name: string,
    latitude: number,
    longitude: number,
}

const placeSchema = new Schema<IPlace>({
    id: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    latitude: {
        type: Number,
        required: true
    },
    longitude: {
        type: Number,
        required: true
    }
});

export const PlaceModel = model<IPlace>("place", placeSchema);