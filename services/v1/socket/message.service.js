import { messageRepository } from "../../../database/repositories/v1/socket/message.repository";
import AppError from "../../../utils/appError";
import conversationService from "./conversation.service"

const messageService = {
    async create({
        conversationId,
        senderId,
        content,
    }) {
        try {
            const getConversation = await conversationService.get({ id: conversationId });
            // check if the user is in the conversation
            const userExist = getConversation.participants.filter((item, index) => item == senderId);
            if (!userExist) throw new AppError("Not authorized", 403);

            // create the message
            return (await messageRepository.create({ content: content, conversationId: conversationId, senderId: senderId }));
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
            const checkMessage = await messageRepository.findById({ id });
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
            const getConversation = await conversationService.get({ id: conversationId });
            // check if the user is in the conversation
            const userExist = await getConversation.participants.filter((item, index) => item == userId);
            if (!userExist) throw new AppError("Not authorized", 403);

            return (await messageRepository.findByConversationId({ conversationId }));
        } catch (error) {
            throw error;
        }

    },

}
export default messageService