export const chatHandler = (io, socket) => {
  socket.on("chat-message", (msg) => {
    console.log(socket.user, "this is the socket user from token");
    let roomId = msg.roomId;
    console.log("a new user message: " + msg.msg);
    io.to(roomId).emit("chat-message", `${msg.msg} from ${socket.id}`);
  });


  socket.on("join-room", (roomId) => {
    socket.join(roomId);
    console.log(`Socket ${socket.id} joined room ${roomId}`);
  });

};