import {Router} from "express";
import {IFindAllPlacesResponse} from "./responses/IFindAllPlacesResponse";
import FindAllPlaces from "./services/FindAllPlacesService";
import validate from "../../middleware/RequestValidator";
import {findAllPlacesSchema} from "./requests/IFindAllPlacesRequest";

const router = Router()

router.get("", validate(findAllPlacesSchema), (req, res, next) => {

    FindAllPlaces(req.query)
        .then(places => {

            const response: IFindAllPlacesResponse = {
                places: places
                    .map(p => {
                        return {
                            id: p.id,
                            name: p.name
                        }
                    })
            }

            return res.json(response);

        })
        .catch(next);


});

export const PlacesRouter = router;