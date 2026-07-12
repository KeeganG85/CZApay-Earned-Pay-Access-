import express from "express";
import path from "path";
import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";
import { createServer as createViteServer } from "vite";

dotenv.config();

// Initialize Gemini Client
const apiKey = process.env.GEMINI_API_KEY;
const ai = new GoogleGenAI({
  apiKey: apiKey || "",
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    }
  }
});

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API endpoint for Chat Advisor
  app.post("/api/advisor/chat", async (req: any, res: any) => {
    try {
      const { message, history } = req.body;
      if (!message) {
        return res.status(400).json({ error: "Message is required." });
      }

      if (!apiKey || apiKey === "MY_GEMINI_API_KEY") {
        // Return a friendly offline mode response if API key is not configured yet
        return res.json({
          text: `🇿🇦 **Sanibonani!** I'm your CZApay Financial Wellness Coach. 

It looks like my live connection is currently running in offline/demo mode, but I can still share some key tips! 

**Earned Wage Access (EWA)** is a highly responsible alternative to micro-loans or high-interest payday loans in South Africa. Instead of borrowing money at 30%+ interest, CZApay lets you access money you have already worked for, before payday, for a tiny flat fee (like R35). 

This is not a loan, so there are no compound interest rates, no credit checks, and no risk of falling into debt spirals. 

How can I help you learn about budgeting or managing your finances today?`
        });
      }

      let chatResponse;
      if (history && history.length > 0) {
        // Format history to match standard @google/genai chat history format
        const formattedHistory = history.map((turn: any) => ({
          role: turn.role === "assistant" ? "model" : "user",
          parts: [{ text: turn.text || turn.content || "" }]
        }));
        
        const customChat = ai.chats.create({
          model: "gemini-3.5-flash",
          history: formattedHistory,
          config: {
            systemInstruction: `You are the friendly CZApay Financial Wellness Coach, an AI assistant dedicated to South African employees.
Your tone is professional, warm, encouraging, and empathetic. Use South African terms appropriately (e.g. Rand/R, cents, payday, BCEA, SARS, "howzit", "ubuntu").
Explain that CZApay is an Earned Wage Access (EWA) platform, NOT a loan. There is no interest, no credit checks, and no debt spiral. It is just access to money employees have already worked for.
Explain budgeting techniques (e.g. 50/30/20 rule), how to avoid high-interest payday loans (mashonisas) or bank overdrafts, and how to build an emergency fund.
Answer questions about South African labor context (e.g. Basic Conditions of Employment Act - BCEA), salary deductions, tax (PAYE), and financial wellness. Keep responses relatively concise, structured, and easy to read.`,
          }
        });
        
        const response = await customChat.sendMessage({ message });
        chatResponse = response.text;
      } else {
        const chat = ai.chats.create({
          model: "gemini-3.5-flash",
          config: {
            systemInstruction: `You are the friendly CZApay Financial Wellness Coach, an AI assistant dedicated to South African employees.
Your tone is professional, warm, encouraging, and empathetic. Use South African terms appropriately (e.g. Rand/R, cents, payday, BCEA, SARS, "howzit", "ubuntu").
Explain that CZApay is an Earned Wage Access (EWA) platform, NOT a loan. There is no interest, no credit checks, and no debt spiral. It is just access to money employees have already worked for.
Explain budgeting techniques (e.g. 50/30/20 rule), how to avoid high-interest payday loans (mashonisas) or bank overdrafts, and how to build an emergency fund.
Answer questions about South African labor context (e.g. Basic Conditions of Employment Act - BCEA), salary deductions, tax (PAYE), and financial wellness. Keep responses relatively concise, structured, and easy to read.`,
          }
        });
        
        const response = await chat.sendMessage({ message });
        chatResponse = response.text;
      }

      res.json({ text: chatResponse });
    } catch (error: any) {
      console.error("Gemini Advisor API Error:", error);
      res.status(500).json({ error: "Failed to generate financial wellness advice: " + error.message });
    }
  });

  // Vite / static file serving
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`CZApay Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
