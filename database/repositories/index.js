import { userRepository } from "./v1/authentication/user.repository.js";
import { conversationRepository } from "./v1/connection/conversation.repository.js";
import { messageRepository } from "./v1/connection/message.repository.js";

export const Repository_V1 = {
    //authentication
    userRepository,
    conversationRepository,
    messageRepository



}