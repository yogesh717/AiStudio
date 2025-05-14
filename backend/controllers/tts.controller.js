import axios from "axios";
import TTSLog from "../models/TTSLog.js";

// ✅ Embedded generateSpeech logic here
// const generateSpeech = async (text, voiceId) => {
//   try {
//     const response = await axios.post(
//       `https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`,
//       {
//         text,
//         model_id: "eleven_monolingual_v1",
//         voice_settings: {
//           stability: 0.5,
//           similarity_boost: 0.75
//         }
//       },
//       {
//         headers: {
//           'xi-api-key': process.env.ELEVENLABS_API_KEY,
//           'Content-Type': 'application/json',
//           'Accept': 'audio/mpeg'
//         },
//         responseType: 'arraybuffer'
//       }
//     );

//     return response.data;
//   } catch (err) {
//     throw new Error("Failed to generate speech: " + err.message);
//   }
// };
const generateSpeech = async (text, voiceId) => {
  try {
    const response = await axios.post(
      `https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`,
      {
        text,
        model_id: "eleven_multilingual_v1",  // 🔥 Multilingual support (includes Hindi)
        voice_settings: {
          stability: 0.5,
          similarity_boost: 0.75
        }
      },
      {
        headers: {
          'xi-api-key': process.env.ELEVENLABS_API_KEY,
          'Content-Type': 'application/json',
          'Accept': 'audio/mpeg'
        },
        responseType: 'arraybuffer'
      }
    );

    return response.data;
  } catch (err) {
    throw new Error("Failed to generate speech: " + err.message);
  }
};


// 🎙️ Generate TTS
// export const handleTextToSpeech = async (req, res) => {
//   const { text, voiceId } = req.body;
//   const userId = req.user?._id || null;

//   try {
//     const audioBuffer = await generateSpeech(text, voiceId);

//     const audioUrl = ""; // Optional: You can add Upload.io here

//     await TTSLog.create({
//       userId,
//       provider: "ElevenLabs",
//       voiceId,
//       text,
//       audioUrl
//     });

//     res.set({
//       'Content-Type': 'audio/mpeg',
//       'Content-Disposition': 'attachment; filename="speech.mp3"'
//     });
//     res.send(audioBuffer);
//   } catch (err) {
//     res.status(500).json({ error: "TTS failed", message: err.message });
//   }
// };
export const handleTextToSpeech = async (req, res) => {
  const { text, voiceId, language } = req.body;
  const userId = req.user?._id || null;

  try {
    const audioBuffer = await generateSpeech(text, voiceId, language);

    await TTSLog.create({
      userId,
      provider: "ElevenLabs",
      voiceId,
      text,
      audioUrl: ""
    });

    res.set({
      'Content-Type': 'audio/mpeg',
      'Content-Disposition': 'attachment; filename="speech.mp3"'
    });
    res.send(audioBuffer);
  } catch (err) {
    res.status(500).json({ error: "TTS failed", message: err.message });
  }
};


// 📜 Fetch User Logs
export const getTTSLogs = async (req, res) => {
  try {
    const userId = req.user._id;
    const logs = await TTSLog.find({ userId }).sort({ createdAt: -1 });
    res.json(logs);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch logs" });
  }
};

// 🗣️ Get Available Voices
export const getAvailableVoices = async (req, res) => {
  try {
    const response = await axios.get("https://api.elevenlabs.io/v1/voices", {
      headers: {
        "xi-api-key": process.env.ELEVENLABS_API_KEY
      }
    });

    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch voices", message: error.message });
  }
};
