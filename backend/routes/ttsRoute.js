import express from "express";
import { handleTextToSpeech, getTTSLogs, getAvailableVoices  } from "../controllers/tts.controller.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/generate", authMiddleware, handleTextToSpeech);
router.get("/logs", authMiddleware, getTTSLogs);
router.get("/voices", authMiddleware, getAvailableVoices);

// router.get("/voices/elevenlabs", authMiddleware, getElevenLabsVoices); // Endpoint to get ElevenLabs voices

export default router;

