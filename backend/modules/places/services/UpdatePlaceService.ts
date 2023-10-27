import Result from "../../../core/Result";
import {IPlace} from "../../../models/Place";
import {randomUUID} from "crypto";
import {PlacesRepository} from "../PlacesRepository";
import StatusCodes from "http-status-codes";

export interface IUpdatePlaceCommand {
    id: string
    creatorId: string
    name: string
    address: string
    description: string
    imageUrl?: string
}

export default async function updatePlace(command: IUpdatePlaceCommand): Promise<Result<IPlace>> {

    const place = await PlacesRepository.findPlaceById(command.id);
    if(!place) return Result.error(`Cannot find place with ID: ${command.id}`);
    if(place.creatorId != command.creatorId) return Result.error("You are not the creator of this place", StatusCodes.FORBIDDEN);

    const updatedPlace: IPlace = {
        ...command,
        coordinates: [0, 0]
    }
    await PlacesRepository.updatePlace(updatedPlace);
    return Result.result(updatedPlace);

}