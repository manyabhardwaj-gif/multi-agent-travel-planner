import React, { useState } from 'react';
import { 
  MapPin, 
  Calendar, 
  DollarSign, 
  Users, 
  Sparkles, 
  Compass, 
  ArrowRight,
  PlaneTakeoff
} from 'lucide-react';
import { getInterestEmoji } from '../utils/formatters';

const PRESET_DESTINATIONS = [
  { name: 'Tokyo', country: 'Japan', icon: '🗼' },
  { name: 'Paris', country: 'France', icon: '🥐' },
  { name: 'Bali', country: 'Indonesia', icon: '🌴' },
  { name: 'New York', country: 'USA', icon: '🗽' },
  { name: 'Rome', country: 'Italy', icon: '🏛️' }
];

const AVAILABLE_INTERESTS = [
  { id: 'culture', label: 'Culture & Heritage' },
  { id: 'food', label: 'Gourmet & Dining' },
  { id: 'adventure', label: 'Outdoor Adventure' },
  { id: 'beach', label: 'Beach & Coastal' },
  { id: 'relaxation', label: 'Wellness & Spa' },
  { id: 'nightlife', label: 'Nightlife & Bars' },
  { id: 'nature', label: 'Nature & Wildlife' },
  { id: 'shopping', label: 'Shopping & Markets' }
];

