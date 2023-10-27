import {model, Schema} from "mongoose";

export interface IPlace {
    id: string
    creatorId: string
    name: string
    address: string
    description: string
    coordinates: number[]
    imageUrl?: string
    imageContentType?: string
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
    address: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    coordinates: {
        type: [Number],
        required: true
    },
    imageUrl: {
        type: String,
        required: false
    },
    imageContentType: {
        type: String,
        required: false
    },
});

export const PlaceModel = model<IPlace>("place", placeSchema);