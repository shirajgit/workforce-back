import { Server, Socket } from "socket.io";
import messageModel from "../models/message.model.ts";


interface IUserSocketMap {
  [userId: string]: string; // userId → socketId
}

const userSocketMap: IUserSocketMap = {};

export const initChatSocket = (io: Server) => {
  io.on("connection", (socket: Socket) => {
    console.log("User connected:", socket.id);

    // 🔑 REGISTER USER
    socket.on("register", (userId: string) => {
      userSocketMap[userId] = socket.id;
    });

    // 📩 SEND MESSAGE
    socket.on("send_message", async (data) => {
      const { sender, receiver, text } = data;

      // 🚫 BLOCK USER-USER CHAT
      // (only owner ↔ user allowed)
      // you must send role from frontend if needed

      const message = await messageModel.create({
        sender,
        receiver,
        text,
      });

      const receiverSocket = userSocketMap[receiver];

      if (receiverSocket) {
        io.to(receiverSocket).emit("receive_message", message);
      }

      // also send back to sender (for sync)
      socket.emit("receive_message", message);
    });

    // ❌ DISCONNECT
    socket.on("disconnect", () => {
      console.log("User disconnected:", socket.id);

      for (const userId in userSocketMap) {
        if (userSocketMap[userId] === socket.id) {
          delete userSocketMap[userId];
        }
      }
    });
  });
};