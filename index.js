import express from 'express';
import connectTOMongoDB from './database/config.js';
import cors from 'cors';
import { v1Routes } from "./api/index.js";
import 'dotenv/config'
import getUserFromToken from './api/middlewares/getUserFromToken.js';
import http from 'http';
import { initializeSocket } from './sockets/socket.js';

connectTOMongoDB();
const app = express();
const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || 'localhost';

const server = http.createServer(app);

// Initialize socket.io
const io = initializeSocket(server);

app.use(express.json());


app.use(
  cors({
    origin: '*',
  })
);


v1Routes(app);



app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  res.status(statusCode).json({
    success: false,
    message: err.message,
    stack: err.stack
  })
})

app.use(express.static('public'));

app.get("/", (req, res) => {
  res.sendFile("index.html");
});

server.listen(PORT,HOST, () => {
  console.log(`Server is running on http://${HOST}:${PORT}`);
});




// const redis = require('redis');
// const client = redis.createClient();
// client.on('error', (err) => {
//   console.log('Redis Client Error', err);
// });