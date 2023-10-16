import {Router} from "express";
import {IFindAllPlacesResponse} from "./responses/IFindAllPlacesResponse";
import findAllPlaces from "./services/FindAllPlacesService";
import validate from "../../middleware/RequestValidator";
import {findAllPlacesSchema} from "./requests/FindAllPlaces";
import authenticate from "../../middleware/Authentication";
import {createPlaceSchema} from "./requests/CreatePlace";
import createPlace, {ICreatePlaceCommand} from "./services/CreatePlaceService";
import {ICreatePlaceResponse} from "./responses/ICreatePlaceResponse";

const router = Router()

router.get("", validate(findAllPlacesSchema), (req, res, next) => {

    findAllPlaces(req.query)
        .then(places => {

            const response: IFindAllPlacesResponse[] = places
                .map(p => {
                    return {
                        id: p.id,
                        creatorId: p.creatorId,
                        name: p.name
                    }
                })


            return res.json(response);

        })
        .catch(next);


});

router.post("", validate(createPlaceSchema), authenticate, (req, res, next) => {

    const command: ICreatePlaceCommand = {
        creatorId: req.user!.id,
        name: req.body.name,
        latitude: req.body.latitude,
        longitude: req.body.longitude
    }
    createPlace(command)
        .then(place => {

            const response: ICreatePlaceResponse = {
                id: place.id,
                creatorId: place.creatorId,
                name: place.name,
                latitude: place.latitude,
                longitude: place.longitude
            }

            return res.json(response);

        })
        .catch(next);


});

export const PlacesRouter = router;