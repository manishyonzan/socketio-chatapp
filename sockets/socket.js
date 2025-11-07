import { Server } from 'socket.io';
import { chatHandler } from './handlers/chat.handler.js';
import { verifyTokenForSocket } from '../utils/generalUtils.js';

export const initializeSocket = (server) => {
    const io = new Server(server, {
        cors: {
            origin: "*",
            methods: ["GET", "POST"]
        }
    });

    io.use(async (socket, next) => {
        try {
            const token = socket.handshake.auth.token?.split(' ')[1];
            console.log("Socket token:", token);

            const decoded = await verifyTokenForSocket(token);
            console.log("Socket token decoded:", decoded);
            socket.user = decoded;
            if (decoded) next();
        } catch (error) {

            next(new Error("Authentication error"));
        }
    });
    io.on("connection", (socket) => {
        console.log(`User connected: ${socket.id}`);

        // Initialize chat handlers
        chatHandler(io, socket);

        socket.on("disconnect", () => {
            console.log(`User disconnected: ${socket.id}`);
        });
    });

    return io;
};