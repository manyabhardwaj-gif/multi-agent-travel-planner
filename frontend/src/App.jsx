import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import TripForm from './components/TripForm';
import AgentProgressStream from './components/AgentProgressStream';
import ItineraryView from './components/ItineraryView';
import { Sparkles, Bot, Plane, ShieldCheck, Compass, ArrowUpRight } from 'lucide-react';

export default function App() {
  const [geminiApiKey, setGeminiApiKey] = useState(() => {
    return localStorage.getItem('AEROVOYAGE_GEMINI_KEY') || '';
  });

  const [isPlanning, setIsPlanning] = useState(false);
  const [activeStep, setActiveStep] = useState(1);
  const [logs, setLogs] = useState([]);
  const [itinerary, setItinerary] = useState(null);
  const [error, setError] = useState(null);

  const [agentStates, setAgentStates] = useState({
    FLIGHTS_AGENT: { status: 'IDLE', message: 'Waiting for task dispatch...' },
    HOTELS_AGENT: { status: 'IDLE', message: 'Waiting for task dispatch...' },
    ACTIVITIES_AGENT: { status: 'IDLE', message: 'Waiting for task dispatch...' },
    ITINERARY_COORDINATOR: { status: 'IDLE', message: 'Master coordinator standby...' }
  });

  const handleUpdateGeminiKey = (key) => {
    setGeminiApiKey(key);
    if (key) {
      localStorage.setItem('AEROVOYAGE_GEMINI_KEY', key);
    } else {
      localStorage.removeItem('AEROVOYAGE_GEMINI_KEY');
    }
  };

  const handleStartTripPlanning = async (tripParams) => {
    setIsPlanning(true);
    setError(null);
    setItinerary(null);
    setActiveStep(1);
    setLogs([]);

    // Reset agent states
    setAgentStates({
      FLIGHTS_AGENT: { status: 'STARTED', message: `Initializing flight search for ${tripParams.destination}...` },
      HOTELS_AGENT: { status: 'STARTED', message: `Initializing lodging analysis for ${tripParams.destination}...` },
      ACTIVITIES_AGENT: { status: 'STARTED', message: `Initializing activity curation for ${tripParams.destination}...` },
      ITINERARY_COORDINATOR: { status: 'RUNNING', message: 'Coordinator orchestrating parallel agent execution...' }
    });

    try {
      const payload = {
        ...tripParams,
        geminiApiKey: geminiApiKey || undefined
      };

      // Connect to SSE streaming endpoint via fetch reader
      const response = await fetch('/api/plan-trip-stream', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        throw new Error(`Server returned HTTP ${response.status}`);
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder('utf-8');
      let buffer = '';

      while (true) {
        const { value, done } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split('\n\n');
        buffer = lines.pop(); // keep remainder

        for (const block of lines) {
          if (!block.trim()) continue;

          let eventType = 'message';
          let dataStr = '';

          const blockLines = block.split('\n');
          for (const line of blockLines) {
            if (line.startsWith('event: ')) {
              eventType = line.replace('event: ', '').trim();
            } else if (line.startsWith('data: ')) {
              dataStr = line.replace('data: ', '').trim();
            }
          }

          if (dataStr) {
            try {
              const data = JSON.parse(dataStr);

              if (eventType === 'agent_progress') {
                const { agentId, step, message, totalFlightCost, totalHotelCost, totalActivitiesCost, finalItinerarySummary } = data;

                // Update logs
                setLogs(prev => [...prev, data]);

                // Update individual agent state
                setAgentStates(prev => ({
                  ...prev,
                  [agentId]: {
                    ...prev[agentId],
                    status: step,
                    message: message || prev[agentId]?.message,
                    totalFlightCost: totalFlightCost !== undefined ? totalFlightCost : prev[agentId]?.totalFlightCost,
                    totalHotelCost: totalHotelCost !== undefined ? totalHotelCost : prev[agentId]?.totalHotelCost,
                    totalActivitiesCost: totalActivitiesCost !== undefined ? totalActivitiesCost : prev[agentId]?.totalActivitiesCost,
                    finalItinerarySummary: finalItinerarySummary || prev[agentId]?.finalItinerarySummary
                  }
                }));

                // Progress active pipeline step
                if (step === 'DISPATCHING_AGENTS' || agentId !== 'ITINERARY_COORDINATOR') {
                  setActiveStep(2);
                }
                if (step.includes('BUDGET') || step.includes('REBALANC') || step === 'SYNTHESIZING_AGENTS') {
                  setActiveStep(3);
                }
                if (step === 'VALIDATING_TRANSIT_TIMES' || step === 'COMPLETED') {
                  setActiveStep(4);
                }
              } else if (eventType === 'final_itinerary') {
                setItinerary(data);
                setIsPlanning(false);
                setActiveStep(4);
              } else if (eventType === 'agent_error') {
                setError(data.message || 'An error occurred during agent collaboration.');
                setIsPlanning(false);
              }
            } catch (err) {
              console.warn('Failed to parse SSE event data:', err);
            }
          }
        }
      }
    } catch (err) {
      console.warn('SSE streaming encountered an issue. Falling back to standard JSON endpoint...', err);
      // Fallback to standard JSON endpoint
      try {
        const fallbackRes = await fetch('/api/plan-trip', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ ...tripParams, geminiApiKey: geminiApiKey || undefined })
        });
        const fallbackData = await fallbackRes.json();
        if (fallbackData.success && fallbackData.itinerary) {
          setItinerary(fallbackData.itinerary);
          setLogs(fallbackData.logs || []);
        } else {
          setError(fallbackData.message || 'Failed to generate itinerary.');
        }
      } catch (fallbackErr) {
        setError(fallbackErr.message || 'Could not communicate with the multi-agent backend.');
      } finally {
        setIsPlanning(false);
      }
    }
  };

  const handleResetTrip = () => {
    setItinerary(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      
      {/* Top Header */}
      <Header 
        geminiApiKey={geminiApiKey}
        setGeminiApiKey={handleUpdateGeminiKey}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-10">
        
        {/* Hero Section if no itinerary yet */}
        {!itinerary && !isPlanning && (
          <div className="text-center max-w-3xl mx-auto space-y-4 pt-4">
            <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-semibold">
              <Bot className="w-4 h-4 text-indigo-400" />
              <span>Autonomous Multi-Agent Travel Architecture</span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white font-display">
              Orchestrate Your Perfect Trip with <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">Collaborative AI Agents</span>
            </h1>
            <p className="text-sm sm:text-base text-slate-400 max-w-2xl mx-auto leading-relaxed">
              Four specialized AI agents work in parallel: searching flights, auditing hotels, curating unique activities, and resolving budget constraints into a seamless, travel-ready dossier.
            </p>
          </div>
        )}

        {/* Input Configuration Form */}
        {!itinerary && (
          <div className="max-w-4xl mx-auto">
            <TripForm 
              onSubmit={handleStartTripPlanning}
              isPlanning={isPlanning}
            />
          </div>
        )}

        {/* Live Agent Progress Streaming Section */}
        {isPlanning && (
          <div className="max-w-5xl mx-auto animate-fade-in">
            <div className="text-center mb-6">
              <h3 className="text-xl font-bold text-white font-display flex items-center justify-center gap-2">
                <Sparkles className="w-5 h-5 text-indigo-400" />
                <span>Multi-Agents in Parallel Execution</span>
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                Watch the specialized agents inspect airline schedules, audit hotels, and calculate transit feasibility in real time.
              </p>
            </div>

            <AgentProgressStream
              agentStates={agentStates}
              logs={logs}
              isPlanning={isPlanning}
              activeStep={activeStep}
            />
          </div>
        )}

        {/* Error notification banner if any */}
        {error && (
          <div className="max-w-3xl mx-auto p-4 rounded-2xl bg-rose-950/60 border border-rose-800 text-rose-200 text-sm flex items-center justify-between">
            <span>{error}</span>
            <button 
              onClick={() => setError(null)}
              className="px-3 py-1 rounded-lg bg-rose-900/60 hover:bg-rose-900 text-xs font-semibold"
            >
              Dismiss
            </button>
          </div>
        )}

        {/* Generated Final Itinerary View */}
        {itinerary && (
          <div className="max-w-6xl mx-auto">
            <ItineraryView 
              itinerary={itinerary}
              onReset={handleResetTrip}
            />
          </div>
        )}

      </main>

      {/* Footer */}
      <footer className="border-t border-slate-900 bg-slate-950/90 py-8 mt-16 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 rounded-full bg-emerald-400"></div>
            <span>
              AeroVoyage AI • Created with ❤️ by <strong className="text-slate-300 font-medium">Manya Bhardwaj</strong> • Powered by Gemini 3 Multi-Agent Collaboration Engine
            </span>
          </div>
          <div className="flex items-center space-x-4 text-slate-400">
            <span>Flights Agent</span>
            <span>•</span>
            <span>Hotels Agent</span>
            <span>•</span>
            <span>Activities Agent</span>
            <span>•</span>
            <span>Coordinator Agent</span>
          </div>
        </div>
      </footer>

    </div>
  );
}
