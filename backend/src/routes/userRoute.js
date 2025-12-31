import express from 'express';
import { authMe } from '../controllers/authMe.js';

const router = express.Router();

router.get("/me", authMe)

export default router;