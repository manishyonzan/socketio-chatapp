import expres from 'express';
import getUserFromToken from '../../../middlewares/getUserFromToken.js';
import { messageController } from '../controllers/message.controller.js';

export const messageRouter = () => {
    const router = expres.Router();

    router.get("/:conversationId", getUserFromToken, messageController.get)


    return router

}