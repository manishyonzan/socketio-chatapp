import AppError from "../../../../utils/appError.js";
import conversation from "../../../models/conversation.model.js"

export const conversationRepository = {
    async create({
        type,
        participants,
        name }) {

        try {
            const result = await conversation.create({
                type, participants, name
            });
            return result

        } catch (error) {
            throw error
        }
    },
    async checkIfExist({ name }) {
        try {

            const result = await conversation.findOne({ name: name })
            return result;
        } catch (error) {
            throw error;
        }
    },
    async update({ id, participants }) {
        try {
            const result = await conversation.findByIdAndUpdate(id, { participants }, { new: true });
            return result;

        } catch (error) {
            throw new AppError("Error while updating the conversation", 500);
        }

    },
    async get({ id }) {
        try {

            const result = await conversation.findById({ id })
            return result;
        } catch (error) {
            throw error;
        }
    }

}