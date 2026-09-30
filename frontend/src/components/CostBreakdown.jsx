import React from 'react';
import { DollarSign, PieChart, ShieldCheck, CheckCircle2, TrendingDown } from 'lucide-react';
import { formatCurrency } from '../utils/formatters';

export default function CostBreakdown({ costBreakdown, tripSummary, coordinatorVerdict }) {
  if (!costBreakdown) return null;

  const {
    flights = 0,
    hotels = 0,
    activities = 0,
    foodAndTransit = 0,
    grandTotal = 0,
    budgetLimit = 0,
    remainingSavings = 0
  } = costBreakdown;

  const flightPct = Math.round((flights / grandTotal) * 100) || 0;
  const hotelPct = Math.round((hotels / grandTotal) * 100) || 0;
  const activityPct = Math.round((activities / grandTotal) * 100) || 0;
  const foodTransitPct = Math.max(0, 100 - flightPct - hotelPct - activityPct);

  return (
    <div className="glass-panel-elevated rounded-3xl p-6 border border-purple-500/20 shadow-xl">
      
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-6 pb-4 border-b border-slate-800">
        <div className="flex items-center space-x-3">
          <div className="p-3 rounded-2xl bg-purple-500/20 text-purple-400 border border-purple-500/30">
            <PieChart className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30">
              ITINERARY_COORDINATOR Financial Audit
            </span>
            <h3 className="text-lg font-bold text-white mt-1 font-display">
              Comprehensive Cost Breakdown
            </h3>
          </div>
        </div>

        {/* Master Total */}
        <div className="text-right">
          <div className="text-2xl font-bold text-emerald-400 font-mono">
            {formatCurrency(grandTotal)}
          </div>
          <div className="text-xs text-slate-400">
            Target Budget: <span className="font-mono text-slate-300">{formatCurrency(budgetLimit)}</span>
          </div>
        </div>
      </div>

      {/* Visual Distribution Bar */}
      <div className="mb-6">
        <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
          <span>Expense Distribution</span>
          <span className="font-mono text-emerald-400 font-medium">
            {remainingSavings > 0 ? `${formatCurrency(remainingSavings)} Reserve Buffer Remaining` : '100% Allocated'}
          </span>
        </div>

        {/* Stacked bar */}
        <div className="h-4 w-full bg-slate-900 rounded-full overflow-hidden flex border border-slate-800">
          <div style={{ width: `${flightPct}%` }} className="bg-indigo-500 transition-all duration-500" title={`Flights: ${flightPct}%`} />
          <div style={{ width: `${hotelPct}%` }} className="bg-emerald-500 transition-all duration-500" title={`Lodging: ${hotelPct}%`} />
          <div style={{ width: `${activityPct}%` }} className="bg-amber-500 transition-all duration-500" title={`Activities: ${activityPct}%`} />
          <div style={{ width: `${foodTransitPct}%` }} className="bg-purple-500 transition-all duration-500" title={`Food & Transit: ${foodTransitPct}%`} />
        </div>

        {/* Legend */}
        <div className="flex flex-wrap items-center gap-4 mt-3 text-xs">
          <div className="flex items-center space-x-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-indigo-500"></div>
            <span className="text-slate-300">Flights ({flightPct}%)</span>
          </div>
          <div className="flex items-center space-x-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-500"></div>
            <span className="text-slate-300">Lodging ({hotelPct}%)</span>
          </div>
          <div className="flex items-center space-x-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-amber-500"></div>
            <span className="text-slate-300">Activities ({activityPct}%)</span>
          </div>
          <div className="flex items-center space-x-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-purple-500"></div>
            <span className="text-slate-300">Food & Transit Buffer ({foodTransitPct}%)</span>
          </div>
        </div>
      </div>

      {/* 4 Category Cards Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
        <div className="bg-slate-900/80 rounded-2xl p-3.5 border border-slate-800">
          <span className="text-[11px] font-medium text-indigo-400 block mb-1">Flights</span>
          <div className="text-base font-bold text-white font-mono">{formatCurrency(flights)}</div>
          <span className="text-[10px] text-slate-500">{flightPct}% of total</span>
        </div>

        <div className="bg-slate-900/80 rounded-2xl p-3.5 border border-slate-800">
          <span className="text-[11px] font-medium text-emerald-400 block mb-1">Accommodation</span>
          <div className="text-base font-bold text-white font-mono">{formatCurrency(hotels)}</div>
          <span className="text-[10px] text-slate-500">{hotelPct}% of total</span>
        </div>

        <div className="bg-slate-900/80 rounded-2xl p-3.5 border border-slate-800">
          <span className="text-[11px] font-medium text-amber-400 block mb-1">Curated Activities</span>
          <div className="text-base font-bold text-white font-mono">{formatCurrency(activities)}</div>
          <span className="text-[10px] text-slate-500">{activityPct}% of total</span>
        </div>

        <div className="bg-slate-900/80 rounded-2xl p-3.5 border border-slate-800">
          <span className="text-[11px] font-medium text-purple-400 block mb-1">Food & Incidental</span>
          <div className="text-base font-bold text-white font-mono">{formatCurrency(foodAndTransit)}</div>
          <span className="text-[10px] text-slate-500">{foodTransitPct}% of total</span>
        </div>
      </div>

      {/* Coordinator Verdict */}
      {coordinatorVerdict && (
        <div className="bg-slate-950/70 rounded-2xl p-4 border border-slate-800/80 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center space-x-2.5">
            <div className="p-1.5 rounded-lg bg-emerald-500/20 text-emerald-400">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div>
              <span className="font-semibold text-white block">Coordinator Feasibility Certification</span>
              <span className="text-slate-400">{coordinatorVerdict.transitFeasibility}</span>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <span className="px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 font-semibold border border-emerald-500/30">
              {coordinatorVerdict.budgetAdherence}
            </span>
          </div>
        </div>
      )}

    </div>
  );
}
