import { Server } from "socket.io";
import http from "http";
import express from "express";
import { socketAuthMiddleware } from "../middlewares/socketAuthMiddleware.js";
import { getUserConversationsForSocketIO } from "../controllers/conversationController.js";

const app = express();

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: process.env.CLIENT_URL,
    credentials: true,
  },
});

io.use(socketAuthMiddleware);

const onlineUsers = new Map();
io.on("connection", async (socket) => {
  const user = socket.user;
  console.log(
    `user ${user.displayName} (${user._id}) online with socket: ${socket.id}`,
  );
  onlineUsers.set(user._id, socket.id);

  // Join user to personal room for notifications
  socket.join(user._id.toString());
  console.log(` Socket joined user room: ${user._id.toString()}`);

  io.emit("online-users", [...onlineUsers.keys()]);
  // listen for presence changes (show/hide online status)
  socket.on("set-presence", (visible = true) => {
    try {
      if (visible) {
        onlineUsers.set(user._id, socket.id);
      } else {
        onlineUsers.delete(user._id);
      }
      io.emit("online-users", [...onlineUsers.keys()]);
    } catch (err) {
      console.error("set-presence error", err);
    }
  });
  const conversationIds = await getUserConversationsForSocketIO(user._id);
  conversationIds.forEach((id) => {
    socket.join(id);
  });
  socket.on("join-conversation", (conversationId) => {
    socket.join(conversationId);
  });
  socket.on("disconnect", () => {
    onlineUsers.delete(user._id);
    io.emit("online-users", [...onlineUsers.keys()]);
    console.log(`socket disconnected: ${socket.id}`);
  });
});

export { io, app, server };
