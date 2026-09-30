// Rich curated travel database for popular destinations + procedural generator for any custom destination
export const POPULAR_DESTINATIONS = {
  tokyo: {
    city: "Tokyo",
    country: "Japan",
    currency: "USD",
    airports: ["HND (Tokyo Haneda)", "NRT (Tokyo Narita)"],
    avgFlightPrices: { economy: 850, premium: 1400, business: 2800 },
    airlines: ["All Nippon Airways (ANA)", "Japan Airlines (JAL)", "Singapore Airlines", "Delta Air Lines", "United Airlines"],
    neighborhoods: ["Shinjuku", "Shibuya", "Ginza", "Asakusa", "Roppongi"],
    hotels: [
      {
        name: "Hotel Gracery Shinjuku",
        neighborhood: "Shinjuku",
        stars: 4,
        rating: 4.6,
        pricePerNight: 165,
        amenities: ["Free High-speed Wi-Fi", "Godzilla Terrace View", "Subway Proximity (3 min)", "English Concierge", "Breakfast Buffet"],
        image: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=800&q=80",
        description: "Modern vibrant hotel in the pulse of Shinjuku with direct access to Yamanote rail and premier dining."
      },
      {
        name: "The Prince Gallery Tokyo Kioicho",
        neighborhood: "Chiyoda / Akasaka",
        stars: 5,
        rating: 4.9,
        pricePerNight: 380,
        amenities: ["Panoramic Skyline Pool", "Michelin-starred Dining", "Full Luxury Spa", "Direct Metro Access", "Executive Club Lounge"],
        image: "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=800&q=80",
        description: "Ultra-luxury sanctuary soaring above Kioicho with sky-high cocktail lounge and Mt. Fuji morning vistas."
      },
      {
        name: "Candeo Hotels Tokyo Shimbashi",
        neighborhood: "Ginza / Shimbashi",
        stars: 3.5,
        rating: 4.4,
        pricePerNight: 120,
        amenities: ["Open-air Rooftop SkySpa", "Sauna", "Complimentary Wi-Fi", "Convenient Train Hub", "Organic Breakfast"],
        image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80",
        description: "Smart comfortable boutique hotel famous for its starlit open-air bath overlooking Tokyo Tower."
      }
    ],
    activities: [
      {
        name: "Senso-ji Temple & Nakamise Street Cultural Walk",
        timeSlot: "Morning",
        duration: "2.5 hours",
        costPerPerson: 0,
        tags: ["culture"],
        location: "Asakusa",
        highlights: "Tokyo's oldest Buddhist temple, traditional incense ritual, and historic craft stalls.",
        travelTip: "Take the Ginza Subway Line to Asakusa Station, exit 1."
      },
      {
        name: "Shibuya Crossing & Meiji Jingu Forest Shrine",
        timeSlot: "Afternoon",
        duration: "3 hours",
        costPerPerson: 10,
        tags: ["culture", "adventure"],
        location: "Shibuya / Harajuku",
        highlights: "World-famous scramble crossing, tranquil 170-acre evergreen forest shrine, and Takeshita vintage alleys.",
        travelTip: "15 min Yamanote Line ride from Asakusa/Ueno to Shibuya."
      },
      {
        name: "Tsukiji Outer Market Gourmet Tasting & Omakase",
        timeSlot: "Morning",
        duration: "2.5 hours",
        costPerPerson: 45,
        tags: ["food", "culture"],
        location: "Chuo / Tsukiji",
        highlights: "Fresh otoro sashimi skewers, tamagoyaki omelettes, and artisan matcha soft serve.",
        travelTip: "Oedo Subway Line to Tsukijishijo Station."
      },
      {
        name: "teamLab Borderless Digital Art Museum",
        timeSlot: "Afternoon",
        duration: "2.5 hours",
        costPerPerson: 36,
        tags: ["culture", "adventure"],
        location: "Azabudai Hills",
        highlights: "World-renowned interactive projection art, infinite crystal rooms, and tea house holograms.",
        travelTip: "Direct connection at Kamiyacho Station."
      },
      {
        name: "Omoide Yokocho & Golden Gai Izakaya Food Tour",
        timeSlot: "Evening",
        duration: "3 hours",
        costPerPerson: 55,
        tags: ["food", "nightlife"],
        location: "Shinjuku",
        highlights: "Charcoal yakitori skewers, craft sake flights, and intimate retro showa-era micro-bars.",
        travelTip: "Walking distance from Shinjuku West exit."
      },
      {
        name: "Odaiba Beachfront & Rainbow Bridge Sunset Cruise",
        timeSlot: "Evening",
        duration: "2 hours",
        costPerPerson: 25,
        tags: ["beach", "relaxation"],
        location: "Tokyo Bay / Odaiba",
        highlights: "Tokyo Bay sandy beach walk, life-sized Gundam statue, and illuminated bay views.",
        travelTip: "Take the elevated Yurikamome monorail for scenic bay crossing."
      },
      {
        name: "Mt. Takao Scenic Summit & Forest Cable Car",
        timeSlot: "Morning",
        duration: "4.5 hours",
        costPerPerson: 20,
        tags: ["adventure", "nature"],
        location: "Hachioji / Mount Takao",
        highlights: "Alpine cedar trails, mountain monkey sanctuary, and panoramic views stretching to Mt. Fuji.",
        travelTip: "Keio Line express train from Shinjuku in 50 minutes."
      }
    ]
  },
  paris: {
    city: "Paris",
    country: "France",
    currency: "EUR",
    airports: ["CDG (Charles de Gaulle)", "ORY (Paris Orly)"],
    avgFlightPrices: { economy: 780, premium: 1350, business: 2600 },
    airlines: ["Air France", "Delta", "British Airways", "Lufthansa", "United Airlines"],
    neighborhoods: ["Le Marais", "Saint-Germain-des-Prés", "Montmartre", "Latin Quarter", "7th Arrondissement"],
    hotels: [
      {
        name: "Hôtel Saint-Germain Saint-Louis",
        neighborhood: "Saint-Germain-des-Prés",
        stars: 4,
        rating: 4.7,
        pricePerNight: 195,
        amenities: ["Historic Parisian Balconies", "Artisan Bakery Breakfast", "High-speed Wi-Fi", "Courtyard Patio", "Metro 2 mins"],
        image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=800&q=80",
        description: "Quintessential Left Bank boutique hotel surrounded by philosopher cafes, art galleries, and the Seine."
      },
      {
        name: "Le Pavillon de la Reine & Spa",
        neighborhood: "Place des Vosges / Le Marais",
        stars: 5,
        rating: 4.9,
        pricePerNight: 420,
        amenities: ["Private Ivy-clad Courtyard", "Codage Luxury Spa", "Valet Service", "Honesty Cocktail Bar", "Bicycle Fleet"],
        image: "https://images.unsplash.com/photo-1549144511-f099e773c147?auto=format&fit=crop&w=800&q=80",
        description: "Privileged 17th-century hideaway tucked behind the arcades of historic Place des Vosges."
      },
      {
        name: "Hôtel Caron de Beaumarchais",
        neighborhood: "Le Marais",
        stars: 3.5,
        rating: 4.5,
        pricePerNight: 145,
        amenities: ["Vintage French Decor", "Breakfast in Bed", "Complimentary Wi-Fi", "Air Conditioning", "Central Marais"],
        image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=800&q=80",
        description: "Charming romantic refuge celebrating 18th-century French literature with antique harpsichord lobby."
      }
    ],
    activities: [
      {
        name: "Louvre Masterpieces & Tuileries Garden Stroll",
        timeSlot: "Morning",
        duration: "3.5 hours",
        costPerPerson: 22,
        tags: ["culture"],
        location: "1st Arrondissement",
        highlights: "Mona Lisa, Winged Victory, Venus de Milo, followed by espresso by the Tuileries fountain.",
        travelTip: "Metro Palais-Royal Musée du Louvre (Lines 1 & 7)."
      },
      {
        name: "Montmartre Bohemian Artists Square & Sacré-Cœur",
        timeSlot: "Afternoon",
        duration: "3 hours",
        costPerPerson: 0,
        tags: ["culture", "relaxation"],
        location: "18th Arrondissement",
        highlights: "Place du Tertre painters, cobblestone alleys, and breathtaking panorama over the Parisian rooftops.",
        travelTip: "Metro Anvers or Abbesses + Montmartre Funicular."
      },
      {
        name: "Seine Sunset Glass-Canopy River Cruise",
        timeSlot: "Evening",
        duration: "1.5 hours",
        costPerPerson: 18,
        tags: ["relaxation", "culture"],
        location: "Pont Neuf / Eiffel Pier",
        highlights: "Illuminated Notre-Dame, Musée d'Orsay, and the sparkling hourly Eiffel Tower light show.",
        travelTip: "Boarding directly below Pont de l'Alma."
      },
      {
        name: "Le Marais Patisserie & Fromagerie Culinary Tour",
        timeSlot: "Morning",
        duration: "3 hours",
        costPerPerson: 50,
        tags: ["food"],
        location: "Le Marais",
        highlights: "Warm flaky croissants, aged Comte cheese, hand-churned butter, and artisanal salted caramel macarons.",
        travelTip: "Saint-Paul Metro station."
      },
      {
        name: "Palace of Versailles Royal Gardens Bike Exploration",
        timeSlot: "Morning",
        duration: "5 hours",
        costPerPerson: 35,
        tags: ["adventure", "culture"],
        location: "Versailles",
        highlights: "Hall of Mirrors, Marie Antoinette's Hameau de la Reine, and cycling along the Grand Canal.",
        travelTip: "RER C train from central Paris directly to Versailles Château Rive Gauche (40 mins)."
      }
    ]
  },
  bali: {
    city: "Bali",
    country: "Indonesia",
    currency: "USD",
    airports: ["DPS (Ngurah Rai / Denpasar)"],
    avgFlightPrices: { economy: 920, premium: 1550, business: 3100 },
    airlines: ["Singapore Airlines", "Qatar Airways", "Cathay Pacific", "Emirates", "Garuda Indonesia"],
    neighborhoods: ["Ubud", "Seminyak", "Canggu", "Uluwatu", "Nusa Dua"],
    hotels: [
      {
        name: "Maya Ubud Resort & Secret Forest Spa",
        neighborhood: "Ubud",
        stars: 5,
        rating: 4.8,
        pricePerNight: 185,
        amenities: ["River Valley Infinity Pools", "Complimentary Morning Yoga", "Forest Spa Pavilions", "Free Shuttle to Ubud Market", "Organic Breakfast"],
        image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=800&q=80",
        description: "Secluded paradise perched between the Petanu River valley and emerald rice terraces."
      },
      {
        name: "The Seminyak Beach Resort & Spa",
        neighborhood: "Seminyak",
        stars: 4.5,
        rating: 4.7,
        pricePerNight: 160,
        amenities: ["Direct Beachfront Access", "Sunset Ocean Lounge", "Infinity Pool", "Full Wellness Spa", "Airport Transfer"],
        image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=800&q=80",
        description: "Chic oceanfront retreat with spectacular Indian Ocean sunsets and walkable designer boutiques."
      },
      {
        name: "Suara Air Luxury Bamboo Villas",
        neighborhood: "Canggu",
        stars: 4,
        rating: 4.5,
        pricePerNight: 95,
        amenities: ["Private Plunge Pool", "Eco-luxe Bamboo Architecture", "Breakfast Included", "Scooter Rental", "Free Wi-Fi"],
        image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=800&q=80",
        description: "Affordable luxury bamboo villa hidden among palm trees, 7 minutes to Echo Beach surf breaks."
      }
    ],
    activities: [
      {
        name: "Mount Batur Sunrise Volcano Trek & Crater Breakfast",
        timeSlot: "Morning",
        duration: "5 hours",
        costPerPerson: 40,
        tags: ["adventure"],
        location: "Kintamani",
        highlights: "Hike under the stars to watch sunrise above the clouds, with eggs cooked in volcanic steam.",
        travelTip: "Hotel pickup at 2:30 AM; hiking poles and headlamps provided."
      },
      {
        name: "Tegallalang Rice Terrace Walk & Jungle Swing",
        timeSlot: "Morning",
        duration: "2.5 hours",
        costPerPerson: 15,
        tags: ["adventure", "culture", "relaxation"],
        location: "Ubud",
        highlights: "UNESCO-heritage subak irrigation terraces, coconut water stations, and giant canyon swings.",
        travelTip: "20 min scenic drive north of Ubud center."
      },
      {
        name: "Uluwatu Clifftop Temple & Kecak Fire Dance",
        timeSlot: "Evening",
        duration: "3 hours",
        costPerPerson: 20,
        tags: ["culture"],
        location: "Uluwatu",
        highlights: "Ancient sea temple on a 70m limestone precipice with dramatic chanting fire dancers at dusk.",
        travelTip: "Arrive by 4:45 PM to secure cliff amphitheater seats."
      },
      {
        name: "Nusa Penida Manta Ray Snorkeling & Kelingking T-Rex Cliff",
        timeSlot: "Morning",
        duration: "7 hours",
        costPerPerson: 65,
        tags: ["beach", "adventure"],
        location: "Nusa Penida Island",
        highlights: "Speedboat ride to swim alongside giant ocean manta rays and photograph the famous dinosaur cliff.",
        travelTip: "Fast boat departs Sanur harbor at 7:30 AM (40 min crossing)."
      },
      {
        name: "Balinese Farm-to-Table Cooking Class & Organic Herb Harvest",
        timeSlot: "Afternoon",
        duration: "4 hours",
        costPerPerson: 30,
        tags: ["food", "culture"],
        location: "Ubud / Payangan",
        highlights: "Grind fresh galangal, lemongrass, and turmeric on stone pestles to make traditional satay lilit.",
        travelTip: "Includes morning market produce selection tour."
      }
    ]
  },
  newyork: {
    city: "New York",
    country: "United States",
    currency: "USD",
    airports: ["JFK (John F. Kennedy)", "EWR (Newark Liberty)", "LGA (LaGuardia)"],
    avgFlightPrices: { economy: 450, premium: 850, business: 1900 },
    airlines: ["Delta Air Lines", "JetBlue", "United Airlines", "American Airlines"],
    neighborhoods: ["Manhattan - Midtown", "SoHo / Greenwich Village", "DUMBO / Brooklyn Heights", "Upper West Side"],
    hotels: [
      {
        name: "Arlo SoHo",
        neighborhood: "SoHo / Hudson Square",
        stars: 4,
        rating: 4.6,
        pricePerNight: 230,
        amenities: ["Rooftop Hudson River Bar", "Courtyard Gathering Space", "Complimentary City Bikes", "Fast Wi-Fi", "Record Player Lounges"],
        image: "https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=800&q=80",
        description: "Smart micro-boutique hotel in prime downtown location surrounded by cobblestone streets and chic boutiques."
      },
      {
        name: "1 Hotel Brooklyn Bridge",
        neighborhood: "DUMBO / Brooklyn",
        stars: 5,
        rating: 4.9,
        pricePerNight: 410,
        amenities: ["Plunge Rooftop Pool", "Unobstructed Lower Manhattan Skyline Views", "Eco-sustainable Design", "Farm-fresh Dining", "Tesla House Car"],
        image: "https://images.unsplash.com/photo-1506157786151-b8491531f063?auto=format&fit=crop&w=800&q=80",
        description: "Waterfront luxury oasis with floor-to-ceiling windows looking directly across to the Statue of Liberty."
      },
      {
        name: "Pod 39 Hotel",
        neighborhood: "Midtown East / Murray Hill",
        stars: 3.5,
        rating: 4.4,
        pricePerNight: 155,
        amenities: ["Brick-arched Rooftop Bar", "Salvation Taco Cantina", "Game Lounge", "Walk to Grand Central (5 min)", "High-speed Wi-Fi"],
        image: "https://images.unsplash.com/photo-1541971875076-8f970d573be6?auto=format&fit=crop&w=800&q=80",
        description: "Cleverly designed high-efficiency hotel steps from Grand Central with one of NYC's coziest rooftop bars."
      }
    ],
    activities: [
      {
        name: "High Line Elevated Park & Chelsea Market Food Hall",
        timeSlot: "Morning",
        duration: "2.5 hours",
        costPerPerson: 15,
        tags: ["food", "culture", "relaxation"],
        location: "Meatpacking / Chelsea",
        highlights: "Walk atop the historic elevated rail track, browse Chelsea Market lobster rolls, and see Hudson River art.",
        travelTip: "Start at Gansevoort St and walk north towards The Shed."
      },
      {
        name: "Central Park Rowboats & The Met Museum",
        timeSlot: "Afternoon",
        duration: "3.5 hours",
        costPerPerson: 30,
        tags: ["culture", "relaxation"],
        location: "Upper East Side / Central Park",
        highlights: "Row wooden boats on the lake, see Bethesda Terrace, and explore Egyptian temples inside The Metropolitan Museum.",
        travelTip: "Subway 4/5/6 to 86th St, short walk through park."
      },
      {
        name: "Summit One Vanderbilt Skyline Experience",
        timeSlot: "Evening",
        duration: "2 hours",
        costPerPerson: 46,
        tags: ["adventure", "culture"],
        location: "Midtown Manhattan",
        highlights: "Mind-bending multi-sensory mirror infinity rooms 1,000 feet above NYC with direct Chrysler Building views.",
        travelTip: "Connected to Grand Central Terminal concourse."
      },
      {
        name: "Brooklyn Bridge Sunset Walk & Grimaldi's Pizza",
        timeSlot: "Evening",
        duration: "2.5 hours",
        costPerPerson: 25,
        tags: ["food", "culture", "adventure"],
        location: "Lower Manhattan to Brooklyn",
        highlights: "Golden hour stroll across the iconic suspension bridge followed by coal-fired brick oven pizza in DUMBO.",
        travelTip: "Subway 4/5/6 to Brooklyn Bridge-City Hall."
      }
    ]
  },
  rome: {
    city: "Rome",
    country: "Italy",
    currency: "EUR",
    airports: ["FCO (Fiumicino / Leonardo da Vinci)", "CIA (Ciampino)"],
    avgFlightPrices: { economy: 750, premium: 1300, business: 2500 },
    airlines: ["ITA Airways", "Air France", "Lufthansa", "Delta", "British Airways"],
    neighborhoods: ["Trastevere", "Campo de' Fiori / Navona", "Monti", "Piazza di Spagna"],
    hotels: [
      {
        name: "Hotel Artemide",
        neighborhood: "Monti / Via Nazionale",
        stars: 4,
        rating: 4.8,
        pricePerNight: 175,
        amenities: ["Panoramic Rooftop Cocktails", "Artemis Wellness Spa", "Complimentary Minibar", "Gourmet Breakfast", "Metro Republica 3 min"],
        image: "https://images.unsplash.com/photo-1552832230-c0197dd311b5?auto=format&fit=crop&w=800&q=80",
        description: "Award-winning hotel in an elegant 19th-century palazzo within walking distance of the Colosseum."
      },
      {
        name: "Donna Camilla Savelli - VRetreats",
        neighborhood: "Trastevere",
        stars: 4.5,
        rating: 4.7,
        pricePerNight: 210,
        amenities: ["Baroque Monastery Cloister", "Rooftop Terrace of Gianicolo", "Peaceful Citrus Gardens", "A/C", "Wine Tastings"],
        image: "https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=800&q=80",
        description: "Restored 17th-century convent designed by Borromini, placed in the bohemian winding alleys of Trastevere."
      }
    ],
    activities: [
      {
        name: "Colosseum Arena Floor & Roman Forum Archaeological Walk",
        timeSlot: "Morning",
        duration: "3.5 hours",
        costPerPerson: 32,
        tags: ["culture"],
        location: "Piazza del Colosseo",
        highlights: "Walk where gladiators battled, stand on the wooden arena reconstructed floor, and climb the Palatine Hill.",
        travelTip: "Metro Line B directly to Colosseo station."
      },
      {
        name: "Trastevere Cobblestone Evening Pasta & Gelato Crawl",
        timeSlot: "Evening",
        duration: "3 hours",
        costPerPerson: 40,
        tags: ["food", "culture"],
        location: "Trastevere",
        highlights: "Authentic Cacio e Pepe, crispy Roman supplì, carafes of Frascati wine, and artisanal pistachio gelato.",
        travelTip: "Take tram 8 from Piazza Venezia across the Tiber river."
      },
      {
        name: "Vatican Museums, Sistine Chapel & St. Peter's Basilica",
        timeSlot: "Morning",
        duration: "4 hours",
        costPerPerson: 35,
        tags: ["culture"],
        location: "Vatican City",
        highlights: "Michelangelo's ceiling frescoes, the Gallery of Maps, and standing under Bernini's bronze canopy.",
        travelTip: "Metro Line A to Ottaviano-San Pietro."
      },
      {
        name: "Trevi Fountain Coin Toss & Pantheon Architectural Marvel",
        timeSlot: "Afternoon",
        duration: "2 hours",
        costPerPerson: 5,
        tags: ["culture", "relaxation"],
        location: "Centro Storico",
        highlights: "Toss a coin over your left shoulder to ensure your return to Rome, then marvel at the world's largest unreinforced concrete dome.",
        travelTip: "Pedestrian-only historic streets; wear comfortable cobblestone footwear."
      }
    ]
  }
};

