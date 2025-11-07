import mongoose from "mongoose";
const userSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Name is required"],
        },
        email: {
            type: String,
            required: [true, "Email is required"],
            unique: true,
        },
        hashedPassword: {
            type: String,
            required: [true, "password is required"],
        },
        online: {
            type: Boolean,
            default: false
        }
    },
    {
        timestamps: true,
    }
);


const User = mongoose.model('Users', userSchema);

export default User;