import messageService from "../../../../services/v1/connection/message.service.js";

export const messageController = {
    async get(req, res, next) {
        try {
            const getMessage = await messageService.getMessages({ userId: req.user.id, conversationId: req.params.conversationId });
            res.status(201).json({ message: 'Message fetched successfully', data: getMessage });
        } catch (error) {
            next(error);
        }
    }
}