// Generates dynamic realistic data for any destination if not in pre-seeded catalog
export function getDestinationCatalog(destinationName, travelerCount = 1, budget = 2000) {
  const normalized = (destinationName || "Tokyo").trim().toLowerCase();
  
  for (const [key, data] of Object.entries(POPULAR_DESTINATIONS)) {
    if (normalized.includes(key) || data.city.toLowerCase().includes(normalized)) {
      return data;
    }
  }

  // Dynamic procedural generator for custom destinations
  const titleCity = destinationName.trim().charAt(0).toUpperCase() + destinationName.trim().slice(1);
  const estFlightEconomy = Math.max(350, Math.round((budget * 0.35) / Math.max(1, travelerCount)));
  const estNightRate = Math.max(90, Math.round((budget * 0.35) / 5));

  return {
    city: titleCity,
    country: "International Destination",
    currency: "USD",
    airports: [`${titleCity.slice(0, 3).toUpperCase()} International Airport`],
    avgFlightPrices: {
      economy: estFlightEconomy,
      premium: Math.round(estFlightEconomy * 1.5),
      business: Math.round(estFlightEconomy * 2.8)
    },
    airlines: ["Major Star Alliance Partner", "Global SkyTeam Carrier", "National Flag Carrier", "Direct Route Express"],
    neighborhoods: [`Central ${titleCity}`, `Historic Old Quarter`, `${titleCity} Waterfront`, `Cultural Arts District`],
    hotels: [
      {
        name: `${titleCity} Grand Heritage Hotel & Spa`,
        neighborhood: `Central ${titleCity}`,
        stars: 4.5,
        rating: 4.7,
        pricePerNight: estNightRate,
        amenities: ["Central Location", "Complimentary Breakfast", "High-speed Wi-Fi", "Concierge Service", "Fitness Center"],
        image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80",
        description: `Sophisticated hotel in prime location near ${titleCity}'s historic landmarks, dining, and transit.`
      },
      {
        name: `${titleCity} Boutique Haven`,
        neighborhood: `Historic Old Quarter`,
        stars: 4,
        rating: 4.5,
        pricePerNight: Math.round(estNightRate * 0.75),
        amenities: ["Artisan Café", "Historic Courtyard", "Free High-speed Wi-Fi", "Walking Distance to Sights"],
        image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=800&q=80",
        description: `Charming character-filled property situated among vibrant cafes and local artisan workshops.`
      },
      {
        name: `${titleCity} Panorama Luxury Suites`,
        neighborhood: `${titleCity} Waterfront`,
        stars: 5,
        rating: 4.9,
        pricePerNight: Math.round(estNightRate * 1.6),
        amenities: ["Panoramic Skyline Views", "Heated Pool & Spa", "Michelin Guide Restaurant", "Chauffeur Service"],
        image: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=800&q=80",
        description: `Ultra-luxurious retreat offering floor-to-ceiling vistas, customized concierge, and world-class relaxation.`
      }
    ],
    activities: [
      {
        name: `${titleCity} Historical Landmarks & Old Town Walking Tour`,
        timeSlot: "Morning",
        duration: "3 hours",
        costPerPerson: 25,
        tags: ["culture"],
        location: "Historic Quarter",
        highlights: `Explore the foundational monuments, ancient architecture, and heritage squares of ${titleCity}.`,
        travelTip: "Central metro stop or 10 min cab from downtown."
      },
      {
        name: `${titleCity} Local Food Market & Culinary Tasting Experience`,
        timeSlot: "Afternoon",
        duration: "2.5 hours",
        costPerPerson: 40,
        tags: ["food"],
        location: "Market Square",
        highlights: `Sample regional delicacies, fresh pastries, artisanal street snacks, and locally roasted coffees.`,
        travelTip: "Easily reachable on foot from Old Town."
      },
      {
        name: `${titleCity} Scenic Viewpoint & Sunset Panorama`,
        timeSlot: "Evening",
        duration: "2 hours",
        costPerPerson: 15,
        tags: ["relaxation", "adventure"],
        location: "Summit Hill / Waterfront",
        highlights: `Stunning panoramic golden hour vistas across ${titleCity} skyline and waterfront.`,
        travelTip: "Take the scenic funicular or 15-minute rideshare."
      },
      {
        name: `${titleCity} Nature & Adventure Day Excursion`,
        timeSlot: "Morning",
        duration: "4.5 hours",
        costPerPerson: 45,
        tags: ["adventure", "beach", "nature"],
        location: "Surrounding Nature Reserve",
        highlights: `Scenic trail exploration, lush landscape vistas, and outdoor rejuvenation away from the bustle.`,
        travelTip: "Organized shuttle or regional express rail."
      }
    ]
  };
}
