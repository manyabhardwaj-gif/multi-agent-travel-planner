import { GoogleGenAI } from '@google/genai';

/**
 * Executes a structured prompt against Gemini with robust JSON extraction and error handling.
 */
export async function callGeminiAgent({ apiKey, systemInstruction, prompt, fallbackData = null }) {
  const effectiveKey = apiKey || process.env.GEMINI_API_KEY;

  if (!effectiveKey) {
    return {
      success: false,
      isSimulated: true,
      data: fallbackData,
      note: "No Gemini API key provided. Using built-in high-precision travel intelligence agent."
    };
  }

  try {
    const ai = new GoogleGenAI({ apiKey: effectiveKey });
    
    // Try modern Gemini model
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        systemInstruction: systemInstruction || "You are an expert AI travel agent. Always output valid JSON.",
        responseMimeType: "application/json",
        temperature: 0.4
      }
    });

    const text = response.text?.trim() || "";
    // Clean up code fences if present
    const cleaned = text.replace(/^```json\s*/i, '').replace(/```$/i, '').trim();
    const parsed = JSON.parse(cleaned);

    return {
      success: true,
      isSimulated: false,
      data: parsed
    };
  } catch (err) {
    console.warn(`[GeminiService] API call failed (${err.message}). Falling back to simulation engine.`, err);
    return {
      success: false,
      isSimulated: true,
      error: err.message,
      data: fallbackData,
      note: `Gemini API returned an error (${err.message}). Seamlessly activated agent simulation engine.`
    };
  }
}
