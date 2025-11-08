import User from "../../../../database/models/user.model.js";
import conversationService from "../../../../services/v1/connection/conversation.service.js";
import mongoose from "mongoose";

export const conversationController = {
    async createConversation(req, res, next) {
        try {
            // Logic to create a conversation
            const { type, participants } = req.body;

            const newConveersation = await conversationService.create({ type, participants });
            res.status(201).json({ message: 'Conversation created successfully', data: newConveersation });
        } catch (error) {
            next(error);
        }
    },
    async getConversation(req, res, next) {
        try {
            const { id } = req.user;
            const conversation = await conversationService.userConversations({ userId: id });
            if (!conversation) {
                return res.status(404).json({ message: 'Conversation not found' });
            }
            res.status(200).json({ message: 'Conversation fetched successfully', data: conversation });
        } catch (error) {
            next(error);
        }
    }
}