export default function TripForm({ onSubmit, isPlanning }) {
  const [destination, setDestination] = useState('Tokyo');
  const [origin, setOrigin] = useState('San Francisco (SFO)');
  
  // Default dates: next month 5-day window
  const today = new Date();
  const nextMonth = new Date(today.getFullYear(), today.getMonth() + 1, 10);
  const nextMonthEnd = new Date(today.getFullYear(), today.getMonth() + 1, 15);
  
  const formatDateForInput = (d) => d.toISOString().split('T')[0];

  const [departureDate, setDepartureDate] = useState(formatDateForInput(nextMonth));
  const [returnDate, setReturnDate] = useState(formatDateForInput(nextMonthEnd));
  const [budget, setBudget] = useState(3000);
  const [currency, setCurrency] = useState('USD');
  const [travelers, setTravelers] = useState(2);
  const [interests, setInterests] = useState(['culture', 'food', 'adventure']);

  // Calculate duration
  const daysDiff = Math.max(1, Math.ceil((new Date(returnDate) - new Date(departureDate)) / (1000 * 60 * 60 * 24)));

  const toggleInterest = (id) => {
    if (interests.includes(id)) {
      if (interests.length > 1) {
        setInterests(interests.filter(i => i !== id));
      }
    } else {
      setInterests([...interests, id]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!destination.trim()) return;

    onSubmit({
      destination: destination.trim(),
      origin: origin.trim() || 'Nearest Hub Airport',
      departureDate,
      returnDate,
      days: daysDiff,
      budget: Number(budget) || 2500,
      currency,
      travelers: Number(travelers) || 1,
      interests
    });
  };

  return (
    <div className="glass-panel-elevated rounded-3xl p-6 sm:p-8 border border-slate-800 text-slate-100 shadow-2xl relative overflow-hidden">
      {/* Decorative ambient gradient */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 rounded-full bg-indigo-600/15 blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 rounded-full bg-purple-600/15 blur-3xl pointer-events-none"></div>

      <div className="mb-6">
        <div className="flex items-center space-x-2 text-xs font-semibold uppercase tracking-wider text-indigo-400 mb-1">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Intelligent Travel Configuration</span>
        </div>
        <h2 className="text-2xl font-bold text-white font-display">Where would you like to travel?</h2>
        <p className="text-sm text-slate-400">
          Provide your preferences and 4 specialized AI agents will collaborate simultaneously to synthesize your custom itinerary.
        </p>
      </div>

      {/* Preset Destinations Bar */}
      <div className="mb-6">
        <label className="block text-xs font-medium text-slate-400 mb-2">Popular Curated Hubs</label>
        <div className="flex flex-wrap gap-2">
          {PRESET_DESTINATIONS.map((preset) => (
            <button
              key={preset.name}
              type="button"
              onClick={() => setDestination(preset.name)}
              className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all flex items-center space-x-1.5 border ${
                destination.toLowerCase() === preset.name.toLowerCase()
                  ? 'bg-indigo-600 text-white border-indigo-500 shadow-md shadow-indigo-600/30'
                  : 'bg-slate-900/80 text-slate-300 border-slate-800 hover:border-slate-700 hover:text-white'
              }`}
            >
              <span>{preset.icon}</span>
              <span>{preset.name}</span>
            </button>
          ))}
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        
        {/* Row 1: Destination & Departure Hub */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-2 flex items-center space-x-1.5">
              <MapPin className="w-4 h-4 text-indigo-400" />
              <span>Target Destination</span>
            </label>
            <input
              type="text"
              required
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              placeholder="e.g. Tokyo, Paris, Bali, Rome, London..."
              className="w-full px-4 py-3 bg-slate-900/90 border border-slate-700/80 rounded-2xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-2 flex items-center space-x-1.5">
              <PlaneTakeoff className="w-4 h-4 text-blue-400" />
              <span>Departure City / Airport</span>
            </label>
            <input
              type="text"
              required
              value={origin}
              onChange={(e) => setOrigin(e.target.value)}
              placeholder="e.g. New York (JFK), London (LHR)..."
              className="w-full px-4 py-3 bg-slate-900/90 border border-slate-700/80 rounded-2xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
            />
          </div>
        </div>

        {/* Row 2: Dates with Duration Calculator */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-2 flex items-center justify-between">
              <span className="flex items-center space-x-1.5">
                <Calendar className="w-4 h-4 text-purple-400" />
                <span>Departure Date</span>
              </span>
            </label>
            <input
              type="date"
              required
              value={departureDate}
              onChange={(e) => setDepartureDate(e.target.value)}
              className="w-full px-4 py-3 bg-slate-900/90 border border-slate-700/80 rounded-2xl text-sm text-white focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all [color-scheme:dark]"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-2 flex items-center justify-between">
              <span className="flex items-center space-x-1.5">
                <Calendar className="w-4 h-4 text-purple-400" />
                <span>Return Date</span>
              </span>
              <span className="text-[11px] font-medium px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                {daysDiff} Days / {Math.max(1, daysDiff - 1)} Nights
              </span>
            </label>
            <input
              type="date"
              required
              min={departureDate}
              value={returnDate}
              onChange={(e) => setReturnDate(e.target.value)}
              className="w-full px-4 py-3 bg-slate-900/90 border border-slate-700/80 rounded-2xl text-sm text-white focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all [color-scheme:dark]"
            />
          </div>
        </div>

        {/* Row 3: Budget & Number of Travelers */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-2 flex items-center justify-between">
              <span className="flex items-center space-x-1.5">
                <DollarSign className="w-4 h-4 text-emerald-400" />
                <span>Total Target Budget</span>
              </span>
              <div className="flex space-x-1 text-xs">
                {['USD', 'EUR', 'GBP'].map((curr) => (
                  <button
                    key={curr}
                    type="button"
                    onClick={() => setCurrency(curr)}
                    className={`px-1.5 py-0.5 rounded text-[10px] font-mono ${
                      currency === curr ? 'bg-emerald-500/20 text-emerald-300 font-bold' : 'text-slate-500 hover:text-slate-300'
                    }`}
                  >
                    {curr}
                  </button>
                ))}
              </div>
            </label>
            <div className="relative">
              <span className="absolute left-4 top-3.5 text-slate-500 font-bold">$</span>
              <input
                type="number"
                min="500"
                step="100"
                required
                value={budget}
                onChange={(e) => setBudget(e.target.value)}
                className="w-full pl-8 pr-4 py-3 bg-slate-900/90 border border-slate-700/80 rounded-2xl text-sm text-white focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all"
              />
            </div>
            {/* Quick budget suggestions */}
            <div className="flex gap-2 mt-2">
              {[1800, 3000, 5000, 7500].map((b) => (
                <button
                  key={b}
                  type="button"
                  onClick={() => setBudget(b)}
                  className="text-[11px] px-2 py-0.5 rounded-lg bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 transition"
                >
                  ${b.toLocaleString()}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-2 flex items-center space-x-1.5">
              <Users className="w-4 h-4 text-amber-400" />
              <span>Travelers Count</span>
            </label>
            <div className="flex items-center space-x-3 bg-slate-900/90 border border-slate-700/80 rounded-2xl p-1.5">
              <button
                type="button"
                onClick={() => setTravelers(Math.max(1, travelers - 1))}
                className="w-10 h-10 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold flex items-center justify-center transition active:scale-95"
              >
                -
              </button>
              <div className="flex-1 text-center font-bold text-base text-white">
                {travelers} {travelers === 1 ? 'Traveler (Solo)' : 'Travelers'}
              </div>
              <button
                type="button"
                onClick={() => setTravelers(Math.min(10, travelers + 1))}
                className="w-10 h-10 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold flex items-center justify-center transition active:scale-95"
              >
                +
              </button>
            </div>
            <p className="text-[11px] text-slate-500 mt-2">
              Flight seats and hotel room configuration tailored for {travelers} person(s).
            </p>
          </div>
        </div>

        {/* Row 4: Travel Interests */}
        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-2.5 flex items-center space-x-1.5">
            <Compass className="w-4 h-4 text-indigo-400" />
            <span>Travel Interests & Style (Select all that apply)</span>
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            {AVAILABLE_INTERESTS.map((interest) => {
              const selected = interests.includes(interest.id);
              return (
                <button
                  key={interest.id}
                  type="button"
                  onClick={() => toggleInterest(interest.id)}
                  className={`px-3 py-2.5 rounded-xl text-xs font-medium transition-all flex items-center space-x-2 border text-left ${
                    selected
                      ? 'bg-indigo-600/30 text-indigo-200 border-indigo-500/80 shadow-md shadow-indigo-500/10'
                      : 'bg-slate-900/70 text-slate-400 border-slate-800 hover:border-slate-700 hover:text-slate-200'
                  }`}
                >
                  <span className="text-base">{getInterestEmoji(interest.id)}</span>
                  <span className="truncate">{interest.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Submit Orchestration Button */}
        <div className="pt-2">
          <button
            type="submit"
            disabled={isPlanning}
            className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-indigo-600 via-indigo-500 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-semibold text-base shadow-xl shadow-indigo-600/25 transition-all transform hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center space-x-2.5 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
          >
            {isPlanning ? (
              <>
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                <span>Multi-Agents Collaborating...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-5 h-5 text-indigo-200" />
                <span>Dispatch Multi-Agents to Plan Itinerary</span>
                <ArrowRight className="w-5 h-5 text-indigo-200" />
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
