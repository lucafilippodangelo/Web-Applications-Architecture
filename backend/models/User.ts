import {model, Schema} from "mongoose";

export interface IUser {
    id: string,
    name: string,
    email: string,
    hash: string,
    imageUrl?: string
}

const userSchema = new Schema<IUser>({
    id: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    hash: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String,
        required: false
    }
});

export const UserModel = model<IUser>("user", userSchema);