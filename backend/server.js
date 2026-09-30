import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { runItineraryCoordinator } from './agents/coordinatorAgent.js';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

app.use(cors());
app.use(express.json());

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'online',
    system: 'Multi-Agent Travel Planner Engine',
    hasEnvGeminiKey: Boolean(process.env.GEMINI_API_KEY),
    timestamp: new Date().toISOString()
  });
});

// Test/Verify Gemini API key endpoint
app.post('/api/verify-gemini', async (req, res) => {
  const apiKey = req.body?.apiKey || process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return res.status(400).json({ valid: false, message: 'No API key provided.' });
  }

  try {
    const ai = new GoogleGenAI({ apiKey });
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: 'Ping',
    });
    return res.json({ valid: true, message: 'Gemini API key verified successfully!' });
  } catch (err) {
    return res.status(400).json({ valid: false, message: `Key verification failed: ${err.message}` });
  }
});

// Real-time SSE streaming trip planning endpoint
app.post('/api/plan-trip-stream', async (req, res) => {
  const tripParams = req.body;

  // Set headers for Server-Sent Events
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');
  res.setHeader('Access-Control-Allow-Origin', '*');

  const sendEvent = (eventType, payload) => {
    res.write(`event: ${eventType}\ndata: ${JSON.stringify(payload)}\n\n`);
  };

  const emitProgress = (agentId, step, data) => {
    sendEvent('agent_progress', {
      agentId,
      step,
      ...data,
      timestamp: new Date().toISOString()
    });
  };

  try {
    sendEvent('stream_start', { message: 'Orchestrating multi-agent travel planning system...' });

    const finalPlan = await runItineraryCoordinator({
      tripParams,
      emitProgress
    });

    sendEvent('final_itinerary', finalPlan);
    sendEvent('stream_complete', { message: 'Itinerary generated successfully.' });
    res.end();
  } catch (error) {
    console.error('Error during trip orchestration:', error);
    sendEvent('agent_error', {
      message: error.message || 'An error occurred during travel itinerary synthesis.'
    });
    res.end();
  }
});

// Standard non-streaming JSON endpoint
app.post('/api/plan-trip', async (req, res) => {
  const tripParams = req.body;
  const progressLogs = [];

  const emitProgress = (agentId, step, data) => {
    progressLogs.push({ agentId, step, ...data, timestamp: new Date().toISOString() });
  };

  try {
    const finalPlan = await runItineraryCoordinator({
      tripParams,
      emitProgress
    });

    res.json({
      success: true,
      logs: progressLogs,
      itinerary: finalPlan
    });
  } catch (error) {
    console.error('Plan trip error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Internal server error during itinerary generation'
    });
  }
});

app.listen(PORT, () => {
  console.log(`[Multi-Agent Travel Planner] Server running on http://localhost:${PORT}`);
  console.log(`[Config] Environment Gemini Key: ${process.env.GEMINI_API_KEY ? 'Present' : 'Not set (Hybrid fallback active)'}`);
});
