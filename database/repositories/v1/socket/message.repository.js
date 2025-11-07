import message from "../../../models/message.model.js";

export const messageRepository = {
    async create({
        conversationId,
        senderId,
        content
    }) {
        try {

            const result = message.create({ conversationId, senderId, content });
            return result;
        } catch (error) {
            throw error;
        }

    },
    async findById({
        id
    }) {
        try {

            // here needs the sorting according to date and limit the data
            const result = message.findById({ id });
            return result
        } catch (error) {
            throw error
        }

    },
    async findByConversationId({
        conversationId
    }) {
        try {

            // here needs the sorting according to date and limit the data
            const result = message.find({ conversationId });
            return result
        } catch (error) {
            throw error
        }

    },
    async update({
        id,
        content
    }) {
        try {
            const result = message.findByIdAndUpdate(id, { content: content }, { new: true })
            return result;
        } catch (error) {
            throw error;
        }
    }
}