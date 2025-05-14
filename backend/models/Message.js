import mongoose from 'mongoose';


  const messageSchema = new mongoose.Schema({
    // userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    userId: { type: String, required: false },
    chatId: { type: String, required: true }, // 👈 add this
    role: { type: String, enum: ['user', 'ai'], required: true },
    content: { type: String, required: true },
    timestamp: { type: Date, default: Date.now }
  });
  



export default mongoose.model('Message', messageSchema);

  


