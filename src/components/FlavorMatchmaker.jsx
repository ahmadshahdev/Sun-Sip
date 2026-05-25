import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Sparkles, Loader2, ArrowRight, Check, AlertCircle } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { getJuiceRecommendation } from '../services/gemini';
import { products } from '../data/products';

const MOODS = [
  { id: 'exhausted', label: '⚡ Exhausted', desc: 'Need a physical surge' },
  { id: 'foggy', label: '🧠 Mind Fog', desc: 'Need cognitive sharpness' },
  { id: 'restless', label: '🌀 Restless', desc: 'Need grounding/calm' },
  { id: 'sluggish', label: '🐢 Sluggish', desc: 'Need cellular digestive flush' },
];

const GOALS = [
  { id: 'energy', label: 'Sustained Energy', desc: 'Pre-workout or clean endurance' },
  { id: 'detox', label: 'Alkalizing Detox', desc: 'Purify cells and digestive path' },
  { id: 'focus', label: 'Mental Clarity', desc: 'Sharp attention and focus' },
  { id: 'immunity', label: 'Immunity Shield', desc: 'Boost white blood defense' },
];

export default function FlavorMatchmaker({ isOpen, onClose }) {
  const { addToCart } = useCart();
  
  // Wizard state
  const [step, setStep] = useState(1);
  const [selectedMood, setSelectedMood] = useState('');
  const [selectedGoal, setSelectedGoal] = useState('');
  const [dislikes, setDislikes] = useState('');
  
  // Loading & Result states
  const [loading, setLoading] = useState(false);
  const [recommendation, setRecommendation] = useState(null);
  const [error, setError] = useState('');
  const [addedToCart, setAddedToCart] = useState(false);
  const [selectedSize, setSelectedSize] = useState('Single Bottle');

  const handleNextStep = () => {
    if (step === 1 && !selectedMood) return;
    if (step === 2 && !selectedGoal) return;
    setStep((prev) => prev + 1);
  };

  const handlePrevStep = () => {
    setStep((prev) => Math.max(1, prev - 1));
  };

  const handleSubmit = async () => {
    setLoading(true);
    setError('');
    setStep(4);
    
    try {
      const result = await getJuiceRecommendation(selectedMood, selectedGoal, dislikes);
      if (result && result.productId) {
        setRecommendation(result);
      } else {
        throw new Error('Incomplete response structure');
      }
    } catch (err) {
      console.error(err);
      setError('The AI Matchmaker hit a snag. Let us try alignment again.');
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setStep(1);
    setSelectedMood('');
    setSelectedGoal('');
    setDislikes('');
    setRecommendation(null);
    setAddedToCart(false);
    setError('');
  };

  // Find the product matching the recommended productId
  const recommendedProduct = recommendation
    ? products.find((p) => p.id === recommendation.productId) || products[0]
    : null;

  const handleAddRecommendation = () => {
    if (recommendedProduct) {
      addToCart(recommendedProduct, selectedSize);
      setAddedToCart(true);
      setTimeout(() => {
        onClose();
        handleReset();
      }, 1500);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Overlay blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/75 backdrop-blur-md cursor-pointer"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 250 }}
            className="relative w-full max-w-lg glass-modal rounded-[2.5rem] overflow-hidden p-6 md:p-8 z-10 flex flex-col"
          >
            {/* Ambient Accent Light */}
            <div className="absolute -top-12 -left-12 w-32 h-32 rounded-full bg-citrus-orange/10 blur-2xl pointer-events-none" />
            <div className="absolute -bottom-12 -right-12 w-32 h-32 rounded-full bg-leaf-green/10 blur-2xl pointer-events-none" />

            {/* Header */}
            <div className="flex justify-between items-center pb-4 border-b border-white/5 mb-6 relative z-10">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-citrus-orange" />
                <span className="font-display font-black text-sm uppercase tracking-widest text-white">
                  Sunsip Matchmaker
                </span>
              </div>
              <button
                onClick={onClose}
                className="p-2 text-gray-400 hover:text-white rounded-full hover:bg-white/5 transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Steps Wizard Progress (only for steps 1-3) */}
            {step <= 3 && (
              <div className="mb-8 relative z-10">
                <div className="flex justify-between text-[10px] text-gray-500 font-mono tracking-widest uppercase mb-2">
                  <span>Step {step} of 3</span>
                  <span>{step === 1 ? 'Vibe Check' : step === 2 ? 'Goal Check' : 'Dislikes'}</span>
                </div>
                <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-linear-to-r from-citrus-orange to-leaf-green"
                    initial={{ width: '0%' }}
                    animate={{ width: `${(step / 3) * 100}%` }}
                    transition={{ duration: 0.3 }}
                  />
                </div>
              </div>
            )}

            {/* Step Contents */}
            <div className="flex-1 relative z-10 min-h-[280px] flex flex-col justify-between">
              <AnimatePresence mode="wait">
                {/* STEP 1: MOOD SELECTION */}
                {step === 1 && (
                  <motion.div
                    key="step-1"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.2 }}
                    className="space-y-4"
                  >
                    <div>
                      <h3 className="font-display font-bold text-lg text-white uppercase">How is your energy right now?</h3>
                      <p className="text-xs text-gray-400 mt-1">Select your current metabolic/mental state.</p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                      {MOODS.map((mood) => (
                        <button
                          key={mood.id}
                          onClick={() => setSelectedMood(mood.id)}
                          className={`p-4 rounded-2xl border text-left transition-all duration-300 cursor-pointer ${
                            selectedMood === mood.id
                              ? 'bg-citrus-orange/10 border-citrus-orange shadow-[0_0_15px_rgba(255,107,0,0.15)] text-white'
                              : 'bg-white/1 border-white/5 text-gray-300 hover:border-white/20'
                          }`}
                        >
                          <span className="block text-sm font-semibold uppercase">{mood.label}</span>
                          <span className="block text-[10px] text-gray-400 mt-1">{mood.desc}</span>
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}

                {/* STEP 2: HEALTH GOALS */}
                {step === 2 && (
                  <motion.div
                    key="step-2"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.2 }}
                    className="space-y-4"
                  >
                    <div>
                      <h3 className="font-display font-bold text-lg text-white uppercase">What is your health target?</h3>
                      <p className="text-xs text-gray-400 mt-1">Select the nutritional impact you want to achieve.</p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                      {GOALS.map((goal) => (
                        <button
                          key={goal.id}
                          onClick={() => setSelectedGoal(goal.id)}
                          className={`p-4 rounded-2xl border text-left transition-all duration-300 cursor-pointer ${
                            selectedGoal === goal.id
                              ? 'bg-leaf-green/10 border-leaf-green shadow-[0_0_15px_rgba(16,185,129,0.15)] text-white'
                              : 'bg-white/1 border-white/5 text-gray-300 hover:border-white/20'
                          }`}
                        >
                          <span className="block text-sm font-semibold uppercase">{goal.label}</span>
                          <span className="block text-[10px] text-gray-400 mt-1">{goal.desc}</span>
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}

                {/* STEP 3: DISLIKED INGREDIENTS */}
                {step === 3 && (
                  <motion.div
                    key="step-3"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.2 }}
                    className="space-y-4"
                  >
                    <div>
                      <h3 className="font-display font-bold text-lg text-white uppercase">Ingredient Exclusions</h3>
                      <p className="text-xs text-gray-400 mt-1">Are there any specific flavors or ingredients you dislike? (e.g. ginger, celery, charcoal, sweetness)</p>
                    </div>

                    <div className="pt-2">
                      <input
                        type="text"
                        value={dislikes}
                        onChange={(e) => setDislikes(e.target.value)}
                        placeholder="e.g. Ginger, sweet beets, or leave blank..."
                        className="w-full p-4 rounded-2xl bg-white/2 border border-white/10 text-white text-sm placeholder-gray-500 focus:outline-none focus:border-citrus-orange transition-colors"
                      />
                      <div className="flex flex-wrap gap-2 mt-4">
                        {['Ginger', 'Celery', 'Charcoal', 'Beetroot'].map((term) => (
                          <button
                            key={term}
                            onClick={() => {
                              const current = dislikes.trim();
                              if (!current) {
                                setDislikes(term);
                              } else if (!current.toLowerCase().includes(term.toLowerCase())) {
                                setDislikes(current + ', ' + term);
                              }
                            }}
                            className="px-3 py-1.5 rounded-full border border-white/5 bg-white/3 hover:bg-white/5 text-[10px] text-gray-400 transition-colors cursor-pointer"
                          >
                            + Exclude {term}
                          </button>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* STEP 4: LOADING / ERROR / RESULTS */}
                {step === 4 && (
                  <motion.div
                    key="step-4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="w-full flex flex-col justify-center items-center py-6 min-h-[300px]"
                  >
                    {loading && (
                      <div className="flex flex-col items-center justify-center text-center space-y-4">
                        <div className="relative flex items-center justify-center">
                          <Loader2 className="w-10 h-10 text-citrus-orange animate-spin" />
                          <Sparkles className="w-4 h-4 text-leaf-green absolute animate-ping" />
                        </div>
                        <div>
                          <h4 className="font-display font-semibold text-white uppercase text-sm tracking-wider">
                            Consulting the Matchmaker...
                          </h4>
                          <p className="text-xs text-gray-500 mt-1 max-w-[280px]">
                            Analyzing mood nodes, cellular goals, and flavor exclusions.
                          </p>
                        </div>
                      </div>
                    )}

                    {error && (
                      <div className="flex flex-col items-center justify-center text-center space-y-4">
                        <AlertCircle className="w-10 h-10 text-rose-500" />
                        <div>
                          <h4 className="font-display font-semibold text-white uppercase text-sm">Vibe Mismatch</h4>
                          <p className="text-xs text-gray-500 mt-1 max-w-[280px]">{error}</p>
                        </div>
                        <button onClick={handleReset} className="btn-primary btn-outline text-xs py-2 px-6">
                          RESET MATCHMAKER
                        </button>
                      </div>
                    )}

                    {!loading && !error && recommendation && recommendedProduct && (
                      <div className="w-full space-y-5">
                        {/* Recommendation details */}
                        <div className="text-center space-y-1">
                          <span className="text-[9px] font-mono tracking-widest text-leaf-green uppercase">
                            AI Alignment Completed
                          </span>
                          <h4 className="font-display font-black text-md text-white uppercase tracking-tight">
                            {recommendation.headline}
                          </h4>
                        </div>

                        {/* RENDER DYNAMIC MAPPED CARD */}
                        <div className="p-4 rounded-3xl bg-white/2 border border-white/5 flex gap-4 items-center">
                          {/* Mini Juice Bottle Visual */}
                          <div
                            className="w-16 h-24 rounded-2xl flex items-center justify-center border border-white/5 relative overflow-hidden"
                            style={{
                              background: `linear-gradient(135deg, rgba(255,255,255,0.02), ${recommendedProduct.color}0f)`
                            }}
                          >
                            <div
                              className="w-7 h-16 rounded-t-full rounded-b-md relative overflow-hidden flex items-end shadow-md"
                              style={{ border: '1px solid rgba(255,255,255,0.05)' }}
                            >
                              <div
                                className="w-full h-[85%] rounded-b-sm"
                                style={{ backgroundColor: recommendedProduct.color }}
                              />
                            </div>
                          </div>

                          {/* Details */}
                          <div className="flex-1 min-w-0">
                            <h5 className="font-display font-bold text-sm text-white uppercase">
                              {recommendedProduct.name}
                            </h5>
                            <p className="text-[10px] text-gray-400 mt-1 leading-relaxed italic">
                              "{recommendation.reasoning}"
                            </p>
                            <div className="mt-2.5 p-2 rounded-lg bg-white/2 border border-white/5">
                              <span className="block text-[8px] font-mono text-gray-500 uppercase tracking-widest">
                                Recommended Ritual
                              </span>
                              <p className="text-[9px] text-gray-300 mt-0.5">{recommendation.wellnessTip}</p>
                            </div>
                          </div>
                        </div>

                        {/* Size Config for direct buy */}
                        <div className="flex items-center gap-2 justify-between p-2 rounded-full bg-white/1 border border-white/5 text-[10px] font-semibold text-gray-400">
                          <button
                            onClick={() => setSelectedSize('Single Bottle')}
                            className={`flex-1 py-1 rounded-full text-center transition-colors cursor-pointer ${
                              selectedSize === 'Single Bottle' ? 'text-white bg-white/5 border border-white/5' : 'hover:text-gray-200'
                            }`}
                          >
                            SINGLE ($
                            {recommendedProduct.priceSingle.toFixed(2)})
                          </button>
                          <button
                            onClick={() => setSelectedSize('Box of 12')}
                            className={`flex-1 py-1 rounded-full text-center transition-colors cursor-pointer ${
                              selectedSize === 'Box of 12' ? 'text-white bg-white/5 border border-white/5' : 'hover:text-gray-200'
                            }`}
                          >
                            BOX OF 12 ($
                            {recommendedProduct.priceBox.toFixed(2)})
                          </button>
                        </div>

                        {/* Action buttons */}
                        <div className="flex gap-2">
                          <button
                            onClick={handleReset}
                            className="btn-primary btn-outline text-xs px-4 py-3 cursor-pointer shrink-0"
                          >
                            RESET
                          </button>
                          <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={handleAddRecommendation}
                            className="flex-1 btn-primary btn-green text-xs py-3 cursor-pointer"
                          >
                            {addedToCart ? (
                              <>
                                <Check className="w-4 h-4" />
                                <span>ADDED TO CART!</span>
                              </>
                            ) : (
                              <>
                                <span>ADD ALIGNED ELIXIR</span>
                                <ArrowRight className="w-4 h-4" />
                              </>
                            )}
                          </motion.button>
                        </div>
                      </div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Navigation Footer (for steps 1-3) */}
              {step <= 3 && (
                <div className="flex gap-3 border-t border-white/5 pt-6 mt-6">
                  {step > 1 && (
                    <button
                      onClick={handlePrevStep}
                      className="btn-primary btn-outline text-xs px-5 py-3 cursor-pointer"
                    >
                      BACK
                    </button>
                  )}
                  
                  {step < 3 ? (
                    <button
                      onClick={handleNextStep}
                      disabled={step === 1 ? !selectedMood : step === 2 ? !selectedGoal : false}
                      className="flex-1 btn-primary btn-orange text-xs py-3 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
                    >
                      <span>CONTINUE</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  ) : (
                    <button
                      onClick={handleSubmit}
                      className="flex-1 btn-primary btn-orange text-xs py-3 cursor-pointer"
                    >
                      <span>FIND MY ELIXIR</span>
                      <Sparkles className="w-4 h-4 text-white" />
                    </button>
                  )}
                </div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
