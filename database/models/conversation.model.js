import mongoose from "mongoose"
import User from "./user.model.js";
const conversationSchema = mongoose.Schema(
    {
        type: {
            type: String,
            required: [true, "conversation type is required"]
        },
        // participants: {
        //     type: [String],
        //     required: [true, "participants is required"]
        // },
        participants: {
            type: [mongoose.Schema.Types.ObjectId],
            ref: 'User',
            required: true,
            validate: {
                validator: async function (values) {
                    const results = await Promise.all(values.map(id => User.findById(id)));
                    return results.every(user => !!user);

                },
                message: 'Participant ID does not exist'
            }
        },
        name: {
            type: String,
            required: [true, "name is required"],
            unique: true
        },
    },
    {
        timestamps: true
    }
)

const conversation = mongoose.model("Conversation", conversationSchema);
export default conversation;