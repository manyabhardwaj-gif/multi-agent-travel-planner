import React, { useState } from 'react';
import { 
  Calendar, 
  Clock, 
  MapPin, 
  DollarSign, 
  Navigation, 
  Sparkles, 
  Train, 
  Footprints, 
  Car, 
  Plane,
  ChevronRight,
  Compass
} from 'lucide-react';
import { formatCurrency, getInterestEmoji } from '../utils/formatters';

export default function DaySchedule({ dailyPlans = [] }) {
  const [selectedDay, setSelectedDay] = useState(1); // 1-indexed

  if (!dailyPlans || dailyPlans.length === 0) return null;

  const currentPlan = dailyPlans.find(d => d.dayNumber === selectedDay) || dailyPlans[0];

  const getTransitIcon = (transitStr = '') => {
    const s = transitStr.toLowerCase();
    if (s.includes('walk') || s.includes('footprint')) return <Footprints className="w-3.5 h-3.5 text-emerald-400" />;
    if (s.includes('car') || s.includes('taxi') || s.includes('rideshare')) return <Car className="w-3.5 h-3.5 text-amber-400" />;
    if (s.includes('airport') || s.includes('flight')) return <Plane className="w-3.5 h-3.5 text-blue-400" />;
    return <Train className="w-3.5 h-3.5 text-indigo-400" />;
  };

  return (
    <div className="glass-panel-elevated rounded-3xl p-6 border border-amber-500/20 shadow-xl">
      
      {/* Top Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-6 pb-4 border-b border-slate-800">
        <div className="flex items-center space-x-3">
          <div className="p-3 rounded-2xl bg-amber-500/20 text-amber-400 border border-amber-500/30">
            <Compass className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30">
              ACTIVITIES_AGENT Curated Schedule
            </span>
            <h3 className="text-lg font-bold text-white mt-1 font-display">
              Day-by-Day Experience & Transit Matrix
            </h3>
          </div>
        </div>

        <div className="text-xs text-slate-400 font-mono">
          {dailyPlans.length} Days Planned • Sequential Transit Validated
        </div>
      </div>

      {/* Day Selector Pills */}
      <div className="flex items-center space-x-2 overflow-x-auto pb-3 mb-6 scrollbar-none">
        {dailyPlans.map((plan) => (
          <button
            key={plan.dayNumber}
            type="button"
            onClick={() => setSelectedDay(plan.dayNumber)}
            className={`px-4 py-2.5 rounded-2xl text-xs font-semibold whitespace-nowrap transition-all flex items-center space-x-2 border cursor-pointer ${
              selectedDay === plan.dayNumber
                ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white border-indigo-400/80 shadow-lg shadow-indigo-600/30 scale-102'
                : 'bg-slate-900/80 text-slate-400 border-slate-800 hover:border-slate-700 hover:text-white'
            }`}
          >
            <span>Day {plan.dayNumber}</span>
            <span className="opacity-60 text-[10px]">
              ({plan.activities?.length || 3} stops)
            </span>
          </button>
        ))}
      </div>

      {/* Current Day Theme Headline */}
      <div className="bg-slate-900/90 rounded-2xl p-4 border border-slate-800/90 mb-6 flex items-center justify-between">
        <div>
          <span className="text-[11px] font-semibold uppercase tracking-wider text-amber-400 block mb-0.5">
            Day {currentPlan.dayNumber} Focus
          </span>
          <h4 className="text-base font-bold text-white font-display">
            {currentPlan.theme}
          </h4>
        </div>
        <span className="text-xs px-3 py-1 rounded-full bg-slate-800 text-slate-300 border border-slate-700 font-medium">
          3 Balanced Time Slots
        </span>
      </div>

      {/* Timeline of Activities for Current Day */}
      <div className="space-y-6">
        {currentPlan.activities?.map((activity, index) => {
          const transitNote = activity.validatedTransit || activity.transitFromPrev;
          return (
            <div key={activity.id || index} className="space-y-3">
              
              {/* Transit buffer banner between events */}
              {transitNote && (
                <div className="ml-4 sm:ml-8 pl-4 py-1.5 border-l-2 border-dashed border-indigo-500/40 flex items-center space-x-2 text-xs text-indigo-300">
                  <div className="p-1 rounded-md bg-indigo-950 border border-indigo-800/60">
                    {getTransitIcon(transitNote)}
                  </div>
                  <span className="font-semibold text-slate-400">Validated Route:</span>
                  <span className="text-slate-300 font-mono text-[11px]">{transitNote}</span>
                </div>
              )}

              {/* Activity Card */}
              <div className="bg-slate-900/90 hover:bg-slate-900 border border-slate-800 hover:border-slate-700/80 rounded-2xl p-5 transition-all shadow-md">
                <div className="flex flex-wrap items-start justify-between gap-2 mb-3">
                  <div>
                    {/* Time Slot & Tags */}
                    <div className="flex flex-wrap items-center gap-2 mb-1.5">
                      <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 flex items-center gap-1 font-mono">
                        <Clock className="w-3 h-3" />
                        {activity.timeSlot}
                      </span>

                      {activity.tags?.map((tag) => (
                        <span key={tag} className="text-[11px] px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700/60 flex items-center gap-1">
                          <span>{getInterestEmoji(tag)}</span>
                          <span className="capitalize">{tag}</span>
                        </span>
                      ))}
                    </div>

                    <h5 className="text-base font-bold text-white font-display">
                      {activity.name}
                    </h5>
                  </div>

                  {/* Price Tag */}
                  <div className="text-right">
                    <span className="text-sm font-bold text-emerald-400 font-mono">
                      {activity.costPerPerson === 0 ? 'Free Entry' : formatCurrency(activity.costPerPerson)}
                    </span>
                    {activity.costPerPerson > 0 && (
                      <span className="text-[10px] text-slate-500 block">per person</span>
                    )}
                  </div>
                </div>

                {/* Highlights */}
                <p className="text-xs text-slate-300 leading-relaxed mb-3">
                  {activity.highlights}
                </p>

                {/* Footer: Location & Travel Tip */}
                <div className="pt-3 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-2 text-xs text-slate-400">
                  <div className="flex items-center space-x-1.5">
                    <MapPin className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                    <span className="text-slate-300">{activity.location}</span>
                    <span>•</span>
                    <span className="font-mono text-slate-400">{activity.duration}</span>
                  </div>

                  {activity.travelTip && (
                    <div className="flex items-center space-x-1 text-[11px] text-indigo-300 italic">
                      <span>Tip: {activity.travelTip}</span>
                    </div>
                  )}
                </div>
              </div>

            </div>
          );
        })}
      </div>

    </div>
  );
}
