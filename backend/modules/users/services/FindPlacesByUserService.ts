import Result from "../../../core/Result";
import {IPlace} from "../../../models/Place";
import {PlacesRepository} from "../../places/PlacesRepository";

export interface IFindPlacesByUserCommand {
    id: string
}

export default async function findPlacesByUser(command: IFindPlacesByUserCommand): Promise<Result<IPlace[]>> {

    const places = await PlacesRepository.findAllPlacesByUser(command.id);
    return Result.result(places);

}