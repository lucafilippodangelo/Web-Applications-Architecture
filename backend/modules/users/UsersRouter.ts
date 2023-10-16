import {Router} from "express";
import validate from "../../middleware/RequestValidator";
import {authenticateUserSchema} from "./requests/AuthenticateUser";
import authenticateUser from "./services/AuthenticateUserService";
import {IAuthenticatedUserResponse} from "./responses/IAuthenticateUserResponse";
import {createUserSchema} from "./requests/CreateUser";
import createUser from "./services/CreateUserService";
import {ICreatedUserResponse} from "./responses/ICreatedUserResponse";

const router = Router()

router.post("/", validate(createUserSchema), (req, res, next) => {

    createUser({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    })
        .then(result => {

            if (typeof result === "string") return res.status(400).json({
                message: result
            });

            const response: ICreatedUserResponse = {
                id: result.id,
                name: result.name,
                email: result.email,
            }
            return res.json(response);

        })
        .catch(next);

});

router.post("/authenticate", validate(authenticateUserSchema), (req, res, next) => {

    authenticateUser({
        email: req.body.email,
        password: req.body.password
    })
        .then(user => {

            if (!user) return res.status(401).json({
                message: "Authentication failed with the provided credentials"
            });

            const response: IAuthenticatedUserResponse = {
                name: user.name,
                email: user.email,
                token: user.token
            }
            return res.json(response);

        })
        .catch(next);

});

export const UsersRouter = router;