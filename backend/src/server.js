import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./libs/db.js";
import cookieParser from "cookie-parser";
import authRoute from './routes/authRoute.js'
import userRoute from './routes/userRoute.js'
import { protectedRoute } from "./middlewares/authMiddleware.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

// middlewares
app.use(express.json());
app.use(cookieParser())

// public router
app.use('/api/auth', authRoute)

// private router
app.use(protectedRoute)
app.use('/api/users', userRoute)

const startServer = async () => {
    await connectDB();
    app.listen(PORT, () => {
        console.log(`🚀 Server started on port ${PORT}`);
    });
};

startServer();

