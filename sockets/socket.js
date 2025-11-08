import { Server } from 'socket.io';
import { chatHandler } from './handlers/chat.handler.js';
import { verifyTokenForSocket } from "../utils/generalUtils.js"
import jwt from 'jsonwebtoken';

export const initializeSocket = (server) => {
    const io = new Server(server, {
        cors: {
            origin: "*",
            methods: ["GET", "POST"]
        }
    });

    io.use((socket, next) => {
        try {
            const token = socket.handshake.auth.token?.split(' ')[1];
        

            const decoded = verifyTokenForSocket(token);

            socket.user = decoded;
            socket.currentusers = socket.currentusers ?? [];
            if (decoded) next();
        } catch (error) {

            next(new Error("Authentication error"));
        }
    });
    io.on("connection", (socket) => {
        console.log(`User connected: ${socket.id}`);

        socket.currentusers = [...socket.currentusers, { userId: socket.user.id, socketId: socket.id }];

        // Initialize chat handlers
        chatHandler(io, socket);

        socket.on("disconnect", () => {
            console.log(`User disconnected: ${socket.id}`);
        });
    });

    return io;
};