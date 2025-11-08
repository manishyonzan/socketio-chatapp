import express from "express";
import { conversationRouter } from "./conversation.routes.js";
import { messageRouter } from "./message.routes.js";

export function connnectionRoutes(app) {

    const conversationRouter1 = conversationRouter();
    const messageRouter1 = messageRouter();

    const connectionRouter = express.Router();

    connectionRouter.use("/messages", messageRouter1);
    connectionRouter.use("/conversations", conversationRouter1);

    
    app.use("/api/v1/connection", connectionRouter);
}