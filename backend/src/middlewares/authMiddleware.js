import jwt from 'jsonwebtoken'
import User from '../models/User.js';

export const protectedRoute = (req, res, next) => {
   try {
    const token = req.header("Authorization")?.split(" ")[1];
    if (!token) return res.status(401).json({ message: "Unauthorized" });
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET_KEY, async(error, decodedUser) => {
        if(error) {
            return res.status(403).json({ message: "Access token has expired or can’t be used" })
        }
        const user = await User.findById(decodedUser.userId).select('-password');
        if(!user) {
            return res.status(404).json({message: "User does not exist"})
        }
        req.user = user;
        next();
    })
   } catch (error) {
        console.error("JWT verification error", error)
        return res.status(500).json({message: "Internal server error"})
   }
}