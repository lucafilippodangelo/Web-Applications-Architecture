import {model, Schema} from "mongoose";
import {PointModel} from "./Point";

export interface IPlace {
    id: string,
    creatorId: string,
    name: string,
    coordinates: number[]
}

const placeSchema = new Schema<IPlace>({
    id: {
        type: String,
        required: true
    },
    creatorId: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    coordinates: {
        type: [Number],
        required: true
    }
});

export const PlaceModel = model<IPlace>("place", placeSchema);