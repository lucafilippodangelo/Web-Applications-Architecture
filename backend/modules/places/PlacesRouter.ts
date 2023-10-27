import {Router} from "express";
import {IFindPlaceResponse} from "./responses/IFindPlaceResponse";
import findAllPlaces from "./services/FindAllPlacesService";
import {findAllPlacesSchema} from "./requests/FindAllPlaces";
import {createPlaceSchema} from "./requests/CreatePlace";
import createPlace, {ICreatePlaceCommand} from "./services/CreatePlaceService";
import {ICreatePlaceResponse} from "./responses/ICreatePlaceResponse";
import {authenticate, validate} from "../../middleware";
import deletePlace from "./services/DeletePlaceService";
import StatusCodes from "http-status-codes";

const router = Router()

router.get("", validate(findAllPlacesSchema), (req, res, next) => {

    findAllPlaces(req.query)
        .then(result => {

            result.evaluate(places => {

                const response: IFindPlaceResponse[] = places
                    .map(p => {
                        return {
                            id: p.id,
                            creatorId: p.creatorId,
                            name: p.name,
                            imageUrl: p.imageUrl ? encodeURIComponent(p.imageUrl) : undefined,
                            address: p.address,
                            location: {
                                lat: p.coordinates[1],
                                lng: p.coordinates[0]
                            }
                        }
                    })
                return res.json(response);

            }, res);

        })
        .catch(next);


});

router.post("", validate(createPlaceSchema), authenticate, (req, res, next) => {

    const command: ICreatePlaceCommand = {
        creatorId: req.user!.id,
        name: req.body.name,
        latitude: req.body.latitude,
        longitude: req.body.longitude,
        address: req.body.address,
        imageUrl: req.body.imageUrl
    }
    createPlace(command)
        .then(result => {

            result.evaluate(place => {

                const response: ICreatePlaceResponse = {
                    id: place.id,
                    creatorId: place.creatorId,
                    name: place.name,
                    address: place.address,
                    location: {
                        lat: place.coordinates[1],
                        lng: place.coordinates[0]
                    },
                    imageUrl: place.imageUrl ? encodeURIComponent(place.imageUrl) : undefined
                }
                return res.json(response);

            }, res);

        })
        .catch(next);


});

router.delete("/:placeId", authenticate, (req, res, next) => {

    deletePlace({
        userId: req.user!.id,
        placeId: req.params.placeId
    })
        .then(result => {

            result.evaluate(() => {

                res.sendStatus(StatusCodes.NO_CONTENT);

            }, res)

        })
        .catch(next)

});

export const PlacesRouter = router;