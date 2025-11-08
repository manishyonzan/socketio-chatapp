import AppError from "../../utils/appError.js";
import jwt from "jsonwebtoken";

const getUserFromToken = async (req, res, next) => {
    const token = req.header("authorization");
    if (token) {
        try {
            const [authToken, ...rest] = token.split(' ').reverse();


            const decoded = await jwt.verify(authToken, process.env.JWT_SECRET);


            const currentTime = Math.floor(Date.now() / 1000);

            if (decoded.exp < currentTime) {
                throw new AppError("Expired", 500);
            }


            req.user = {
                id: decoded.id
            };

            next()
        } catch (error) {
            next(error);
        }
    }
    else {
        return res.status(500).json({
            message: "token is required",
            error: true
        })
    }
}


export default getUserFromToken;