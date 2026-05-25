import { GoogleGenAI } from '@google/genai';

// Initialize the Gemini client using the environment variable VITE_GEMINI_API_KEY
// Note: In Vite, env variables are available on import.meta.env
const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

let aiClient = null;

if (apiKey) {
  aiClient = new GoogleGenAI({ apiKey });
} else {
  console.warn('VITE_GEMINI_API_KEY is not defined in the environment. AI Matchmaker will run in mock mode.');
}

/**
 * Gets a personalized juice recommendation from Gemini.
 * @param {string} mood - User's current mood state
 * @param {string} goal - User's health/nutrition goal
 * @param {string} dislikes - Ingredients/flavors the user dislikes
 * @returns {Promise<{productId: string, headline: string, reasoning: string, wellnessTip: string}>}
 */
export async function getJuiceRecommendation(mood, goal, dislikes) {
  // If the API client is not configured, fallback to a sensible mock implementation
  if (!aiClient) {
    return getMockRecommendation(mood, goal, dislikes);
  }

  const prompt = `
    You are the "Sunsip AI Flavor Matchmaker", a digital wellness mixologist for "Sunsip", a premium cold-pressed juice brand.
    We offer 4 core botanical elixirs:
    1. Zenith Orange (id: "zenith-orange") - Oranges, Ginger, Turmeric, Black Pepper. Accent style is Citrus Orange. Good for: Energy, immunity, anti-inflammatory.
    2. Emerald Cleanse (id: "emerald-cleanse") - Kale, Cucumber, Celery, Spinach, Green Apple, Lime. Accent style is Leaf Green. Good for: Detox, alkalizing, digestion.
    3. Solar Zest (id: "solar-zest") - Meyer Lemon, Yuzu, Honey, Activated Charcoal. Accent style is Solar/Lemon. Good for: Focus, binding toxins, clarity.
    4. Ruby Eclipse (id: "ruby-eclipse") - Beetroot, Pomegranate, Blood Orange, Rosemary. Accent style is Ruby/Restore. Good for: Circulation, sports recovery, antioxidants.

    The customer has provided the following profile:
    - Mood: "${mood}"
    - Health/Wellness Goal: "${goal}"
    - Dislikes / Avoid ingredients: "${dislikes || 'None'}"

    Determine the single absolute BEST MATCH juice from our catalog for this customer. If they dislike ingredients in a specific juice, make sure you choose a different one!
    For example, if they dislike ginger, do NOT choose Zenith Orange. If they dislike celery, do NOT choose Emerald Cleanse.

    Return your recommendation in a strict JSON format with the following keys. Do NOT wrap it in markdown block tags like \`\`\`json. Return only the raw JSON.
    JSON structure:
    {
      "productId": "zenith-orange" | "emerald-cleanse" | "solar-zest" | "ruby-eclipse",
      "headline": "A short, catchy, epic, premium headline (e.g. 'ELIXIR ALIGNED: THE ZENITH RITUAL')",
      "reasoning": "A highly tailored, quirky, premium, 2-sentence explanation of why this juice matches their mood (${mood}) and goals (${goal}), highlighting how the specific ingredients benefit them.",
      "wellnessTip": "A 1-sentence actionable premium wellness ritual or tip (e.g. 'Sip at 11 AM before your first deep-focus block.')"
    }
  `;

  try {
    const response = await aiClient.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
      },
    });

    const text = response.text || '';
    // Clean potential markdown wrapped backticks if the model ignores instructions
    const cleanedText = text.replace(/```json/g, '').replace(/```/g, '').trim();
    return JSON.parse(cleanedText);
  } catch (error) {
    console.error('Error generating AI recommendation from Gemini:', error);
    // Return mock recommendation on failure so the user experience doesn't break
    return getMockRecommendation(mood, goal, dislikes);
  }
}

/**
 * Mock recommendation fallback if API fails or key is missing.
 */
function getMockRecommendation(mood, goal, dislikes) {
  const dislikesLower = (dislikes || '').toLowerCase();
  
  // Logical mapping
  let match = 'zenith-orange';
  let headline = 'ELIXIR ALIGNED: THE ZENITH BIND';
  let reasoning = 'Since you are seeking energy and vitality, the ginger and turmeric in Zenith Orange will kickstart your cellular respiration and clear blockages.';
  let wellnessTip = 'Sip first thing in the morning on an empty stomach to fire up your metabolic engine.';

  if (dislikesLower.includes('ginger') || dislikesLower.includes('turmeric') || goal.toLowerCase().includes('detox') || mood.toLowerCase().includes('fog') || mood.toLowerCase().includes('exhausted')) {
    if (!dislikesLower.includes('celery') && !dislikesLower.includes('kale')) {
      match = 'emerald-cleanse';
      headline = 'ELIXIR ALIGNED: THE EMERALD FLUSH';
      reasoning = 'Designed to counteract fatigue and help you detoxify, the raw celery and organic spinach in Emerald Cleanse flush acidity and optimize cell hydration.';
      wellnessTip = 'Drink chilled at midday during a brief screen-break to ground your senses.';
    } else if (!dislikesLower.includes('charcoal') && !dislikesLower.includes('lemon')) {
      match = 'solar-zest';
      headline = 'ELIXIR ALIGNED: THE SOLAR ECLIPSE';
      reasoning = 'Targeting cognitive focus while respecting your ingredient exclusions, the activated charcoal and citrus notes in Solar Zest bind toxins and clear mind fog.';
      wellnessTip = 'Sip during intense deep-focus tasks to maintain mental acuity.';
    } else {
      match = 'ruby-eclipse';
      headline = 'ELIXIR ALIGNED: THE RUBY SHIELD';
      reasoning = 'Formulated for restoration, the nitrate-dense beetroot and blood orange in Ruby Eclipse speed up oxygen delivery to muscles and boost stamina.';
      wellnessTip = 'Enjoy post-workout or after active tasks to speed up cellular repair.';
    }
  } else if (goal.toLowerCase().includes('focus') || goal.toLowerCase().includes('clear') || dislikesLower.includes('spinach')) {
    match = 'solar-zest';
    headline = 'ELIXIR ALIGNED: THE SOLAR CHARGE';
    reasoning = 'The activated charcoal works together with yuzu to clear out brain clutter, leaving you focused, sharp, and mentally recharged.';
    wellnessTip = 'Best taken in the afternoon when energy reserves dip.';
  } else if (goal.toLowerCase().includes('recovery') || goal.toLowerCase().includes('stamina')) {
    match = 'ruby-eclipse';
    headline = 'ELIXIR ALIGNED: THE RUBY FLOW';
    reasoning = 'Perfect for active recovery and cellular oxygenation, the organic beetroot and blood orange build nitric oxide to fuel continuous stamina.';
    wellnessTip = 'Drink 30 minutes before high-exertion workouts or stretching.';
  }

  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        productId: match,
        headline,
        reasoning,
        wellnessTip,
      });
    }, 1500); // Simulate network latency
  });
}
