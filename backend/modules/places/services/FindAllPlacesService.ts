import {IPlace} from "../../../models/Place";
import {PlacesRepository} from "../PlacesRepository";

export interface IFindAllPlacesCommand {
    latitude?: number,
    longitude?: number
}

export default function FindAllPlaces(command: IFindAllPlacesCommand): Promise<IPlace[]> {

    const useLocationBias = Boolean((command.latitude) && (command.longitude));

    if (useLocationBias) {

    }

    return PlacesRepository.findAllPlaces();

}