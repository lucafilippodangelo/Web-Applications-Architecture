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
import {updatePlaceSchema} from "./requests/UpdatePlace";
import updatePlace from "./services/UpdatePlaceService";
import {IUpdatePlaceResponse} from "./responses/IUpdatePlaceResponse";
import findPlace from "./services/FindPlaceService";

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
                            description: p.description,
                            imageUrl: p.imageUrl ? encodeURIComponent(p.imageUrl) : undefined,
                            address: p.address,
                            location: {
                                lat: p.coordinates[1],
                                lng: p.coordinates[0]
                            },
                            tags: p.tags
                        }
                    })
                return res.json(response);

            }, res);

        })
        .catch(next);


});

router.get("/:placeId", (req, res, next) => {

    findPlace({
        id: req.params.placeId
    })
        .then(result => {

            result.evaluate(place => {

                const response: IFindPlaceResponse = {
                    id: place.id,
                    creatorId: place.creatorId,
                    name: place.name,
                    description: place.description,
                    imageUrl: place.imageUrl ? encodeURIComponent(place.imageUrl) : undefined,
                    address: place.address,
                    location: {
                        lat: place.coordinates[1],
                        lng: place.coordinates[0]
                    },
                    tags: place.tags
                }
                res.json(response);

            }, res);

        })
        .catch(next);


});

router.post("", validate(createPlaceSchema), authenticate, (req, res, next) => {

    const command: ICreatePlaceCommand = {
        creatorId: req.user!.id,
        name: req.body.name,
        description: req.body.description,
        address: req.body.address,
        imageUrl: req.body.imageUrl,
        tags: req.body.tags
    }
    createPlace(command)
        .then(result => {

            result.evaluate(place => {

                const response: ICreatePlaceResponse = {
                    id: place.id,
                    creatorId: place.creatorId,
                    name: place.name,
                    address: place.address,
                    description: place.description,
                    location: {
                        lat: place.coordinates[1],
                        lng: place.coordinates[0]
                    },
                    imageUrl: place.imageUrl ? encodeURIComponent(place.imageUrl) : undefined,
                    tags: place.tags
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

            }, res);

        })
        .catch(next)

});

router.put("/:placeId", validate(updatePlaceSchema), authenticate, (req, res, next) => {

    updatePlace({
        id: req.params.placeId,
        creatorId: req.user!.id,
        name: req.body.name,
        description: req.body.description,
        imageUrl: req.body.imageUrl,
        tags: req.body.tags
    })
        .then(result => {

            result.evaluate(place => {

                const response: IUpdatePlaceResponse = {
                    id: place.id,
                    creatorId: place.creatorId,
                    name: place.name,
                    address: place.address,
                    description: place.description,
                    location: {
                        lat: place.coordinates[1],
                        lng: place.coordinates[0]
                    },
                    imageUrl: place.imageUrl,
                    tags: place.tags
                }
                res.json(response);

            }, res);

        })
        .catch(next)

})

export const PlacesRouter = router;