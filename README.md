# AeroVoyage AI - Multi-Agent Travel Planner

A collaborative, AI-powered travel planning application orchestrated by specialized multi-agents: **Flights Agent**, **Hotels Agent**, **Activities Agent**, and **Master Coordinator Agent**.

---

## 🏛️ System Architecture

```
                               ┌────────────────────────────────┐
                               │   User Travel Input & Config   │
                               │  (Dates, Budget, Style, Hub)   │
                               └───────────────┬────────────────┘
                                               │
                                               ▼
                               ┌────────────────────────────────┐
                               │     ITINERARY_COORDINATOR      │
                               │  (Extracts parameters & plans) │
                               └───────────────┬────────────────┘
                                               │
               ┌───────────────────────────────┼───────────────────────────────┐
               ▼                               ▼                               ▼
    ┌────────────────────┐          ┌────────────────────┐          ┌────────────────────┐
    │   FLIGHTS_AGENT    │          │    HOTELS_AGENT    │          │  ACTIVITIES_AGENT  │
    │  - Airline quotes  │          │  - Lodging search  │          │  - Experience pool │
    │  - Baggage policy  │          │  - Amenities check │          │  - Pacing balance  │
    │  - Flight schedules│          │  - Neighborhood    │          │  - Time-slotting   │
    └──────────┬─────────┘          └──────────┬─────────┘          └──────────┬─────────┘
               │                               │                               │
               └───────────────────────────────┼───────────────────────────────┘
                                               │ Parallel Results Streams
                                               ▼
                               ┌────────────────────────────────┐
                               │     ITINERARY_COORDINATOR      │
                               │  - Cross-agent constraints     │
                               │  - Graceful budget rebalance   │
                               │  - Sequential transit matrix   │
                               │  - Cohesive schedule synthesis │
                               └───────────────┬────────────────┘
                                               │
                                               ▼
                               ┌────────────────────────────────┐
                               │   Interactive Dossier & PDF    │
                               └────────────────────────────────┘
```

---

## 🚀 Key Features

1. **Simultaneous Multi-Agent Execution**:
   - `FLIGHTS_AGENT`: Evaluates airlines, schedules, layovers, and baggage allowances.
   - `HOTELS_AGENT`: Audits neighborhoods, verified amenities (Wi-Fi, Breakfast, Metro proximity), guest reviews, and lodging costs.
   - `ACTIVITIES_AGENT`: Curates morning, afternoon, and evening experiences tailored to user interests (beach, culture, adventure, food, relaxation, nightlife, nature, shopping).
   - `ITINERARY_COORDINATOR`: Master conductor synchronizing parallel agents, calculating transit between venues, and compiling the unified itinerary.

2. **Graceful Budget Overrun Management**:
   - If initial agent recommendations exceed the target budget, the coordinator automatically detects the deficit and triggers rebalancing:
     - Switches to highly-rated value-optimized alternative lodging.
     - Selects saver flight fare options.
     - Offsets food and transit buffers using verified complimentary hotel breakfasts.
   - Transparently displays the before/after savings breakdown and actions taken.

3. **Validated Transit Times & Feasibility**:
   - Calculates realistic travel times and modes (Metro/Train, Pedestrian walking, Express rail, Rideshare) between sequential locations (Airport -> Hotel, Hotel -> Morning sight, Morning -> Afternoon -> Evening).

4. **Real-Time Agent Progress & Thought Stream**:
   - Server-Sent Events (SSE) streaming with live status badges (`IDLE`, `ACTIVE`, `REASONING`, `VALIDATING`, `REBALANCING`, `COMPLETED`).
   - Interactive live reasoning terminal displaying agent thoughts, airline comparisons, and constraint checks in real time.

5. **Instant PDF Dossier Export**:
   - Downloadable, professionally formatted travel dossier generated with `jspdf`. Includes flight tickets, hotel reservations, day-by-day itineraries, transit directions, and financial audits.

6. **Gemini 3 Integration (Hybrid Mode)**:
   - Built-in realistic travel intelligence engine operates out of the box with zero external dependencies.
   - Optional input for your Google Gemini API Key via UI modal or `.env` for direct real-time Gemini model orchestration.

---

## 🛠️ Tech Stack

- **Frontend**: React 19, Tailwind CSS v4, Lucide React, jsPDF, Canvas Confetti, Vite 6
- **Backend**: Node.js 24, Express, Server-Sent Events (SSE), Google GenAI SDK (`@google/genai`)

---

## 🏃 Running Locally

### 1. Start the Backend Server
```bash
cd backend
npm install
npm start
```
The backend server runs on `http://localhost:5001`.

*(Optional)* Create a `backend/.env` file with your Gemini API key:
```env
GEMINI_API_KEY=your_key_here
PORT=5001
```

### 2. Start the Frontend
```bash
cd frontend
npm install
npm run dev
```
The frontend dev server runs on `http://127.0.0.1:5173/`.

---

## 👤 Author & Architecture

- **Lead Architect & Developer**: **Manya Bhardwaj**
- **System**: Multi-Agent Collaborative Travel Planning System
- **Orchestration**: Google Gemini 3 Model & Autonomous Fallback Engine

---

## 🐙 How to Push to GitHub

Follow these steps to upload this project to your GitHub account:

1. **Initialize Git in the project root**:
   ```bash
   cd C:\Users\acer\.gemini\antigravity-ide\scratch\multi-agent-travel-planner
   git init
   git branch -M main
   ```

2. **Add all files and commit**:
   ```bash
   git add .
   git commit -m "feat: initial release of AeroVoyage AI Multi-Agent Travel Planner by Manya Bhardwaj"
   ```

3. **Create a new repository on GitHub**:
   - Go to [github.com/new](https://github.com/new).
   - Enter repository name: `multi-agent-travel-planner` (or `aerovoyage-ai`).
   - Leave "Initialize with README" **unchecked** (since we already have one).
   - Click **Create repository**.

4. **Link and push to GitHub**:
   ```bash
   git remote add origin https://github.com/<YOUR_GITHUB_USERNAME>/multi-agent-travel-planner.git
   git push -u origin main
   ```
