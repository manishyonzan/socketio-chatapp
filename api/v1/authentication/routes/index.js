import express from "express";
import { UserRouter } from "./user.routes.js";

export function authenticationRoutes(app) {

    const userRouter = UserRouter();

    const authenticationRouter = express.Router();
    authenticationRouter.use("/user", userRouter);

    app.use("/api/v1/authentication", authenticationRouter)
}