import { Repository_V1 } from "../../../database/repositories/index.js"
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import AppError from "../../../utils/appError.js";

const userService = {
    async create({
        name,
        email,
        password }) {
        // logic to create a user

        let salt = bcrypt.genSaltSync(10);
        let hashedPassword = await bcrypt.hashSync(password, salt);
        return (await Repository_V1.userRepository.create({
            name,
            email,
            password: hashedPassword,
        }));
    },
    async getUser({
        id,
    }) {
        return (await Repository_V1.userRepository.getUser({
            id,
        }));
    },
    async getUserByEmail({
        email,
    }) {
        return (await Repository_V1.userRepository.getUserByEmail({
            email,
        }));
    },
    async updateUser({
        id,
        name, }) {

        try {

            const userGet = await Repository_V1.userRepository.getUser({
                id,
            });
            if (!userGet) return res.status(404).json({ message: "User not found" });

            return (await Repository_V1.userRepository.updateUser({
                id,
                name,
            }));

        } catch (error) {
            throw error;
        }
    },
    async generateToken({ email, password }) {
        try {
            let isValid = false;


            const userGet = await Repository_V1.userRepository.getUserByEmail({
                email,
            })
            if (!userGet) throw new AppError("User not found", 404);


            isValid = await bcrypt.compare(password, userGet.hashedPassword);
            if (!isValid) throw new AppError("Invalid credentials", 401);
            const token = jwt.sign(
                { id: userGet._id.toString() },
                process.env.JWT_SECRET,
                { expiresIn: '1h' }
            );

            return token;
        } catch (error) {
            throw error;
        }


    },
    async getAllUser({}){
        try {
            const allUser = Repository_V1.userRepository.getAllUser({});
            return allUser

            
        } catch (error) {
            throw error;
        }
    }

}
export default userService;