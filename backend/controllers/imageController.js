import fetch from 'node-fetch';
import Image from '../models/imageModel.js';



export const generateImage = async (req, res) => {
  const { prompt } = req.body;
  console.log("Prompt received:", prompt);

  try {
    const encodedParams = new URLSearchParams();
    encodedParams.set('prompt', prompt);
    encodedParams.set('width', '1024');
    encodedParams.set('height', '1024');
    encodedParams.set('seed', '918440');
    encodedParams.set('model', 'flux');

    const url = 'https://ai-text-to-image-generator-flux-free-api.p.rapidapi.com/aaaaaaaaaaaaaaaaaiimagegenerator/fluximagegenerate/generateimage.php';
    const options = {
      method: 'POST',
      headers: {
        'x-rapidapi-key': process.env.RAPIDAPI_KEY,
        'x-rapidapi-host': 'ai-text-to-image-generator-flux-free-api.p.rapidapi.com',
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: encodedParams,
    };

    const response = await fetch(url, options);

    // Check if response is successful
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`API error: ${response.status} - ${errorText}`);
    }

    // Handle binary response (image)
    const arrayBuffer = await response.arrayBuffer();
    const base64Image = Buffer.from(arrayBuffer).toString('base64');
    const dataUrl = `data:image/png;base64,${base64Image}`;

    // Send the image data back to the frontend
    res.set('Content-Type', 'image/png');
    res.send(Buffer.from(arrayBuffer));
    
  } catch (err) {
    console.error("Image generation error:", err.message);
    res.status(500).json({ message: "Image generation failed" });
  }
};




export const getImageHistory = async (req, res) => {
  try {
    const images = await Image.find({ userId: req.user._id }) // return only current user's history
      .sort({ createdAt: -1 })
      .limit(20);

    res.status(200).json(images);
  } catch (error) {
    console.error("Failed to fetch image history:", error.message);
    res.status(500).json({ message: "Could not fetch image history" });
  }
};
