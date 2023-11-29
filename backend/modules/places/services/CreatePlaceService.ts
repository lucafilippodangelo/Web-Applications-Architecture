import {IPlace} from "../../../models/Place";
import {randomUUID} from "crypto";
import {PlacesRepository} from "../PlacesRepository";
import Result from "../../../core/Result";
import findAddress from "./AddressService";
import { StatusCodes } from "http-status-codes";
import distinctTags from "../util/DistinctTags";

export interface ICreatePlaceCommand {
    creatorId: string
    name: string
    description: string
    address: string
    imageUrl?: string
    tags: string[]
}

export default async function createPlace(command: ICreatePlaceCommand): Promise<Result<IPlace>> {

    const address = await findAddress(command.address);
    if(!address) return Result.error(`Unable to find place: ${command.address}`, StatusCodes.BAD_REQUEST);

    const place: IPlace = {
        id: randomUUID(),
        ...command,
        tags: distinctTags(command.tags),
        address: address.address,
        coordinates: address.coordinates,
    }
    await PlacesRepository.createPlace(place);
    return Result.result(place);

}