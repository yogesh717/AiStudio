import { Router } from "express";
import { chatWithAI ,getChatHistory} from "../controllers/chatController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = Router();

// POST /api/chat (Protected)
router.post('/', authMiddleware, chatWithAI);
router.get('/history/:chatId', authMiddleware, getChatHistory);

export default router;
