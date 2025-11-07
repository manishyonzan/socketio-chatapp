import mongoose from "mongoose";

const messageSchema = mongoose.Schema(
    {
        conversationId: {
            type: String,
            required:[true, "conversation id is needed"]
        },
        senderId: {
            type:String,
            required:[true, "message sender is required"]
        },
        content :{
            type: String,
            required: [true, "message content is required"]
        },
        readBy :{
            type : Array(String),
            default: []
        }
    },
    {
        timestamps:true,
    }
);

const message = mongoose.model("Message", messageSchema);
export default message;