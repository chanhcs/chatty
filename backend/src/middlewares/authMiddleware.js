import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const protectedRoute = (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    
    if (!token) {
      return res.status(401).json({ message: "Access token not found" });
    }

    jwt.verify(
      token,
      process.env.ACCESS_TOKEN_SECRET_KEY,
      async (err, decodedUser) => {
        if (err) {
          console.error(err);
          return res
            .status(403)
            .json({ message: "Access token is expired or invalid" });
        }
        const user = await User.findById(decodedUser.userId).select(
          "-hashedPassword"
        );
        if (!user) {
          return res
            .status(404)
            .json({ message: "User does not exist." });
        }
        req.user = user;
        next();
      }
    );
  } catch (error) {
    console.error("Error verifying JWT in authMiddleware", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
