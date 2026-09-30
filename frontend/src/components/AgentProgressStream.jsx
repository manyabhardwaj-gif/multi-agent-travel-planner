import React, { useState, useRef, useEffect } from 'react';
import { Terminal, Activity, ChevronDown, ChevronUp, Cpu, CheckCircle } from 'lucide-react';
import AgentStatusCard from './AgentStatusCard';
import { formatCurrency } from '../utils/formatters';

export default function AgentProgressStream({ 
  agentStates, 
  logs = [], 
  isPlanning,
  activeStep = 1 
}) {
  const [showLogs, setShowLogs] = useState(true);
  const logContainerRef = useRef(null);

  // Auto-scroll logs
  useEffect(() => {
    if (logContainerRef.current) {
      logContainerRef.current.scrollTop = logContainerRef.current.scrollHeight;
    }
  }, [logs]);

  // Aggregate metrics from agent outputs
  const flightsMetric = agentStates.FLIGHTS_AGENT?.totalFlightCost
    ? { label: 'Selected Flight', value: formatCurrency(agentStates.FLIGHTS_AGENT.totalFlightCost) }
    : null;

  const hotelsMetric = agentStates.HOTELS_AGENT?.totalHotelCost
    ? { label: 'Lodging Total', value: formatCurrency(agentStates.HOTELS_AGENT.totalHotelCost) }
    : null;

  const activitiesMetric = agentStates.ACTIVITIES_AGENT?.totalActivitiesCost !== undefined
    ? { label: 'Activities Total', value: formatCurrency(agentStates.ACTIVITIES_AGENT.totalActivitiesCost) }
    : null;

  const coordinatorMetric = agentStates.ITINERARY_COORDINATOR?.finalItinerarySummary
    ? { label: 'Total Budget Used', value: formatCurrency(agentStates.ITINERARY_COORDINATOR.finalItinerarySummary.totalCost) }
    : null;

  return (
    <div className="space-y-6">
      
      {/* Workflow Step Progress Bar */}
      <div className="glass-panel rounded-2xl p-4 sm:p-5 border border-slate-800">
        <div className="flex items-center justify-between mb-3 text-xs">
          <span className="font-semibold text-slate-300 flex items-center gap-1.5">
            <Activity className="w-4 h-4 text-indigo-400" />
            <span>Autonomous Pipeline Progression</span>
          </span>
          <span className="font-mono text-indigo-400 font-medium">
            {isPlanning ? 'Phase: Active Execution' : 'Phase: Itinerary Ready'}
          </span>
        </div>

        {/* 4 Steps */}
        <div className="grid grid-cols-4 gap-2 text-center text-xs">
          {[
            { num: 1, label: 'Parameters Extraction' },
            { num: 2, label: 'Simultaneous Agent Search' },
            { num: 3, label: 'Constraint & Budget Audit' },
            { num: 4, label: 'Cohesive Synthesis' }
          ].map((step) => {
            const isDone = !isPlanning || activeStep > step.num;
            const isCurrent = isPlanning && activeStep === step.num;
            return (
              <div key={step.num} className="flex flex-col items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs mb-1.5 transition-all ${
                  isDone 
                    ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20' 
                    : isCurrent 
                      ? 'bg-indigo-600 text-white ring-4 ring-indigo-500/30 animate-pulse' 
                      : 'bg-slate-800 text-slate-500'
                }`}>
                  {isDone ? <CheckCircle className="w-4 h-4" /> : step.num}
                </div>
                <span className={`text-[11px] hidden sm:block ${isCurrent ? 'text-indigo-300 font-semibold' : isDone ? 'text-slate-300' : 'text-slate-500'}`}>
                  {step.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* 4 Agent Status Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <AgentStatusCard
          agentId="FLIGHTS_AGENT"
          status={agentStates.FLIGHTS_AGENT?.status || 'IDLE'}
          latestMessage={agentStates.FLIGHTS_AGENT?.message}
          details={agentStates.FLIGHTS_AGENT?.details}
          metric={flightsMetric}
        />
        <AgentStatusCard
          agentId="HOTELS_AGENT"
          status={agentStates.HOTELS_AGENT?.status || 'IDLE'}
          latestMessage={agentStates.HOTELS_AGENT?.message}
          details={agentStates.HOTELS_AGENT?.details}
          metric={hotelsMetric}
        />
        <AgentStatusCard
          agentId="ACTIVITIES_AGENT"
          status={agentStates.ACTIVITIES_AGENT?.status || 'IDLE'}
          latestMessage={agentStates.ACTIVITIES_AGENT?.message}
          details={agentStates.ACTIVITIES_AGENT?.details}
          metric={activitiesMetric}
        />
        <AgentStatusCard
          agentId="ITINERARY_COORDINATOR"
          status={agentStates.ITINERARY_COORDINATOR?.status || 'IDLE'}
          latestMessage={agentStates.ITINERARY_COORDINATOR?.message}
          details={agentStates.ITINERARY_COORDINATOR?.details}
          metric={coordinatorMetric}
        />
      </div>

      {/* Live Agent Reasoning Terminal Feed */}
      <div className="glass-panel rounded-2xl border border-slate-800 overflow-hidden shadow-xl">
        <div 
          onClick={() => setShowLogs(!showLogs)}
          className="px-4 py-3 bg-slate-900/90 border-b border-slate-800 flex items-center justify-between cursor-pointer select-none hover:bg-slate-900 transition"
        >
          <div className="flex items-center space-x-2">
            <Terminal className="w-4 h-4 text-indigo-400" />
            <span className="text-xs font-semibold text-slate-200">Real-Time Agent Reasoning Stream</span>
            <span className="px-2 py-0.5 rounded-full bg-slate-800 text-[10px] text-slate-400 font-mono">
              {logs.length} events
            </span>
          </div>
          <button className="text-slate-400 hover:text-white p-1">
            {showLogs ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>
        </div>

        {showLogs && (
          <div 
            ref={logContainerRef}
            className="p-4 bg-slate-950 font-mono text-xs text-slate-300 max-h-64 overflow-y-auto space-y-2.5 transition-all"
          >
            {logs.length === 0 ? (
              <p className="text-slate-600 italic">Connecting to agent streaming pipeline...</p>
            ) : (
              logs.map((log, index) => {
                const isOverrun = log.step?.includes('OVERRUN');
                const isRebalance = log.step?.includes('REBALANC');
                const isComplete = log.step === 'COMPLETED';

                return (
                  <div key={index} className="flex items-start space-x-2.5 leading-relaxed animate-fade-in">
                    <span className="text-slate-600 text-[10px] shrink-0 pt-0.5">
                      {log.timestamp ? new Date(log.timestamp).toLocaleTimeString() : '00:00:00'}
                    </span>
                    <span className={`px-1.5 py-0.5 rounded text-[10px] font-semibold shrink-0 ${
                      log.agentId === 'FLIGHTS_AGENT' ? 'bg-indigo-950 text-indigo-400 border border-indigo-800/50' :
                      log.agentId === 'HOTELS_AGENT' ? 'bg-emerald-950 text-emerald-400 border border-emerald-800/50' :
                      log.agentId === 'ACTIVITIES_AGENT' ? 'bg-amber-950 text-amber-400 border border-amber-800/50' :
                      'bg-purple-950 text-purple-400 border border-purple-800/50'
                    }`}>
                      {log.agentId?.replace('_AGENT', '') || 'SYSTEM'}
                    </span>
                    <span className={`flex-1 break-words ${
                      isOverrun ? 'text-amber-300 font-semibold' :
                      isRebalance ? 'text-cyan-300' :
                      isComplete ? 'text-emerald-300 font-semibold' :
                      'text-slate-300'
                    }`}>
                      {log.message || JSON.stringify(log)}
                    </span>
                  </div>
                );
              })
            )}
          </div>
        )}
      </div>

    </div>
  );
}
