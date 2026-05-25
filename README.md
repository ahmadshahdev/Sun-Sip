# 🍊 Sunsip | Premium E-Commerce Frontend

Sunsip is a modern, single-page React application built for a premium cold-pressed juice brand. It combines an editorial, high-contrast minimalist aesthetic with interactive e-commerce functionality and a unique AI-powered product recommendation engine.

![Sunsip Vibe](https://via.placeholder.com/1200x600?text=Sunsip+Modern+Juice+UI) *(Note: Replace with an actual screenshot of your hero section!)*

## ✨ Key Features

* **The AI "Flavor Matchmaker":** A flagship feature powered by the Google Gemini API. Users input their current mood, wellness goals, and dietary dislikes into a glassmorphic UI. The app communicates with the LLM to return a highly personalized, JSON-formatted juice recommendation.
* **Complex Cart & Variant Logic:** Built-in React Context state management that dynamically handles pricing and shipping weight logic between "Single Bottle" and bulk "Box of 12" variants for international fulfillment.
* **Editorial UI/UX System:** * Deep abyssal dark mode for a premium "tech-focused" aesthetic.
  * Extensive use of Tailwind's `backdrop-blur` for frosted glass navigation and off-canvas menus.
  * Fluid micro-interactions and route transitions powered by Framer Motion.
* **Distraction-Free Checkout:** A streamlined 2-step checkout flow designed to maximize conversion rates by isolating the user from global navigation.

## 🛠 Tech Stack

* **Core Framework:** React.js bootstrapped with [Vite](https://vitejs.dev/) for blazing-fast HMR.
* **Styling:** [Tailwind CSS](https://tailwindcss.com/) (Custom configured for brand colors and glassmorphism utilities).
* **Animations:** [Framer Motion](https://www.framer.com/motion/)
* **AI Integration:** `@google/genai` (Utilizing the Gemini 2.5 Flash model).
* **State Management:** React Context API.

## 📂 Project Structure

```text
sunsip/
├── public/               # Static assets (logo, favicons)
├── src/
│   ├── components/       # Reusable UI blocks (Navbar, CartDrawer, Hero)
│   ├── context/          # Global state (CartContext.jsx)
│   ├── data/             # Mock database (products.js)
│   ├── services/         # API integrations (gemini.js)
│   ├── App.jsx           # Main layout and routing
│   └── main.jsx          # React DOM entry point
├── .env.local            # Environment variables (Ignored by Git)
├── tailwind.config.js    # Custom brand theme configuration
└── package.json


### Installation

Clone the repository:

* **Bash**
git clone [https://github.com/yourusername/sunsip.git](https://github.com/yourusername/sunsip.git)
cd sunsip

* **Bash**
npm install

* **Configure Environment Variables:**
Create a .env.local file in the root directory. Add your Gemini API key:

* **Code snippet**
VITE_GEMINI_API_KEY=your_actual_api_key_here
(Note: This application includes a fallback mock-data function. If the API key is missing or the rate limit is hit, the UI will still function seamlessly.)

Start the development server:

* **Bash**
npm run dev

<h1 align="center"> Developed By</h1>
<h2 align="center">Syed Ahmad Shah.</h2>