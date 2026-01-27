import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const socketAuthMiddleware = async (socket, next) => {
  try {
    const token = socket.handshake.auth?.token;
    if (!token) {
      return next(new Error("Unauthorized: Token is missing"));
    }

    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET_KEY);
    if (!decoded) {
      return next(
        new Error("Unauthorized: Invalid or expired token")
      );
    }

    const user = await User.findById(decoded.userId).select("-hashedPassword");

    if (!user) {
      return next(new Error("User not found"));
    }

    socket.user = user;

    next();
  } catch (error) {
    console.error("Error verifying JWT in socketAuthMiddleware", error);
    next(new Error("Unauthorized"));
  }
};