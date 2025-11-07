import mongoose from "mongoose"
const conversationSchema = mongoose.Schema(
    {
        type: {
            type: String,
            required: [true, "conversation type is required"]
        },
        participants: {
            type: Array,
            required: [true, "participants is required"]
        },
        name: {
            type: String,
            required: [true, "name is required"],
            unique:true
        },
    },
    {
        timestamps: true
    }
)

const conversation = mongoose.model("Conversation",conversationSchema);
export default conversation;