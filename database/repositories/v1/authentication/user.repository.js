import AppError from "../../../../utils/appError.js";
import User from "../../../models/user.model.js"
import mongoose from "mongoose";
export const userRepository = {
    async create({
        name,
        email,
        password }) {
        try {
            // logic to create a user in the database
            console.log(name, email, password, "the data received in repository");
            const result = await User.create({
                name: name,
                email: email,
                hashedPassword: password
            })
            console.log("User created:", result);
            return result;
        } catch (error) {
            console.log("Error creating user:", error);
            throw new AppError('Error creating user', 500);
        }

    },
    async getUser({
        id,
    }) {
        try {
            const user = await User.findById(id);
            console.log("User fetched:", user);
            return user;
        } catch (error) {
            console.log("Error fetching user:", error);
            throw new AppError('Error fetching user', 500);
        }
    },
    async getUserByEmail({ email }) {
        try {
            const user = await User.findOne({ email: email });
            console.log("User fetched by email:", user);
            return user;
            
        } catch (error) {
            throw new AppError('Error fetching user by email', 500);
        }
    },
    async updateUser({
        id,
        name, }) {
        try {
            const user = await User.findByIdAndUpdate(id, { name }, { new: true });
            console.log("User updated:", user);
            return user;
        } catch (error) {
            console.log("Error updating user:", error);
            throw new AppError('Error updating user', 500);
        }
    },

}