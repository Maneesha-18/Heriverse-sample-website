# HeriVerse – Smart Tourist Assistance System for Tamil Nadu Heritage Sites

HeriVerse is a full-stack MERN application that provides tourist assistance for historical, traditional, and cultural heritage sites of Tamil Nadu. 

## Features
1. **Interactive Sites Catalogue**: Display and filter 6 heritage destinations by category (Temple, Fort, Museum, Beach, Hill).
2. **Details & Embedded Map**: Check timings, weather forecasts, entry fees, and explore location map using the embedded Google Maps API.
3. **AI Tourist Guide Chatbot**: Ask history or tourist queries. Live integration with Google Gemini API, with built-in fallbacks if credentials are not configured.
4. **Vocal Audio Guide**: Interactive audio guidance utilizing the browser's built-in Text-to-Speech (TTS) Synthesis API.
5. **Secure Authentication**: Register and login pages generating secure JSON Web Tokens (JWT) for saving and favoring places.

---

## Folder Structure
```
HeriVerse/
├── backend/
│   ├── src/
│   │   ├── config/       # MongoDB Connection
│   │   ├── controllers/  # Auth, Places, AI controllers
│   │   ├── middleware/   # JWT verification middleware
│   │   ├── models/       # Mongoose user/place schemas
│   │   └── server.js     # Express server starter
│   └── .env              # Environment Configuration
├── frontend/
│   ├── public/           # Fonts & public index
│   └── src/
│       ├── assets/       # Dynamic image/asset references
│       ├── components/   # Navbar, PlaceCard, Map, AI Assistant, etc.
│       ├── pages/        # Home, Details, Login, Register
│       └── services/     # api.js client communications
└── README.md
```

---

## Setup & Running Instructions

### Step 1: Pre-generate Asset Mocks
Run the automatic script to populate 1x1 mock images so the React bundler doesn't throw missing image import errors:
```bash
node generate_assets.js
```

### Step 2: Running the Backend
1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Update environment credentials in `.env` if desired (MongoDB URI, JWT secret, and Google Gemini API Key).
4. Run in development mode:
   ```bash
   npm run dev
   ```
   *The server runs on port 5000.*

### Step 3: Running the Frontend
1. Open a new terminal window and navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run React development server:
   ```bash
   npm start
   ```
   *The client opens automatically on http://localhost:3000.*

---

## Initializing/Seeding the Database
Once the backend and frontend are running, you can seed MongoDB Compass with the 6 sample sites by clicking the **"Initialize/Seed MongoDB Compass"** button on the Home Page explore section.
