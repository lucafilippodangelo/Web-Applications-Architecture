import {compare} from "bcrypt";
import {sign} from "jsonwebtoken";
import {UsersRepository} from "../UsersRepository";
import Result from "../../../core/Result";
import StatusCodes from "http-status-codes";
import generateToken from "./GenerateTokenService";

export interface IAuthenticateUserCommand {
    email: string,
    password: string
}

export interface IAuthenticatedUser {
    name: string,
    email: string,
    token: string
}

export default async function authenticateUser(command: IAuthenticateUserCommand): Promise<Result<IAuthenticatedUser>> {

    const authFailed = "Authentication failed";

    const user = await UsersRepository.findUserByEmail(command.email);
    if (!user) return Result.error(authFailed, StatusCodes.UNAUTHORIZED);

    const verified = await compare(command.password, user.hash);
    if (!verified) return Result.error(authFailed, StatusCodes.UNAUTHORIZED);

    const token = generateToken({
        userId: user.id
    });

    return Result.result({
        name: user.name,
        email: user.email,
        token
    });

}