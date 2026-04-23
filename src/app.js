import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import authRoutes from "./routes/auth.routes.js";
import userRoutes from "./routes/user.routes.ts";
import taskRoutes from "./routes/task.routes.ts";
import dashboardRoutes from "./routes/dashboard.routes.js";
import interviewRoutes from "./routes/interview.routes.ts";
import paymentRoutes from "./routes/payment.routes.ts";
import http from "http";
import { Server } from "socket.io";
import { initChatSocket } from "./sockets/chat.socket.ts";
import messageRoutes from "./routes/message.routes.ts";

dotenv.config();

const app = express();
const server = http.createServer(app);



const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

// init socket
initChatSocket(io);




app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Welcome to the Job Portal API");
});

app.use("/api/messages", messageRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);

app.use("/api/tasks", taskRoutes);
app.use("/api/interviews", interviewRoutes);

app.use("/api/dashboard", dashboardRoutes);
app.use("/api/payments", paymentRoutes);

export default app;