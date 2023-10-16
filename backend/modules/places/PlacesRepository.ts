import {IPlace, PlaceModel} from "../../models/Place";
import ICoordinates from "../../core/ICoordinates";
import {Document, ObjectId} from "mongoose";
import exp from "constants";

export interface IPlacesRepository {
    findAllPlaces(): Promise<IPlace[]>
    findAllPlacesSortedByDistanceFromCoordinates(coordinates: ICoordinates): IPlace[]
    createPlace(place: IPlace): Promise<void>
}

class PlacesRepositoryInternal implements IPlacesRepository {

    findAllPlaces(): Promise<IPlace[]> {

        return PlaceModel.find({});

    }

    findAllPlacesSortedByDistanceFromCoordinates(coordinates: ICoordinates): IPlace[] {

        throw Error("Not implemented");

    }

     async createPlace(place: IPlace): Promise<void> {

        const placeModel = new PlaceModel(place);
        await placeModel.save();

    }

}

export const PlacesRepository = new PlacesRepositoryInternal() as IPlacesRepository