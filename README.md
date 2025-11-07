# 📡 Socket.IO ChatApp

A secure and real-time chat application backend built with **Node.js**, **Express**, **Socket.IO**, **JWT authentication**, **bcrypt password hashing**, and **MongoDB**.  

This project provides user authentication, encrypted password storage, and live chat functionality with Socket.IO.

---

##  Features
- 🔐 Authentication using JWT  
- 🔑 Password Hashing with bcrypt  
- 💬 Real-time Messaging via Socket.IO  
- 🗄️ MongoDB Integration for users & messages  
- ⚡ Express REST API for auth and user management  
- 🛡️ Middleware for protected routes  

---

## Tech Stack
| Technology | Purpose |
|------------|---------|
| Node.js | Runtime environment |
| Express.js | Web framework |
| Socket.IO | Real-time communication |
| JWT (jsonwebtoken) | Authentication |
| bcrypt | Password hashing |
| MongoDB + Mongoose | Database |

---

## Project Structure
socketio-chatapp/ 
├── api/ # API routes
├── database/ # Database connection 
├── public/ # Static files 
├── services/v1/authentication/ # Auth services 
├── sockets/ # Socket.IO event handlers 
├── utils/ # Utility functions 
├── index.js # Entry point 
├── package.json 
├── README.md

Environment Variables
PORT=5000
MONGO_URI=mongodb://localhost:27017/chatapp
JWT_SECRET=your_jwt_secret_key

Running the Server
# Development
npm run dev

# Production
npm start




