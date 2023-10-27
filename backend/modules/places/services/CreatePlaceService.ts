import {IPlace} from "../../../models/Place";
import {randomUUID} from "crypto";
import {PlacesRepository} from "../PlacesRepository";
import Result from "../../../core/Result";

export interface ICreatePlaceCommand {
    creatorId: string
    name: string
    address: string
    latitude: number
    longitude: number
    imageUrl?: string
}

export interface ICreatedPlace extends ICreatePlaceCommand {
    id: string
}

export default async function createPlace(command: ICreatePlaceCommand): Promise<Result<IPlace>> {

    const place: IPlace = {
        id: randomUUID(),
        creatorId: command.creatorId,
        name: command.name,
        address: command.address,
        coordinates: [command.longitude, command.latitude],
        imageUrl: command.imageUrl,
    }
    await PlacesRepository.createPlace(place);
    return Result.result(place);

}