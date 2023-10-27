import Result from "../../../core/Result";
import {UsersRepository} from "../UsersRepository";
import {INull} from "../../../core/INull";

export interface IDeleteUserCommand {
    id: string
}

export default async function deleteUser(command: IDeleteUserCommand): Promise<Result<INull>> {

    await UsersRepository.deleteUser(command.id);
    return Result.result({});

}