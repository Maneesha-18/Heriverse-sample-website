import { GoogleGenerativeAI } from "@google/generative-ai";

// @desc    Chat with Gemini AI
// @route   POST /api/ai/chat
export const chatWithAI = async (req, res) => {
  try {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({ message: "Please provide a message" });
    }

    const apiKey = process.env.GEMINI_API_KEY;

    // Check if API Key is configured and is not the placeholder
    if (!apiKey || apiKey === "YOUR_GEMINI_API_KEY_HERE") {
      return res.json({
        reply: `👋 Vanakkam! I am your HeriVerse Heritage Assistant. 

(Note: Google Gemini API key is not configured in your backend .env file. Please update GEMINI_API_KEY in backend/.env to unlock live AI chat!)

Here is some heritage information about Tamil Nadu:
Tamil Nadu is famous for its Dravidian-style Hindu temples, classical music, dance (Bharatanatyam), and rich cultural history. Key sites include:
1. **Brihadeeswarar Temple (Thanjavur)**: Built by Raja Raja Chola I.
2. **Meenakshi Amman Temple (Madurai)**: Celebrated for its giant gopurams.
3. **Shore Temple (Mahabalipuram)**: UNESCO World Heritage stone carving site.
4. **Festivals**: Pongal (Harvest Festival) and the Chithirai Festival in Madurai.`
      });
    }

    // Initialize Gemini SDK with the latest supported model
    const genAI = new GoogleGenerativeAI(apiKey);

    const model = genAI.getGenerativeModel({
      model: "gemini-flash-lite-latest",
    });

    // Build the prompt (preserving original business logic)
    const prompt = `You are an expert tourist guide and historian specialized in Tamil Nadu Heritage Sites. Answer this question in a detailed, engaging, and friendly manner: "${message}". Keep the answer relevant, concise (around 2-3 paragraphs), and format it nicely using markdown.`;

    // Call Gemini API via SDK
    const result = await model.generateContent(prompt);
    const replyText = result.response.text();

    res.json({ reply: replyText });

  } catch (error) {
    console.error("Gemini API Error details:", error);
    res.status(500).json({ message: "AI Service error", error: error.message });
  }
};
