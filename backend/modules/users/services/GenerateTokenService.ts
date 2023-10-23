import {sign} from "jsonwebtoken";

export interface IGenerateTokenCommand {
    userId: string
}

export default function generateToken(command: IGenerateTokenCommand): string {

    return sign({
        id: command.userId
    }, process.env.JWT_SECRET!, {
        algorithm: "HS256"
    });

}