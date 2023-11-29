import Result from "../../../core/Result";
import {IPlace} from "../../../models/Place";
import {PlacesRepository} from "../PlacesRepository";
import StatusCodes from "http-status-codes";

export interface IUpdatePlaceCommand {
    id: string
    creatorId: string
    name: string
    description: string
    imageUrl?: string
    tags: string[]
}

export default async function updatePlace(command: IUpdatePlaceCommand): Promise<Result<IPlace>> {

    const place = await PlacesRepository.findPlaceById(command.id);
    if(!place) return Result.error(`Cannot find place with ID: ${command.id}`);
    if(place.creatorId != command.creatorId) return Result.error("You are not the creator of this place", StatusCodes.FORBIDDEN);

    const updatedPlace: IPlace = {
        id: place.id,
        creatorId: place.creatorId,
        name: command.name,
        address: place.address,
        description: command.description,
        tags: command.tags,
        coordinates: place.coordinates
    }
    await PlacesRepository.updatePlace(updatedPlace);
    return Result.result(updatedPlace);

}