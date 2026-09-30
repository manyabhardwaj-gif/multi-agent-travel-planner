export const formatCurrency = (amount, currency = 'USD') => {
  const num = Number(amount) || 0;
  try {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency,
      maximumFractionDigits: 0
    }).format(num);
  } catch {
    return `$${num.toLocaleString()}`;
  }
};

export const formatDate = (dateString) => {
  if (!dateString) return '';
  try {
    const d = new Date(dateString);
    return d.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  } catch {
    return dateString;
  }
};

export const getInterestEmoji = (tag) => {
  const map = {
    beach: '🏖️',
    culture: '🏛️',
    adventure: '🧗',
    food: '🍜',
    nightlife: '🍸',
    relaxation: '🧘',
    nature: '🌲',
    shopping: '🛍️'
  };
  return map[tag.toLowerCase()] || '✨';
};

export const getAgentMetadata = (agentId) => {
  switch (agentId) {
    case 'FLIGHTS_AGENT':
      return {
        name: 'Flights Agent',
        role: 'Aviation & Route Intelligence',
        icon: 'Plane',
        color: 'indigo',
        gradient: 'from-blue-600 to-indigo-600',
        borderColor: 'border-indigo-500/40',
        bgLight: 'bg-indigo-500/10',
        badgeBg: 'bg-indigo-500/20 text-indigo-300'
      };
    case 'HOTELS_AGENT':
      return {
        name: 'Hotels Agent',
        role: 'Hospitality & Neighborhood Audit',
        icon: 'Building2',
        color: 'emerald',
        gradient: 'from-emerald-600 to-teal-600',
        borderColor: 'border-emerald-500/40',
        bgLight: 'bg-emerald-500/10',
        badgeBg: 'bg-emerald-500/20 text-emerald-300'
      };
    case 'ACTIVITIES_AGENT':
      return {
        name: 'Activities Agent',
        role: 'Experience & Culture Curation',
        icon: 'Compass',
        color: 'amber',
        gradient: 'from-amber-600 to-orange-600',
        borderColor: 'border-amber-500/40',
        bgLight: 'bg-amber-500/10',
        badgeBg: 'bg-amber-500/20 text-amber-300'
      };
    case 'ITINERARY_COORDINATOR':
    default:
      return {
        name: 'Itinerary Coordinator',
        role: 'Master Orchestration & Budget Audit',
        icon: 'Cpu',
        color: 'purple',
        gradient: 'from-purple-600 to-pink-600',
        borderColor: 'border-purple-500/40',
        bgLight: 'bg-purple-500/10',
        badgeBg: 'bg-purple-500/20 text-purple-300'
      };
  }
};
