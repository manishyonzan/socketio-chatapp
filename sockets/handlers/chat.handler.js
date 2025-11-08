import messageService from "../../services/v1/connection/message.service.js";

export const chatHandler = (io, socket) => {


  socket.on("chat-message", async (msg) => {
    try {

      console.log(socket.user, "this is the socket user from token");
      let roomId = msg.roomId;
      console.log("a new user message: " + msg.msg);

      // save it in the database
      await messageService.create({
        conversationId: roomId,
        senderId: socket.user.id,
        content: msg.msg,
      });
      console.log("runnning here")
      io.to(roomId).emit("chat-message", { message: msg.msg, senderId: socket.user.id, content: msg.msg });
    } catch (error) {
      console.error("Error handling chat-message:", error);
    }
  });



  socket.on("join-room", (roomId) => {
    socket.join(roomId);
    console.log(`Socket ${socket.id} joined room ${roomId}`);
  });


};