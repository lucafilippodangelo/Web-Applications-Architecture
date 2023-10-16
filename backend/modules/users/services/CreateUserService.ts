import {UserModel} from "../../../models/User";
import {randomUUID} from "crypto";
import {hash} from "bcrypt";

export interface ICreateUserCommand {
    name: string,
    email: string,
    password: string
}

export interface ICreatedUser {
    id: string,
    name: string,
    email: string
}

export default async function createUser(command: ICreateUserCommand): Promise<ICreatedUser | string> {

    const existingUserCount = await UserModel.count({email: command.email});
    if (existingUserCount > 0) return "User already exists with this email";

    const saltRounds = Number(process.env.BCRYPT_SALT_ROUNDS!);
    const passwordHash = await hash(command.password, saltRounds);
    const user = new UserModel({
        id: randomUUID(),
        name: command.name,
        email: command.email,
        hash: passwordHash
    });
    await user.save();

    return {
        id: user.id,
        name: user.name,
        email: user.email
    }

}