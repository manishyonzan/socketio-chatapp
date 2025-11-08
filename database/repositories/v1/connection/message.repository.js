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
            let offset = 0;
            let limit = 100;

            // here needs the sorting according to date and limit the data
            const result = message.find({ conversationId })
                .sort({ createdAt: 1 }) 
                .skip(offset)
                .limit(limit);
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