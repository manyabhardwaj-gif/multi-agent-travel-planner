import React from 'react';
import { Building2, Star, MapPin, Wifi, Coffee, Sparkles, Check, Info } from 'lucide-react';
import { formatCurrency } from '../utils/formatters';

export default function HotelCard({ hotel, alternative }) {
  if (!hotel) return null;

  return (
    <div className="glass-panel-elevated rounded-3xl p-6 border border-emerald-500/20 shadow-xl relative overflow-hidden">
      
      {/* Top Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-6 pb-4 border-b border-slate-800">
        <div className="flex items-center space-x-3">
          <div className="p-3 rounded-2xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
            <Building2 className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                HOTELS_AGENT Recommendation
              </span>
              {hotel.rebalanced && (
                <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                  Value Optimized
                </span>
              )}
            </div>
            <h3 className="text-lg font-bold text-white mt-1 font-display">
              {hotel.name}
            </h3>
          </div>
        </div>

        {/* Total Stay Price */}
        <div className="text-right">
          <div className="text-2xl font-bold text-emerald-400 font-mono">
            {formatCurrency(hotel.totalCost)}
          </div>
          <div className="text-xs text-slate-400">
            {formatCurrency(hotel.pricePerNight)}/night • {hotel.numberOfNights} Nights (Taxes included)
          </div>
        </div>
      </div>

      {/* Main Content: Photo + Details */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-6">
        
        {/* Hotel Photo */}
        <div className="lg:col-span-5 relative rounded-2xl overflow-hidden aspect-video lg:aspect-auto h-56 lg:h-full border border-slate-800 shadow-md">
          <img
            src={hotel.image || "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80"}
            alt={hotel.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-80"></div>
          
          {/* Rating overlay */}
          <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs">
            <span className="px-2.5 py-1 rounded-xl bg-slate-900/90 backdrop-blur-md text-amber-300 font-bold flex items-center space-x-1 border border-slate-700">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              <span>{hotel.guestRating || 4.7} / 5</span>
              <span className="text-slate-400 font-normal">({hotel.stars}★)</span>
            </span>

            <span className="px-2.5 py-1 rounded-xl bg-slate-900/90 backdrop-blur-md text-slate-300 border border-slate-700 font-medium">
              {hotel.roomType || 'Deluxe King Room'}
            </span>
          </div>
        </div>

        {/* Details & Amenities */}
        <div className="lg:col-span-7 flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-center space-x-1.5 text-xs text-slate-400 mb-2">
              <MapPin className="w-4 h-4 text-emerald-400 shrink-0" />
              <span className="font-semibold text-slate-200">{hotel.neighborhood}</span>
              <span>•</span>
              <span className="text-emerald-400 font-medium">{hotel.locationScore || 'Prime Transit Access'}</span>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed mb-4">
              {hotel.description}
            </p>
          </div>

          {/* Verified Amenities */}
          <div>
            <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 block mb-2">
              Verified Included Amenities:
            </span>
            <div className="grid grid-cols-2 gap-2">
              {hotel.amenities?.map((amenity, idx) => (
                <div key={idx} className="text-xs text-slate-300 flex items-center space-x-2 bg-slate-900/70 px-3 py-2 rounded-xl border border-slate-800">
                  <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span className="truncate">{amenity}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Financial Breakdown */}
          <div className="bg-slate-950/60 rounded-xl p-3 border border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
            <span>Room Subtotal: <strong className="text-white font-mono">{formatCurrency(hotel.roomSubtotal || hotel.pricePerNight * hotel.numberOfNights)}</strong></span>
            <span>Estimated Taxes & Fees (12%): <strong className="text-white font-mono">{formatCurrency(hotel.taxesAndFees || Math.round(hotel.totalCost * 0.12))}</strong></span>
          </div>
        </div>
      </div>

      {/* Alternative Hotel Comparison (if available) */}
      {alternative && (
        <div className="bg-slate-900/60 rounded-xl p-3 border border-slate-800 text-xs flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center space-x-2 text-slate-400">
            <span className="font-medium text-slate-300">Alternative Evaluated:</span>
            <span>{alternative.name} ({alternative.neighborhood})</span>
            <span>•</span>
            <span className="text-amber-400 font-medium">★ {alternative.guestRating}</span>
          </div>
          <div className="font-mono text-emerald-400 font-medium">
            {formatCurrency(alternative.totalCost)} {alternative.savingPotential > 0 && `(Potential Savings: ${formatCurrency(alternative.savingPotential)})`}
          </div>
        </div>
      )}
    </div>
  );
}
