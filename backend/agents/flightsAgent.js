import { getDestinationCatalog } from '../services/travelCatalog.js';
import { callGeminiAgent } from '../services/geminiService.js';

/**
 * FLIGHTS_AGENT
 * Searches flights, compares airlines, evaluates baggage & schedules,
 * and recommends the best options matching dates and budget constraints.
 */
export async function runFlightsAgent({ tripParams, emitProgress }) {
  const agentId = "FLIGHTS_AGENT";
  const { origin = "New York (JFK)", destination, departureDate, returnDate, travelers = 1, budget = 2500, geminiApiKey } = tripParams;

  emitProgress(agentId, "STARTED", {
    message: `Searching flights from ${origin} to ${destination}...`,
    timestamp: new Date().toISOString()
  });

  const catalog = getDestinationCatalog(destination, travelers, budget);
  const targetFlightBudget = Math.round(budget * 0.35); // 35% allocated to flights

  emitProgress(agentId, "REASONING", {
    message: `Checking routes and airline carriers serving ${destination}. Target flight budget: $${targetFlightBudget} ($${Math.round(targetFlightBudget / travelers)}/traveler).`,
    details: [
      `Origin: ${origin}`,
      `Destination: ${destination}`,
      `Target Dates: ${departureDate} to ${returnDate}`,
      `Passenger count: ${travelers}`
    ]
  });

  // Small asynchronous pause to show agent stream thinking
  await new Promise(r => setTimeout(r, 600));

  emitProgress(agentId, "COMPARING_AIRLINES", {
    message: `Comparing flight schedules across ${catalog.airlines.slice(0, 3).join(", ")}...`,
    checkedAirlines: catalog.airlines
  });

  await new Promise(r => setTimeout(r, 700));

  // Determine base flight price based on catalog and budget
  const perPersonPrice = Math.min(catalog.avgFlightPrices.economy, Math.round(targetFlightBudget / travelers));
  const totalPrice = perPersonPrice * travelers;
  const isDirect = Math.random() > 0.35;

  const primaryAirline = catalog.airlines[0] || "SkyLine International";
  const altAirline = catalog.airlines[1] || "Global Express Airways";

  const fallbackFlightResult = {
    selectedFlight: {
      airline: primaryAirline,
      flightNumber: `${primaryAirline.substring(0, 2).toUpperCase()}-${Math.floor(100 + Math.random() * 899)}`,
      outbound: {
        departureAirport: origin,
        arrivalAirport: catalog.airports[0] || `${destination} Main Airport`,
        departureTime: "08:30 AM",
        arrivalTime: "04:45 PM",
        duration: "8h 15m",
        stops: isDirect ? "Direct Flight" : "1 Short Stop (1h 15m)",
        aircraft: "Boeing 787-9 Dreamliner"
      },
      return: {
        departureAirport: catalog.airports[0] || `${destination} Main Airport`,
        arrivalAirport: origin,
        departureTime: "11:20 AM",
        arrivalTime: "07:35 PM",
        duration: "8h 15m",
        stops: isDirect ? "Direct Flight" : "1 Short Stop (1h 20m)",
        aircraft: "Airbus A350-900"
      },
      cabinClass: "Economy Standard",
      baggageAllowance: "1 Personal Item + 1 Carry-on (10kg) + 1 Checked Bag (23kg) included per person",
      pricePerTraveler: perPersonPrice,
      totalPrice: totalPrice,
      amenities: ["Seatback On-demand Entertainment", "Complimentary In-flight Meals & Drinks", "USB-C In-seat Power", "Wi-Fi Available"],
      reliabilityScore: "96% On-time Performance"
    },
    alternativeFlight: {
      airline: altAirline,
      flightNumber: `${altAirline.substring(0, 2).toUpperCase()}-${Math.floor(100 + Math.random() * 899)}`,
      cabinClass: "Economy Saver",
      pricePerTraveler: Math.round(perPersonPrice * 0.85),
      totalPrice: Math.round(totalPrice * 0.85),
      stops: "1 Stop (2h 10m layover)",
      savingPotential: Math.round(totalPrice * 0.15),
      note: "Budget backup option if rebalancing is required."
    },
    budgetStatus: totalPrice <= targetFlightBudget ? "Within Target Allocation" : "Slightly Above Ideal Allocation",
    reasoning: `Selected ${primaryAirline} offering the best balance of travel duration (${isDirect ? 'Direct' : 'Minimal layover'}), included 23kg checked baggage for all ${travelers} traveler(s), and solid reliability.`
  };

  // If Gemini API Key provided, enhance flight selection analysis
  let finalResult = fallbackFlightResult;
  if (geminiApiKey) {
    emitProgress(agentId, "AI_ORCHESTRATING", {
      message: "Invoking Gemini 3 model to evaluate route efficiency and airline safety indices..."
    });

    const geminiRes = await callGeminiAgent({
      apiKey: geminiApiKey,
      systemInstruction: "You are the FLIGHTS_AGENT in a multi-agent travel planning system. You evaluate airlines, baggage policies, schedules, and return precise JSON recommendation.",
      prompt: `Origin: ${origin}, Destination: ${destination}, Dates: ${departureDate} to ${returnDate}, Travelers: ${travelers}, Total Trip Budget: $${budget}, Flight Allocation Budget: $${targetFlightBudget}.
Produce a JSON flight recommendation object matching this structure:
{
  "selectedFlight": {
    "airline": "...",
    "flightNumber": "...",
    "outbound": { "departureAirport": "...", "arrivalAirport": "...", "departureTime": "...", "arrivalTime": "...", "duration": "...", "stops": "...", "aircraft": "..." },
    "return": { "departureAirport": "...", "arrivalAirport": "...", "departureTime": "...", "arrivalTime": "...", "duration": "...", "stops": "...", "aircraft": "..." },
    "cabinClass": "Economy Standard",
    "baggageAllowance": "...",
    "pricePerTraveler": 500,
    "totalPrice": 500,
    "amenities": ["..."],
    "reliabilityScore": "..."
  },
  "alternativeFlight": {
    "airline": "...",
    "cabinClass": "Economy Saver",
    "pricePerTraveler": 420,
    "totalPrice": 420,
    "savingPotential": 80,
    "note": "..."
  },
  "reasoning": "..."
}`,
      fallbackData: fallbackFlightResult
    });

    if (geminiRes.success && geminiRes.data?.selectedFlight) {
      finalResult = {
        ...geminiRes.data,
        budgetStatus: (geminiRes.data.selectedFlight.totalPrice || totalPrice) <= targetFlightBudget ? "Within Target Allocation" : "Slightly Above Ideal Allocation"
      };
    }
  }

  emitProgress(agentId, "COMPLETED", {
    message: `Flight locked: ${finalResult.selectedFlight.airline} (${finalResult.selectedFlight.flightNumber}) at $${finalResult.selectedFlight.totalPrice} total ($${finalResult.selectedFlight.pricePerTraveler}/traveler).`,
    totalFlightCost: finalResult.selectedFlight.totalPrice
  });

  return finalResult;
}
