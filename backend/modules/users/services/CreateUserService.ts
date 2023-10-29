import {UserModel} from "../../../models";
import {randomUUID} from "crypto";
import {hash} from "bcrypt";
import {UsersRepository} from "../UsersRepository";
import Result from "../../../core/Result";
import {IUser} from "../../../models/User";
import generateToken from "./GenerateTokenService";

export interface ICreateUserCommand {
    name: string,
    email: string,
    password: string,
    imageUrl?: string
}

export interface ICreatedUser extends IUser {
    token: string
}

export default async function createUser(command: ICreateUserCommand): Promise<Result<ICreatedUser>> {

    const existingUser = await UsersRepository.findUserByEmail(command.email);
    if (existingUser) return Result.error("User already exists with this email");

    const saltRounds = Number(process.env.BCRYPT_SALT_ROUNDS!);
    const passwordHash = await hash(command.password, saltRounds);
    const user = new UserModel({
        id: randomUUID(),
        name: command.name,
        email: command.email,
        hash: passwordHash,
        imageUrl: command.imageUrl
    });
    await user.save();

    const token = generateToken({userId: user.id});
    return Result.result({
        id: user.id,
        name: user.name,
        email: user.email,
        hash: user.hash,
        imageUrl: user.imageUrl,
        token
    });

}