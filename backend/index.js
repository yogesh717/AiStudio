import express, { json } from "express";
import { config } from "dotenv";
import connectDB from './config/db.js';
import authRoutes from "./routes/authRoutes.js";
import chatRoutes from "./routes/chatRoutes.js";
import ttsRoutes from "./routes/ttsRoute.js";
import imageRoutes from './routes/imageRoutes.js';
import cors from "cors";

config();
// console.log("OPENAI_API_KEY from .env:", process.env.OPENAI_API_KEY); 
const app = express();

app.use(cors());
app.use(json());

connectDB();


app.use("/api/auth", authRoutes);
app.use("/api/chat", chatRoutes);

app.use('/api/image', imageRoutes);

app.use("/api/tts", ttsRoutes);

app.get("/", (req, res) => {
  res.send("AI Chat API is running...");
});

const PORT = process.env.PORT || 5050;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
