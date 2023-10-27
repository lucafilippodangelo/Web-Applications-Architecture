import {INull} from "../../../core/INull";
import Result from "../../../core/Result";
import {PlacesRepository} from "../PlacesRepository";
import StatusCodes from "http-status-codes";

export interface IDeletePlaceCommand {
    userId: string,
    placeId: string
}

export default async function deletePlace(command: IDeletePlaceCommand): Promise<Result<INull>> {

    const place = await PlacesRepository.findPlaceById(command.placeId);
    if (!place) return Result.error("Place not found", StatusCodes.NOT_FOUND);

    if (place.creatorId != command.userId) return Result.error("Places can only be deleted by their creator", StatusCodes.FORBIDDEN);

    await PlacesRepository.deletePlace(place.id)
    return Result.result({});

}