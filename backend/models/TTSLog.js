import mongoose from "mongoose";

const ttsLogSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  provider: String,
  voiceId: String,
  text: String,
  audioUrl: String,
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("TTSLog", ttsLogSchema);
