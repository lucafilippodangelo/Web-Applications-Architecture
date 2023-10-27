import {IPlace, PlaceModel} from "../../models/Place";
import ICoordinates from "../../core/ICoordinates";

export interface IPlacesRepository {
    findAllPlaces(): Promise<IPlace[]>

    findPlaceById(placeId: string): Promise<IPlace | null>

    findAllPlacesByUser(userId: string): Promise<IPlace[]>

    findAllPlacesSortedByDistanceFromCoordinates(coordinates: ICoordinates): Promise<IPlace[]>

    createPlace(place: IPlace): Promise<void>

    deletePlace(placeId: string): Promise<void>

    updatePlace(place: IPlace): Promise<void>
}

class PlacesRepositoryInternal implements IPlacesRepository {

    findAllPlaces(): Promise<IPlace[]> {

        return PlaceModel.find({}, null, {sort: "name"});

    }

    findPlaceById(placeId: string): Promise<IPlace | null> {

        return PlaceModel.findOne({id: placeId});
    }

    findAllPlacesByUser(userId: string): Promise<IPlace[]> {

        return PlaceModel.find({creatorId: userId}, null, {sort: "name"});

    }

    findAllPlacesSortedByDistanceFromCoordinates(coordinates: ICoordinates): Promise<IPlace[]> {

        throw Error("Not implemented");

    }

    async createPlace(place: IPlace): Promise<void> {

        const placeModel = new PlaceModel(place);
        await placeModel.save();

    }

    async deletePlace(placeId: string): Promise<void> {

        await PlaceModel.deleteOne({id: placeId});

    }

    async updatePlace(place: IPlace): Promise<void> {

        await PlaceModel.findOneAndUpdate({id: place.id}, place);

    }

}

export const PlacesRepository = new PlacesRepositoryInternal() as IPlacesRepository