import express from "express";
import cors from "cors"
import swaggerUi from "swagger-ui-express"
import fs from "fs"
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import { connectDB } from "./libs/db.js";
import authRoute from './routes/authRoute.js'
import userRoute from './routes/userRoute.js'
import friendRoute from './routes/friendRoute.js'
import messageRoute from './routes/messageRoute.js'
import conversationRoute from './routes/conversationRoute.js'
import { app, server } from "./socket/index.js"
import { protectedRoute } from "./middlewares/authMiddleware.js";

dotenv.config();

const PORT = process.env.PORT || 5001;

// middlewares
app.use(express.json());
app.use(cookieParser())
app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));

// swagger
const swaggerDocument = JSON.parse(fs.readFileSync("./src/swagger.json", "utf8"));
app.use("/swagger", swaggerUi.serve, swaggerUi.setup(swaggerDocument));


// public router
app.use('/api/auth', authRoute)

// private router
app.use(protectedRoute)
app.use('/api/users', userRoute)
app.use('/api/friends', friendRoute)
app.use('/api/messages', messageRoute)
app.use('/api/conversations', conversationRoute)

const startServer = async () => {
    await connectDB();
    server.listen(PORT, () => {
        console.log(`Server started on port ${PORT}`);
    });
};

startServer();

