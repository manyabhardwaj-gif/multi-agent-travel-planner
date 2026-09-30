import React from 'react';
import { Plane, Luggage, Clock, Check, ShieldCheck, ArrowRight, Sparkles } from 'lucide-react';
import { formatCurrency } from '../utils/formatters';

export default function FlightCard({ flight, alternative, travelers = 1 }) {
  if (!flight) return null;

  return (
    <div className="glass-panel-elevated rounded-3xl p-6 border border-indigo-500/20 shadow-xl relative overflow-hidden">
      {/* Top Banner */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-6 pb-4 border-b border-slate-800">
        <div className="flex items-center space-x-3">
          <div className="p-3 rounded-2xl bg-indigo-500/20 text-indigo-400 border border-indigo-500/30">
            <Plane className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                FLIGHTS_AGENT Recommendation
              </span>
              {flight.rebalanced && (
                <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  Optimized
                </span>
              )}
            </div>
            <h3 className="text-lg font-bold text-white mt-1 font-display">
              {flight.airline} <span className="text-slate-400 text-sm font-normal">({flight.flightNumber})</span>
            </h3>
          </div>
        </div>

        {/* Price Tag */}
        <div className="text-right">
          <div className="text-2xl font-bold text-emerald-400 font-mono">
            {formatCurrency(flight.totalPrice)}
          </div>
          <div className="text-xs text-slate-400">
            {formatCurrency(flight.pricePerTraveler)} per person • {travelers} traveler{travelers > 1 ? 's' : ''}
          </div>
        </div>
      </div>

      {/* Flight Legs Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        
        {/* Outbound Leg */}
        <div className="bg-slate-900/90 rounded-2xl p-4 border border-slate-800">
          <div className="flex items-center justify-between mb-3 text-xs text-slate-400 font-medium">
            <span className="flex items-center gap-1.5 text-indigo-300">
              <Plane className="w-3.5 h-3.5 rotate-45" /> Outbound Flight
            </span>
            <span className="px-2 py-0.5 rounded-full bg-slate-800 text-slate-300">
              {flight.outbound?.stops || 'Direct'}
            </span>
          </div>

          <div className="flex items-center justify-between my-2">
            <div>
              <div className="text-lg font-bold text-white">{flight.outbound?.departureTime || '08:30 AM'}</div>
              <div className="text-xs text-slate-400 truncate max-w-[130px]">{flight.outbound?.departureAirport}</div>
            </div>
            <div className="flex flex-col items-center px-3">
              <div className="text-[11px] font-mono text-slate-500 mb-1">{flight.outbound?.duration || '8h 15m'}</div>
              <div className="w-24 h-0.5 bg-indigo-500/40 relative">
                <div className="w-2 h-2 rounded-full bg-indigo-400 absolute right-0 -top-[3px]"></div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-lg font-bold text-white">{flight.outbound?.arrivalTime || '04:45 PM'}</div>
              <div className="text-xs text-slate-400 truncate max-w-[130px]">{flight.outbound?.arrivalAirport}</div>
            </div>
          </div>

          <div className="text-[11px] text-slate-500 mt-3 pt-2 border-t border-slate-800 flex justify-between">
            <span>Aircraft: {flight.outbound?.aircraft || 'Boeing 787-9'}</span>
            <span>Class: {flight.cabinClass}</span>
          </div>
        </div>

        {/* Return Leg */}
        <div className="bg-slate-900/90 rounded-2xl p-4 border border-slate-800">
          <div className="flex items-center justify-between mb-3 text-xs text-slate-400 font-medium">
            <span className="flex items-center gap-1.5 text-purple-300">
              <Plane className="w-3.5 h-3.5 -rotate-135" /> Return Flight
            </span>
            <span className="px-2 py-0.5 rounded-full bg-slate-800 text-slate-300">
              {flight.return?.stops || 'Direct'}
            </span>
          </div>

          <div className="flex items-center justify-between my-2">
            <div>
              <div className="text-lg font-bold text-white">{flight.return?.departureTime || '11:20 AM'}</div>
              <div className="text-xs text-slate-400 truncate max-w-[130px]">{flight.return?.departureAirport}</div>
            </div>
            <div className="flex flex-col items-center px-3">
              <div className="text-[11px] font-mono text-slate-500 mb-1">{flight.return?.duration || '8h 15m'}</div>
              <div className="w-24 h-0.5 bg-purple-500/40 relative">
                <div className="w-2 h-2 rounded-full bg-purple-400 absolute right-0 -top-[3px]"></div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-lg font-bold text-white">{flight.return?.arrivalTime || '07:35 PM'}</div>
              <div className="text-xs text-slate-400 truncate max-w-[130px]">{flight.return?.arrivalAirport}</div>
            </div>
          </div>

          <div className="text-[11px] text-slate-500 mt-3 pt-2 border-t border-slate-800 flex justify-between">
            <span>Aircraft: {flight.return?.aircraft || 'Airbus A350-900'}</span>
            <span>Class: {flight.cabinClass}</span>
          </div>
        </div>

      </div>

      {/* Baggage & Amenities Badges */}
      <div className="space-y-3 bg-slate-950/60 rounded-2xl p-4 border border-slate-800/80 mb-4">
        <div className="flex items-center space-x-2 text-xs text-slate-300">
          <Luggage className="w-4 h-4 text-indigo-400 shrink-0" />
          <span className="font-semibold text-white">Baggage Allowance:</span>
          <span>{flight.baggageAllowance}</span>
        </div>

        {flight.amenities && (
          <div className="flex flex-wrap gap-2 pt-1">
            {flight.amenities.map((amenity, idx) => (
              <span key={idx} className="text-[11px] px-2.5 py-1 rounded-lg bg-slate-900 text-slate-300 border border-slate-800 flex items-center space-x-1">
                <Check className="w-3 h-3 text-emerald-400" />
                <span>{amenity}</span>
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Alternative Flight Backup (if available) */}
      {alternative && (
        <div className="bg-slate-900/60 rounded-xl p-3 border border-slate-800 text-xs flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center space-x-2 text-slate-400">
            <span className="font-medium text-slate-300">Alternative Evaluated:</span>
            <span>{alternative.airline} ({alternative.cabinClass})</span>
            <span>•</span>
            <span>{alternative.stops}</span>
          </div>
          <div className="font-mono text-emerald-400 font-medium">
            {formatCurrency(alternative.totalPrice)} {alternative.savingPotential > 0 && `(Saves ${formatCurrency(alternative.savingPotential)})`}
          </div>
        </div>
      )}
    </div>
  );
}
