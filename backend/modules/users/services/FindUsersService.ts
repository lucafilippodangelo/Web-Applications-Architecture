import {IUser} from "../../../models/User";
import {UsersRepository} from "../UsersRepository";
import Result from "../../../core/Result";
import {PlacesRepository} from "../../places/PlacesRepository";

export interface IFindUsersCommand {
}

export interface IUserWithPlaceCount extends IUser {
    places: number
}

export default async function findUsers(command: IFindUsersCommand): Promise<Result<IUserWithPlaceCount[]>> {

    const users = await UsersRepository.findUsers();
    const places = await PlacesRepository.findAllPlaces();

    const usersWithPlaceCount: IUserWithPlaceCount[] = users.map(u => {
        return {
            id: u.id,
            name: u.name,
            imageUrl: u.imageUrl,
            email: u.email,
            hash: u.hash,
            places: places.filter(p => p.creatorId === u.id).length
        }
    });
    return Result.result(usersWithPlaceCount);

}