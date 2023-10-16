import {IPlace} from "../../../models/Place";
import {randomUUID} from "crypto";
import {PlacesRepository} from "../PlacesRepository";

export interface ICreatePlaceCommand {
    creatorId: string,
    name: string,
    latitude: number,
    longitude: number
}

export interface ICreatedPlace extends ICreatePlaceCommand {
    id: string
}

export default async function createPlace(command: ICreatePlaceCommand): Promise<ICreatedPlace> {

    const place: IPlace = {
        id: randomUUID(),
        creatorId: command.creatorId,
        name: command.name,
        coordinates: [command.longitude, command.latitude]
    }
    await PlacesRepository.createPlace(place);
    return {
        id: place.id,
        creatorId: command.creatorId,
        name: command.name,
        latitude: command.latitude,
        longitude: command.longitude
    }

}