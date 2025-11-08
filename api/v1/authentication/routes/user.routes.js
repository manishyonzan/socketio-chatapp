import express from "express";
import { userController } from "../controllers/user.controller.js";
import getUserFromToken from "../../../middlewares/getUserFromToken.js";

export const UserRouter = () => {

    const router = express.Router();

    // implement the middleware in here
    router
        .get("/allusers",
            getUserFromToken,
            userController.getAllUser
        )
        .get(
            "/:id",
            userController.get
        )
        .post(
            "/create",
            userController.create
        )
        .patch(
            "/update/:id",
            userController.update
        ).post(
            "/generate-token",
            userController.generateToken
        );


    return router;
}