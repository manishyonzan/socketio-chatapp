import expres from 'express';
import { conversationController } from '../controllers/conversation.controller.js';
import getUserFromToken from '../../../middlewares/getUserFromToken.js';

export const conversationRouter = () => {
    const router = expres.Router();

    router
        .get("/",
            getUserFromToken,
            conversationController.getConversation
        )
        .post("/",
            getUserFromToken,
            conversationController.createConversation
        );


    return router

}