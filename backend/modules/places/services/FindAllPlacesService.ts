import {FindAllPlaces as FindAllPlacesQuery} from "../PlacesRepository";
import {IPlace} from "../../../models/Place";

export interface IFindAllPlacesCommand {
    latitude?: number,
    longitude?: number
}

export default function FindAllPlaces(command: IFindAllPlacesCommand): Promise<IPlace[]> {

    throw new Error("hi");

    const useLocationBias = Boolean((command.latitude) && (command.longitude));

    if (useLocationBias) {

    }

    return FindAllPlacesQuery();

}