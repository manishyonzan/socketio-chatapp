import e from "express";
import userService from "../../../../services/v1/authentication/user.service.js";
import bcrypt from "bcryptjs";

export const userController = {
    create: async (req, res, next) => {
        try {
            // call the service here
            const { name, email, password } = req.body;
            const userCreate = await userService.create({ name, email, password });
            res.status(201).json({ message: "User created successfully" });
        } catch (error) {
            next(error);
        }
    },
    update: async (req, res, next) => {
        const { name } = req.body;
        const { id } = req.params;
        try {

            const userUpdate = await userService.updateUser({ id, name });
            res.status(200).json({ message: "User updated successfully", data: userUpdate });
        } catch (error) {
            next(error);
        }
    },
    get: async (req, res, next) => {
        try {
            const { id } = req.params;
            const userGet = await userService.getUser({ id });
            if (!userGet) return res.status(404).json({ message: "User not found" });
            res.status(200).json({ message: "User fetched successfully", data: userGet });
        } catch (error) {
            next(error);
        }
    },
    generateToken: async (req, res, next) => {
        try {
            const { email, password } = req.body;
            const token = await userService.generateToken({ email: email, password: password });
            res.status(200).json({ message: "Token generated successfully", token: token });
        } catch (error) {
            next(error);
        }
    }

}