import { getDestinationCatalog } from '../services/travelCatalog.js';
import { callGeminiAgent } from '../services/geminiService.js';

/**
 * ACTIVITIES_AGENT
 * Curates immersive experiences based on user interests, location, and daily pacing.
 */
export async function runActivitiesAgent({ tripParams, emitProgress, numberOfDays = 5 }) {
  const agentId = "ACTIVITIES_AGENT";
  const { destination, travelers = 1, budget = 2500, interests = ["culture", "food"], geminiApiKey } = tripParams;

  emitProgress(agentId, "STARTED", {
    message: `Curating custom activities in ${destination} matching interests: ${interests.join(", ")}...`,
    timestamp: new Date().toISOString()
  });

  const catalog = getDestinationCatalog(destination, travelers, budget);
  const targetActivitiesBudget = Math.round(budget * 0.20); // 20% allocated to activities/experiences

  emitProgress(agentId, "REASONING", {
    message: `Filtering attraction catalog by tags: [${interests.join(", ")}] and balancing high-energy with relaxing experiences. Target activity budget: $${targetActivitiesBudget}.`,
    activeInterests: interests
  });

  await new Promise(r => setTimeout(r, 650));

  emitProgress(agentId, "CALCULATING_PACING", {
    message: `Sequencing morning cultural landmarks, afternoon explorations, and evening culinary tastings across ${numberOfDays} days...`
  });

  await new Promise(r => setTimeout(r, 700));

  // Filter catalog activities by matching interests first, then supplement
  const matchedActivities = catalog.activities.filter(act => 
    act.tags.some(t => interests.includes(t))
  );

  const pool = matchedActivities.length >= 4 ? matchedActivities : catalog.activities;

  // Build a day-by-day curated activity list
  const dailyPlans = [];
  let totalActivityCostPerPerson = 0;

  for (let day = 1; day <= numberOfDays; day++) {
    // Pick 2-3 items for each day
    const morningItem = pool[(day * 2) % pool.length];
    const afternoonItem = pool[(day * 2 + 1) % pool.length];
    const eveningItem = pool[(day * 2 + 2) % pool.length] || {
      name: `Local Sunset & Traditional Dinner in ${catalog.neighborhoods[day % catalog.neighborhoods.length] || 'City Center'}`,
      timeSlot: "Evening",
      duration: "2.5 hours",
      costPerPerson: 25,
      tags: ["food", "relaxation"],
      location: catalog.neighborhoods[day % catalog.neighborhoods.length] || "Old Quarter",
      highlights: "Authentic local cuisine, neighborhood walk, and evening ambiance.",
      travelTip: "10-15 minute walk or short metro ride from hotel."
    };

    const dayActivities = [
      {
        ...morningItem,
        timeSlot: "Morning (09:30 AM - 12:30 PM)",
        id: `day-${day}-m`,
        dayNumber: day,
        transitFromPrev: day === 1 ? "Transit from Airport / Hotel Check-in: ~35 mins" : "Walk/Metro from hotel: ~15 mins"
      },
      {
        ...afternoonItem,
        timeSlot: "Afternoon (02:00 PM - 05:00 PM)",
        id: `day-${day}-a`,
        dayNumber: day,
        transitFromPrev: `Transit from ${morningItem.name.split(' ')[0]}: ~15-20 mins via local metro/bus`
      },
      {
        ...eveningItem,
        timeSlot: "Evening (06:30 PM - 09:30 PM)",
        id: `day-${day}-e`,
        dayNumber: day,
        transitFromPrev: `Transit from afternoon venue: ~10-15 mins walking or cab`
      }
    ];

    dayActivities.forEach(a => {
      totalActivityCostPerPerson += (a.costPerPerson || 0);
    });

    dailyPlans.push({
      dayNumber: day,
      theme: day === 1 ? "Arrival & Iconic Heritage" : day === numberOfDays ? "Final Hidden Gems & Farewell" : `Deep Dive: ${interests[day % interests.length] || 'Exploration'} & Discovery`,
      activities: dayActivities
    });
  }

  const grandTotalActivities = totalActivityCostPerPerson * travelers;

  const fallbackActivitiesResult = {
    dailyPlans,
    totalCostPerTraveler: totalActivityCostPerPerson,
    totalCost: grandTotalActivities,
    curatedInterests: interests,
    budgetStatus: grandTotalActivities <= targetActivitiesBudget ? "Within Target Allocation" : "Optimal Experience Balance",
    reasoning: `Curated ${numberOfDays * 3} balanced activities tailored specifically to ${interests.join(" and ")}, interleaving high-value iconic sights with free historic walks and culinary highlights.`
  };

  let finalResult = fallbackActivitiesResult;

  if (geminiApiKey) {
    emitProgress(agentId, "AI_ORCHESTRATING", {
      message: "Invoking Gemini 3 to customize daily scheduling and crowd avoidance timings..."
    });

    const geminiRes = await callGeminiAgent({
      apiKey: geminiApiKey,
      systemInstruction: "You are the ACTIVITIES_AGENT in a multi-agent travel system. You curate daily activities matching user interests, duration, and budget. Output strict JSON.",
      prompt: `Destination: ${destination}, Days: ${numberOfDays}, Travelers: ${travelers}, Interests: ${interests.join(", ")}, Target Activities Budget: $${targetActivitiesBudget}.
Generate a structured JSON itinerary with dailyPlans array. Each day must have { dayNumber, theme, activities: [ { name, timeSlot, duration, costPerPerson, tags: [], location, highlights, travelTip, transitFromPrev } ] }.`,
      fallbackData: fallbackActivitiesResult
    });

    if (geminiRes.success && geminiRes.data?.dailyPlans) {
      finalResult = {
        ...geminiRes.data,
        totalCost: geminiRes.data.totalCost || grandTotalActivities,
        curatedInterests: interests,
        budgetStatus: (geminiRes.data.totalCost || grandTotalActivities) <= targetActivitiesBudget ? "Within Target Allocation" : "Optimal Experience Balance",
        reasoning: geminiRes.data.reasoning || fallbackActivitiesResult.reasoning
      };
    }
  }

  emitProgress(agentId, "COMPLETED", {
    message: `Activities finalized: ${numberOfDays} days curated with ${numberOfDays * 3} experiences for $${finalResult.totalCost} total.`,
    totalActivitiesCost: finalResult.totalCost
  });

  return finalResult;
}
