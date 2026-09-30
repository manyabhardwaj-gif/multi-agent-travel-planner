import React, { useEffect, useState } from 'react';
import { 
  Download, 
  Printer, 
  Share2, 
  RefreshCw, 
  Calendar, 
  Users, 
  MapPin, 
  Sparkles, 
  Check,
  FileText
} from 'lucide-react';
import confetti from 'canvas-confetti';
import FlightCard from './FlightCard';
import HotelCard from './HotelCard';
import DaySchedule from './DaySchedule';
import CostBreakdown from './CostBreakdown';
import BudgetAlertBanner from './BudgetAlertBanner';
import { generateItineraryPDF } from '../utils/pdfGenerator';
import { formatDate, formatCurrency, getInterestEmoji } from '../utils/formatters';

export default function ItineraryView({ itinerary, onReset }) {
  const [isExportingPDF, setIsExportingPDF] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  useEffect(() => {
    // Trigger celebratory confetti on itinerary creation
    try {
      confetti({
        particleCount: 70,
        spread: 60,
        origin: { y: 0.6 }
      });
    } catch {
      // ignore
    }
  }, []);

  const handleDownloadPDF = () => {
    setIsExportingPDF(true);
    try {
      generateItineraryPDF(itinerary);
    } catch (err) {
      console.error('Failed to generate PDF:', err);
    } finally {
      setTimeout(() => setIsExportingPDF(false), 800);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const handleCopyShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  const { tripSummary, flights, hotel, dailyPlans, costBreakdown, coordinatorVerdict } = itinerary;

  return (
    <div className="space-y-8 animate-fade-in">
      
      {/* Action / Toolbar Header */}
      <div className="glass-panel-elevated rounded-3xl p-6 border border-slate-800 flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2 text-xs font-semibold uppercase tracking-wider text-emerald-400 mb-1">
            <Sparkles className="w-4 h-4" />
            <span>Autonomous Multi-Agent Synthesis Completed</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-display">
            Your {tripSummary.destination} Expedition Dossier
          </h2>
          <div className="flex flex-wrap items-center gap-3 text-xs text-slate-400 mt-2">
            <span className="flex items-center gap-1 text-slate-300">
              <Calendar className="w-3.5 h-3.5 text-indigo-400" />
              {formatDate(tripSummary.departureDate)} - {formatDate(tripSummary.returnDate)} ({tripSummary.numberOfDays} Days)
            </span>
            <span>•</span>
            <span className="flex items-center gap-1 text-slate-300">
              <Users className="w-3.5 h-3.5 text-amber-400" />
              {tripSummary.travelers} Traveler{tripSummary.travelers > 1 ? 's' : ''}
            </span>
            <span>•</span>
            <div className="flex items-center gap-1">
              {tripSummary.interests?.map(i => (
                <span key={i} title={i} className="text-sm">{getInterestEmoji(i)}</span>
              ))}
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-2.5">
          <button
            type="button"
            onClick={onReset}
            className="px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 text-xs font-medium flex items-center space-x-1.5 transition"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Modify Preferences</span>
          </button>

          <button
            type="button"
            onClick={handleCopyShare}
            className="px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 text-xs font-medium flex items-center space-x-1.5 transition"
          >
            {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Share2 className="w-3.5 h-3.5" />}
            <span>{copiedLink ? 'Link Copied' : 'Share'}</span>
          </button>

          <button
            type="button"
            onClick={handlePrint}
            className="px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 text-xs font-medium flex items-center space-x-1.5 transition hidden sm:flex"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Print</span>
          </button>

          <button
            type="button"
            onClick={handleDownloadPDF}
            disabled={isExportingPDF}
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-semibold text-xs flex items-center space-x-2 shadow-lg shadow-indigo-600/30 transition transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer disabled:opacity-50"
          >
            {isExportingPDF ? (
              <>
                <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                <span>Exporting PDF...</span>
              </>
            ) : (
              <>
                <Download className="w-3.5 h-3.5" />
                <span>Download PDF Itinerary</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Graceful Budget Overrun Banner (if applicable) */}
      <BudgetAlertBanner 
        tripSummary={tripSummary}
        costBreakdown={costBreakdown}
      />

      {/* Total Financial Breakdown */}
      <CostBreakdown 
        costBreakdown={costBreakdown}
        tripSummary={tripSummary}
        coordinatorVerdict={coordinatorVerdict}
      />

      {/* Flight Recommendation (FLIGHTS_AGENT) */}
      <FlightCard 
        flight={flights}
        alternative={itinerary.flightAlternatives}
        travelers={tripSummary.travelers}
      />

      {/* Hotel Recommendation (HOTELS_AGENT) */}
      <HotelCard 
        hotel={hotel}
        alternative={itinerary.hotelAlternatives}
      />

      {/* Day-by-Day Activities & Transit Time (ACTIVITIES_AGENT + COORDINATOR) */}
      <DaySchedule 
        dailyPlans={dailyPlans}
      />

    </div>
  );
}
