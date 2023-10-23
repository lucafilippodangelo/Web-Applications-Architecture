import express from "express";
import {PlacesRouter} from "./modules/places/PlacesRouter";
import {UsersRouter} from "./modules/users/UsersRouter";
import bodyParser from "body-parser";
import {config as configureDotenv} from "dotenv";
import {connect} from "mongoose";
import handleErrors from "./middleware/ErrorHandler";
import cors from "cors";

configureDotenv();

const app = express();

app.set("x-powered-by", false);

app.use(bodyParser.json());
app.use(cors());

app.use("/api/users", UsersRouter);
app.use("/api/places", PlacesRouter);

app.use(handleErrors);

app.listen(process.env.LISTEN_PORT, async () => {

    console.log(`Listening on port: ${process.env.LISTEN_PORT}`);

    await connect(`mongodb://${process.env.MONGO_HOST}:${process.env.MONGO_PORT}/${process.env.MONGO_DATABASE}`);

    console.log(`Connected to MongoDB: ${process.env.MONGO_HOST}:${process.env.MONGO_PORT}`);

});