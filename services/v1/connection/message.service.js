import { Repository_V1 } from "../../../database/repositories/index.js";
import { messageRepository } from "../../../database/repositories/v1/connection/message.repository.js";
import AppError from "../../../utils/appError.js";
import conversationService from "./conversation.service.js"

const messageService = {
    async create({
        conversationId,
        senderId,
        content,
    }) {
        try {
            const getConversation = await conversationService.getByConversationId({ conversationId });
            // check if the user is in the conversation
            const userExist = await getConversation[0].participants.filter((item, index) => item.toString() == senderId);
            if (userExist.length < 1) throw new AppError("Not authorized", 403);
            // create the message
            return (await Repository_V1.messageRepository.create({ content: content, conversationId: conversationId, senderId: senderId }));
        } catch (error) {
            throw error;
        }

    },
    async update({
        id,
        senderId,
        content,
    }) {
        try {
            // get the message and chekc if the message is created by this user
            const checkMessage = await Repository_V1.messageRepository.findById({ id });
            if (senderId != checkMessage.senderId) throw new AppError("Unauthorized error", 403);
            // if so change the update
            return (await messageRepository.update({ id, content }));

        } catch (error) {
            throw error;
        }

    },
    async getMessages({
        userId,
        conversationId
    }) {
        try {
            // check if user is allowed to see the message
            const getConversation = await conversationService.getByConversationId({ conversationId: conversationId });

            // check if the user is in the conversation
            const userExist = await getConversation[0].participants.filter((item, index) => item.toString() == userId);
            if (!userExist) throw new AppError("Not authorized", 403);

            return (await Repository_V1.messageRepository.findByConversationId({ conversationId }));
        } catch (error) {
            throw error;
        }

    },

}
export default messageService