import {model, Schema} from "mongoose";

export interface IUser {
    id: string,
    name: string,
    email: string,
    hash: string,
    salt: string
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
    salt: {
        type: String,
        required: true
    }
});

export const UserModel = model<IUser>("user", userSchema);