import { conversationRepository } from "../../../database/repositories/v1/socket/conversation.repository";
import AppError from "../../../utils/appError";

const conversationService = {
    async create({
        type,
        participants }) {
        try {

            const roomId = type == "private" ? participants.sort().join("-") : Date.now().toLocaleString();
            if (type == "private") {
                // checkif the roomId already exist
                const checkIfExist = await conversationRepository.checkIfExist({ name: roomId });
                if (checkIfExist) throw new AppError("Already exist", 403);
            }
            // call the repository to create a conversation
            return (await conversationRepository.create({ name: roomId, participants: participants, type: type }))
        } catch (error) {
            throw error;
        }


    },
    async update({
        id,
        participants
    }) {
        try {
            // find the conversation and update the participants
            const result = await conversationRepository.update({ id: id, participants: participants });
            return result;
        } catch (error) {
            throw error;
        }
    },
    async get({
        id
    }) {

        try {
            const checkIfExist = await conversationRepository.get({ id: id });
            return checkIfExist;

        } catch (error) {
            throw error;
        }
    }
};
export default conversationService;