import {Router} from "express";
import validate from "../../middleware/RequestValidator";
import {authenticateUserSchema} from "./requests/AuthenticateUser";
import authenticateUser from "./services/AuthenticateUserService";
import {IAuthenticatedUserResponse} from "./responses/IAuthenticateUserResponse";
import {createUserSchema} from "./requests/CreateUser";
import createUser from "./services/CreateUserService";
import {ICreatedUserResponse} from "./responses/ICreatedUserResponse";
import findUsers from "./services/FindUsersService";
import {IFindUserResponse} from "./responses/IFindUserResponse";
import authenticate from "../../middleware/Authentication";
import deleteUser from "./services/DeleteUserService";
import StatusCodes from "http-status-codes";
import findPlacesByUser from "./services/FindPlacesByUserService";
import {IFindPlaceResponse} from "../places/responses/IFindPlaceResponse";

const router = Router();

router.post("/", validate(createUserSchema), (req, res, next) => {

    createUser({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        imageUrl: req.body.imageUrl
    })
        .then(result => {

            result.evaluate(user => {

                const response: ICreatedUserResponse = {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                }
                return res.json(response);

            }, res);

        })
        .catch(next);

});

router.post("/authenticate", validate(authenticateUserSchema), (req, res, next) => {

    authenticateUser({
        email: req.body.email,
        password: req.body.password
    })
        .then(result => {

            result.evaluate(user => {

                const response: IAuthenticatedUserResponse = {
                    name: user.name,
                    email: user.email,
                    token: user.token
                }
                return res.json(response);

            }, res);

        })
        .catch(next);

});

router.get("/", (req, res, next) => {

    findUsers({})
        .then(result => {

            result.evaluate(users => {

                const response: IFindUserResponse[] = users.map(u => {
                    return {
                        id: u.id,
                        name: u.name,
                        imageUrl: u.imageUrl ? encodeURIComponent(u.imageUrl) : undefined,
                        places: u.places
                    }
                });
                res.json(response);

            }, res);

        })
        .catch(next)

});

router.delete("/", authenticate, (req, res, next) => {

    deleteUser({
        id: req.user!.id
    })
        .then(result => {

            result.evaluate(() => {

                res.sendStatus(StatusCodes.NO_CONTENT);

            }, res);

        })
        .catch(next)

});

router.get("/:userId/places", (req, res, next) => {

    findPlacesByUser({
        id: req.params.userId
    })
        .then(result => {

            result.evaluate(places => {

                const response: IFindPlaceResponse[] = places.map(p => {
                    return {
                        id: p.id,
                        name: p.name,
                        address: p.address,
                        imageUrl: p.imageUrl ? encodeURIComponent(p.imageUrl) : undefined,
                        location: {
                            lat: p.coordinates[1],
                            lng: p.coordinates[0]
                        },
                        creatorId: p.creatorId
                    }
                });
                res.json(response);

            }, res);

        })
        .catch(next)

});

export const UsersRouter = router;