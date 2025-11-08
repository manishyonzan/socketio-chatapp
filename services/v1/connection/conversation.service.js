import { Repository_V1 } from "../../../database/repositories/index.js";
import AppError from "../../../utils/appError.js";

const conversationService = {
    async create({
        type,
        participants }) {
        try {

            const roomId = type == "private" ? participants.sort().join("-") : Date.now().toLocaleString();
            if (type == "private") {
                // checkif the roomId already exist
                const checkIfExist = await Repository_V1.conversationRepository.checkIfExist({ name: roomId });
                if (checkIfExist) throw new AppError("Already exist", 403);
            }
            // call the repository to create a conversation
            return (await Repository_V1.conversationRepository.create({ name: roomId, participants: participants, type: type }))
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
            const result = await Repository_V1.conversationRepository.update({ id: id, participants: participants });
            return result;
        } catch (error) {
            throw error;
        }
    },
    async get({
        id
    }) {

        try {
            const checkIfExist = await Repository_V1.conversationRepository.get({ id: id });
            return checkIfExist;

        } catch (error) {
            throw error;
        }
    },
    async userConversations({ userId }) {
        try {
            // find all conversations that include the userId in participants
            const result = await Repository_V1.conversationRepository.userConversations({ userId: userId });
            return result;
        } catch (error) {
            throw error;
        }
    }
};
export default conversationService;