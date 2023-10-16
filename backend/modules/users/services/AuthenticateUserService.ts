import {UserModel} from "../../../models/User";
import {compare} from "bcrypt";
import {sign} from "jsonwebtoken";

export interface IAuthenticateUserCommand {
    email: string,
    password: string
}

export interface IAuthenticatedUser {
    name: string,
    email: string,
    token: string
}

export default async function authenticateUser(command: IAuthenticateUserCommand): Promise<IAuthenticatedUser | null> {

    const user = await UserModel.findOne({email: command.email});
    if (!user) return null;

    const verified = await compare(command.password, user.hash);
    if (!verified) return null;

    const token = sign({
        id: user.id
    }, process.env.JWT_SECRET!, {
        algorithm: "HS256"
    });

    return {
        name: user.name,
        email: user.email,
        token
    }

}