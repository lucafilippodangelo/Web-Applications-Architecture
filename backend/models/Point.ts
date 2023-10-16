import {model, Schema} from "mongoose";

export interface IPoint {
    type: string,
    coordinates: number[]
}

const pointSchema = new Schema<IPoint>({
    type: {
        type: String,
        enum: ["Point"],
        required: true
    },
    coordinates: {
        type: [Number],
        required: true
    }
});

export const PointModel = model<IPoint>("point", pointSchema);