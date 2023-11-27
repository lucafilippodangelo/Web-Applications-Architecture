import {IPlace} from "../../../models/Place";
import Result from "../../../core/Result";
import {PlacesRepository} from "../PlacesRepository";
import StatusCodes from "http-status-codes";

export interface IFindPlaceCommand {
    id: string
}

export default async function findPlace(command: IFindPlaceCommand): Promise<Result<IPlace>> {

    const place = await PlacesRepository.findPlaceById(command.id);
    if(!place) return Result.error(`Place cannot be found with ID: ${command.id}`, StatusCodes.NOT_FOUND);

    return Result.result({
        id: place.id,
        creatorId: place.creatorId,
        name: place.name,
        address: place.address,
        description: place.description,
        coordinates: place.coordinates,
        imageUrl: place.imageUrl,
        tags: place.tags
    });

}