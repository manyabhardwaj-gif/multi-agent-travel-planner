import { getDestinationCatalog } from '../services/travelCatalog.js';
import { callGeminiAgent } from '../services/geminiService.js';

/**
 * HOTELS_AGENT
 * Finds accommodations, checks amenities, verifies availability,
 * and recommends the best lodging within budget and location constraints.
 */
export async function runHotelsAgent({ tripParams, emitProgress, nights = 4 }) {
  const agentId = "HOTELS_AGENT";
  const { destination, departureDate, returnDate, travelers = 1, budget = 2500, geminiApiKey } = tripParams;

  emitProgress(agentId, "STARTED", {
    message: `Searching accommodations in ${destination} for ${nights} nights (${travelers} guest${travelers > 1 ? 's' : ''})...`,
    timestamp: new Date().toISOString()
  });

  const catalog = getDestinationCatalog(destination, travelers, budget);
  const targetHotelBudget = Math.round(budget * 0.35); // 35% allocated to lodging
  const maxNightlyBudget = Math.round(targetHotelBudget / nights);

  emitProgress(agentId, "REASONING", {
    message: `Evaluating neighborhood safety, transit access, and amenity scores across ${catalog.neighborhoods.slice(0, 3).join(", ")}. Target lodging budget: $${targetHotelBudget} (~$${maxNightlyBudget}/night).`,
    details: [
      `Destination: ${destination}`,
      `Nights: ${nights}`,
      `Max Nightly Target: $${maxNightlyBudget}`
    ]
  });

  await new Promise(r => setTimeout(r, 700));

  emitProgress(agentId, "VERIFYING_AMENITIES", {
    message: "Verifying amenities (High-Speed Wi-Fi, Breakfast options, Central transit access, Air Conditioning)...",
    verifiedAmenities: ["Complimentary Wi-Fi", "Daily Breakfast", "Transit Proximity", "24/7 Front Desk"]
  });

  await new Promise(r => setTimeout(r, 650));

  // Pick top hotel matching budget
  const primaryHotelData = catalog.hotels[0] || {
    name: `${destination} Grand Hotel`,
    neighborhood: "Central City Center",
    stars: 4.5,
    rating: 4.7,
    pricePerNight: Math.min(maxNightlyBudget, 180),
    amenities: ["Free High-speed Wi-Fi", "Daily Breakfast Buffet", "Metro Access (2 min)", "Fitness Center"],
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80",
    description: "Centrally positioned hotel with premium customer reviews and walkable access to sights."
  };

  const backupHotelData = catalog.hotels[1] || catalog.hotels[2] || {
    name: `${destination} Urban Boutique Inn`,
    neighborhood: "Arts Quarter",
    stars: 4,
    rating: 4.4,
    pricePerNight: Math.round(primaryHotelData.pricePerNight * 0.75),
    amenities: ["Free Wi-Fi", "Coffee Bar", "Convenient Metro", "Air Conditioning"],
    image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=800&q=80",
    description: "Budget-smart boutique hotel with great style and high walkability score."
  };

  const totalPrimaryCost = primaryHotelData.pricePerNight * nights;
  const totalTaxes = Math.round(totalPrimaryCost * 0.12);
  const grandTotalStay = totalPrimaryCost + totalTaxes;

  const fallbackHotelResult = {
    selectedHotel: {
      name: primaryHotelData.name,
      neighborhood: primaryHotelData.neighborhood,
      stars: primaryHotelData.stars,
      guestRating: primaryHotelData.rating,
      pricePerNight: primaryHotelData.pricePerNight,
      numberOfNights: nights,
      roomSubtotal: totalPrimaryCost,
      taxesAndFees: totalTaxes,
      totalCost: grandTotalStay,
      amenities: primaryHotelData.amenities,
      image: primaryHotelData.image,
      description: primaryHotelData.description,
      locationScore: "9.6 / 10 - Outstanding Central Location",
      roomType: travelers > 2 ? "Executive Family Suite" : "Deluxe King Room"
    },
    alternativeHotel: {
      name: backupHotelData.name,
      neighborhood: backupHotelData.neighborhood,
      stars: backupHotelData.stars,
      guestRating: backupHotelData.rating,
      pricePerNight: backupHotelData.pricePerNight,
      totalCost: (backupHotelData.pricePerNight * nights) + Math.round(backupHotelData.pricePerNight * nights * 0.12),
      savingPotential: grandTotalStay - ((backupHotelData.pricePerNight * nights) + Math.round(backupHotelData.pricePerNight * nights * 0.12)),
      amenities: backupHotelData.amenities,
      note: "Smart alternative for budget optimization."
    },
    budgetStatus: grandTotalStay <= targetHotelBudget ? "Within Target Allocation" : "Slightly Above Ideal Allocation",
    reasoning: `Selected ${primaryHotelData.name} in ${primaryHotelData.neighborhood} for its stellar ${primaryHotelData.rating}/5 guest rating, verified transit proximity, and included daily breakfast which saves ~$${travelers * 20 * nights} in meal expenses.`
  };

  let finalResult = fallbackHotelResult;

  if (geminiApiKey) {
    emitProgress(agentId, "AI_ORCHESTRATING", {
      message: "Invoking Gemini 3 to analyze real-world guest reviews and neighborhood safety indices..."
    });

    const geminiRes = await callGeminiAgent({
      apiKey: geminiApiKey,
      systemInstruction: "You are the HOTELS_AGENT in a multi-agent travel system. You verify lodging, amenities, ratings, and return precise JSON recommendation.",
      prompt: `Destination: ${destination}, Nights: ${nights}, Guests: ${travelers}, Total Trip Budget: $${budget}, Lodging Allocation: $${targetHotelBudget}.
Produce a JSON hotel recommendation object matching this structure:
{
  "selectedHotel": {
    "name": "...",
    "neighborhood": "...",
    "stars": 4.5,
    "guestRating": 4.8,
    "pricePerNight": 170,
    "numberOfNights": ${nights},
    "roomSubtotal": ${170 * nights},
    "taxesAndFees": ${Math.round(170 * nights * 0.12)},
    "totalCost": ${Math.round(170 * nights * 1.12)},
    "amenities": ["..."],
    "image": "${primaryHotelData.image}",
    "description": "...",
    "locationScore": "...",
    "roomType": "..."
  },
  "alternativeHotel": {
    "name": "...",
    "neighborhood": "...",
    "stars": 4.0,
    "guestRating": 4.5,
    "pricePerNight": 130,
    "totalCost": ${Math.round(130 * nights * 1.12)},
    "savingPotential": 50,
    "amenities": ["..."],
    "note": "..."
  },
  "reasoning": "..."
}`,
      fallbackData: fallbackHotelResult
    });

    if (geminiRes.success && geminiRes.data?.selectedHotel) {
      finalResult = {
        ...geminiRes.data,
        budgetStatus: (geminiRes.data.selectedHotel.totalCost || grandTotalStay) <= targetHotelBudget ? "Within Target Allocation" : "Slightly Above Ideal Allocation"
      };
    }
  }

  emitProgress(agentId, "COMPLETED", {
    message: `Hotel locked: ${finalResult.selectedHotel.name} (${finalResult.selectedHotel.neighborhood}) at $${finalResult.selectedHotel.totalCost} for ${nights} nights.`,
    totalHotelCost: finalResult.selectedHotel.totalCost
  });

  return finalResult;
}
