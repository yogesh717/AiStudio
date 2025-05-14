import OpenAI from 'openai';
import dotenv from 'dotenv';
import Message from '../models/Message.js';

dotenv.config();

// ✅ Initialize OpenRouter (OpenAI compatible) API
const openai = new OpenAI({
  baseURL: 'https://openrouter.ai/api/v1',
  apiKey: process.env.OPENROUTER_API_KEY,
  defaultHeaders: {
    'HTTP-Referer': 'http://localhost:4200', // frontend
    'X-Title': 'AI Chat App',
  },
});


// ✅ Chat with AI
export const chatWithAI = async (req, res) => {
  try {
    console.log("📥 Body:", req.body);

    const { message, chatId } = req.body;

    const userId = req.user || 'test-user'; // ✅ Define first
    console.log("👤 User ID:", userId);     // ✅ Then use it

    if (!chatId || !message) {
      return res.status(400).json({ error: 'chatId and message are required' });
    }

    console.log('Incoming user message:', { userId, chatId, message });

    // Save user's message
    await Message.create({
      userId,
      chatId,
      role: 'user',
      content: message,
      timestamp: new Date(),
    });

    // AI response
    const completion = await openai.chat.completions.create({
      model: 'mistralai/mistral-7b-instruct',
      messages: [
        { role: 'system', content: 'You are a helpful AI assistant.' },
        { role: 'user', content: message },
      ],
    });

    console.log("🧠 AI Response1:", completion);

    const aiResponse = completion.choices[0].message.content;
    console.log('AI response:', aiResponse);

    // Save AI message
    await Message.create({
      userId,
      chatId,
      role: 'ai',
      content: aiResponse,
      timestamp: new Date(),
    });

    res.json({ response: aiResponse });

  } catch (error) {
    console.error('❌ Chat error:', error);
    res.status(500).json({ error: error.message || 'Something went wrong' });
  }
};


// ✅ Get Chat History
export const getChatHistory = async (req, res) => {
  try {
    const userId = req.user || 'test-user';
    const chatId = req.params.chatId;

    if (!chatId) {
      return res.status(400).json({ error: 'chatId is required in params' });
    }

    const history = await Message.find({ userId, chatId }).sort({ timestamp: 1 });
    res.json(history);

  } catch (error) {
    console.error('❌ History error:', error);
    res.status(500).json({ error: error.message || 'Failed to load history' });
  }
};
