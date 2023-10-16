import {IPlace, PlaceModel} from "../../models/Place";
import ICoordinates from "../../core/ICoordinates";
import {Document, ObjectId} from "mongoose";

export async function FindAllPlaces(): Promise<IPlace[]> {

    return PlaceModel.find({});

}

export function FindAllPlacesSortedByDistanceFromCoordinates(coordinates: ICoordinates): IPlace[] {

    throw Error("Not implemented");

}

export async function CreatePlace(place: IPlace): Promise<void> {

    const placeModel = new PlaceModel(place);
    await placeModel.save();

}