import AppError from "../../../../utils/appError.js";
import User from "../../../models/user.model.js"
import mongoose from "mongoose";
export const userRepository = {
    async create({
        name,
        email,
        password }) {
        try {
            const result = await User.create({
                name: name,
                email: email,
                hashedPassword: password
            })
            return result;
        } catch (error) {
            throw new AppError('Error creating user', 500);
        }

    },
    async getUser({
        id,
    }) {
        try {
            const user = await User.findById(id);
            return user;
        } catch (error) {
            throw new AppError('Error fetching user', 500);
        }
    },
    async getUserByEmail({ email }) {
        try {
            const user = await User.findOne({ email: email });
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
            return user;
        } catch (error) {
            throw new AppError('Error updating user', 500);
        }
    },
      async getAllUser({
    }) {
        try {
            const users = await User.find();

            
            return users;
        } catch (error) {
            throw new AppError('Error fetching user', 500);
        }
    },

}