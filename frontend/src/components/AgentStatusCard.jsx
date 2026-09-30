import React from 'react';
import { Plane, Building2, Compass, Cpu, CheckCircle2, Loader2, AlertTriangle, ShieldCheck } from 'lucide-react';
import { getAgentMetadata } from '../utils/formatters';

export default function AgentStatusCard({ agentId, status, latestMessage, details, metric }) {
  const meta = getAgentMetadata(agentId);

  const getIcon = () => {
    switch (agentId) {
      case 'FLIGHTS_AGENT':
        return <Plane className="w-5 h-5 text-indigo-400" />;
      case 'HOTELS_AGENT':
        return <Building2 className="w-5 h-5 text-emerald-400" />;
      case 'ACTIVITIES_AGENT':
        return <Compass className="w-5 h-5 text-amber-400" />;
      case 'ITINERARY_COORDINATOR':
      default:
        return <Cpu className="w-5 h-5 text-purple-400" />;
    }
  };

  const getStatusBadge = () => {
    switch (status) {
      case 'COMPLETED':
        return (
          <span className="flex items-center space-x-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
            <CheckCircle2 className="w-3 h-3" />
            <span>Completed</span>
          </span>
        );
      case 'BUDGET_OVERRUN_DETECTED':
      case 'REBALANCING_STEP':
        return (
          <span className="flex items-center space-x-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-amber-500/20 text-amber-300 border border-amber-500/30 animate-pulse">
            <AlertTriangle className="w-3 h-3" />
            <span>Re-balancing</span>
          </span>
        );
      case 'BUDGET_REBALANCED':
      case 'BUDGET_VERIFIED':
        return (
          <span className="flex items-center space-x-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
            <ShieldCheck className="w-3 h-3" />
            <span>Verified</span>
          </span>
        );
      case 'RUNNING':
      case 'REASONING':
      case 'STARTED':
      case 'DISPATCHING_AGENTS':
      case 'SYNTHESIZING_AGENTS':
      case 'VALIDATING_TRANSIT_TIMES':
      case 'COMPARING_AIRLINES':
      case 'VERIFYING_AMENITIES':
      case 'CALCULATING_PACING':
        return (
          <span className="flex items-center space-x-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
            <Loader2 className="w-3 h-3 animate-spin" />
            <span>Active</span>
          </span>
        );
      default:
        return (
          <span className="px-2 py-0.5 rounded-full text-[11px] font-medium bg-slate-800 text-slate-400 border border-slate-700">
            Standby
          </span>
        );
    }
  };

  const isCompleted = status === 'COMPLETED';
  const isActive = status && status !== 'IDLE' && status !== 'COMPLETED';

  return (
    <div className={`rounded-2xl p-4 sm:p-5 border transition-all duration-300 relative overflow-hidden ${
      isActive 
        ? `${meta.borderColor} ${meta.bgLight} shadow-lg shadow-indigo-950/40 ring-1 ring-indigo-500/30` 
        : isCompleted 
          ? 'border-emerald-500/30 bg-slate-900/80 shadow-md' 
          : 'border-slate-800/80 bg-slate-900/50 opacity-70'
    }`}>
      {/* Active pulse effect */}
      {isActive && (
        <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-indigo-500/10 to-transparent rounded-bl-full pointer-events-none"></div>
      )}

      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center space-x-3">
          <div className={`p-2.5 rounded-xl bg-slate-800/80 border border-slate-700/60 shadow-inner`}>
            {getIcon()}
          </div>
          <div>
            <h3 className="font-semibold text-sm text-white tracking-tight">{meta.name}</h3>
            <p className="text-[11px] text-slate-400">{meta.role}</p>
          </div>
        </div>
        {getStatusBadge()}
      </div>

      {/* Latest Reasoning / Thought */}
      <div className="bg-slate-950/70 rounded-xl p-3 border border-slate-800/80 min-h-[58px] flex items-center">
        <p className="text-xs text-slate-300 leading-relaxed line-clamp-2">
          {latestMessage || 'Waiting for coordinator task assignment...'}
        </p>
      </div>

      {/* Metric / output badge */}
      {metric && (
        <div className="mt-3 pt-2.5 border-t border-slate-800/80 flex items-center justify-between text-xs">
          <span className="text-slate-400 font-medium">{metric.label}:</span>
          <span className="font-semibold text-emerald-400 font-mono">{metric.value}</span>
        </div>
      )}
    </div>
  );
}
