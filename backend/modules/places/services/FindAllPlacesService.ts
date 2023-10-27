import {IPlace} from "../../../models/Place";
import {PlacesRepository} from "../PlacesRepository";
import Result from "../../../core/Result";

export interface IFindAllPlacesCommand {
    latitude?: number,
    longitude?: number,
    creatorId?: string
}

export default async function FindAllPlaces(command: IFindAllPlacesCommand): Promise<Result<IPlace[]>> {

    const useLocationBias = Boolean((command.latitude) && (command.longitude));

    if (useLocationBias) {

    }

    if (command.creatorId) {
        return Result.result(await PlacesRepository.findAllPlacesByUser(command.creatorId));
    }

    return Result.result(await PlacesRepository.findAllPlaces());

}