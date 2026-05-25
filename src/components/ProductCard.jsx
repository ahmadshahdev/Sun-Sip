import { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Check, Sparkles } from 'lucide-react';
import { useCart } from '../context/CartContext';

export default function ProductCard({ product }) {
  const { addToCart } = useCart();
  const [size, setSize] = useState('Single Bottle'); // 'Single Bottle' or 'Box of 12'
  const [added, setAdded] = useState(false);

  const price = size === 'Box of 12' ? product.priceBox : product.priceSingle;

  const handleAdd = () => {
    addToCart(product, size);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6 }}
      className="glass-card rounded-3xl p-6 flex flex-col relative group overflow-hidden"
    >
      {/* Dynamic Backlight Glow based on product color */}
      <div
        className="absolute top-1/4 left-1/2 -translate-x-1/2 w-48 h-48 rounded-full blur-[80px] opacity-10 group-hover:opacity-20 transition-opacity duration-500 pointer-events-none"
        style={{ backgroundColor: product.color }}
      />

      {/* Product Tag */}
      <div className="flex justify-between items-start mb-4">
        <span className="text-[10px] font-mono tracking-widest text-gray-500 uppercase">
          {product.number}
        </span>
        {product.isBestSeller && (
          <span className="text-[9px] font-display font-semibold tracking-wider text-citrus-orange bg-citrus-orange/10 border border-citrus-orange/20 px-2 py-0.5 rounded-full flex items-center gap-1">
            <Sparkles className="w-2.5 h-2.5 animate-pulse" />
            POPULAR
          </span>
        )}
      </div>

      {/* Visual representation of premium glass juice bottle */}
      <div className="h-60 flex items-center justify-center relative mb-6">
        <motion.div
          whileHover={{ y: -10, scale: 1.03, rotate: 1 }}
          transition={{ type: 'spring', stiffness: 200, damping: 15 }}
          className="relative w-36 h-52 flex items-center justify-center cursor-pointer"
        >
          {/* Bottle Shadow */}
          <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-24 h-4 bg-black/60 rounded-full blur-md opacity-80 group-hover:scale-x-110 transition-transform duration-300 pointer-events-none" />

          {/* Realistic Product Image */}
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-contain drop-shadow-[0_15px_20px_rgba(0,0,0,0.6)]"
          />
        </motion.div>
      </div>

      {/* Product Text Details */}
      <div className="flex-1 flex flex-col">
        <h3 className="font-display font-bold text-lg text-white uppercase tracking-tight">
          {product.name}
        </h3>
        <p className="text-xs text-gray-400 font-light mt-1.5 flex-1 leading-relaxed">
          {product.description}
        </p>

        {/* Nutritional Highlight */}
        <div className="mt-3 flex gap-2 overflow-hidden">
          {product.tags.map((tag) => (
            <span
              key={tag}
              className="text-[9px] font-mono tracking-wider text-gray-400 bg-white/2 border border-white/5 px-2 py-0.5 rounded"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Size Switcher Toggle (Single vs Box of 12) */}
        <div className="mt-6 p-1 rounded-full bg-white/2 border border-white/5 flex relative">
          <button
            onClick={() => setSize('Single Bottle')}
            className={`flex-1 py-1.5 text-[10px] font-display font-semibold tracking-wider rounded-full transition-all duration-300 relative z-10 cursor-pointer ${
              size === 'Single Bottle' ? 'text-white bg-white/5 border border-white/10 shadow-sm' : 'text-gray-500 hover:text-gray-300'
            }`}
          >
            BOTTLE
          </button>
          <button
            onClick={() => setSize('Box of 12')}
            className={`flex-1 py-1.5 text-[10px] font-display font-semibold tracking-wider rounded-full transition-all duration-300 relative z-10 cursor-pointer ${
              size === 'Box of 12' ? 'text-white bg-white/5 border border-white/10 shadow-sm' : 'text-gray-500 hover:text-gray-300'
            }`}
          >
            BOX OF 12
          </button>
        </div>

        {/* Price & Add to Cart */}
        <div className="mt-6 flex items-center justify-between pt-4 border-t border-white/5">
          <div className="flex flex-col">
            <span className="text-[9px] font-mono tracking-widest text-gray-500 uppercase">Price</span>
            <span className="font-mono text-xl font-bold text-white tracking-tight">
              ${price.toFixed(2)}
            </span>
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleAdd}
            className={`relative p-3 rounded-full flex items-center justify-center transition-all duration-300 cursor-pointer shadow-md ${
              added
                ? 'bg-leaf-green text-white shadow-leaf-green/20'
                : product.accentClass === 'orange'
                ? 'bg-citrus-orange text-white shadow-citrus-orange/20 hover:bg-citrus-light'
                : 'bg-leaf-green text-white shadow-leaf-green/20 hover:bg-leaf-light'
            }`}
            aria-label="Add to cart"
          >
            {added ? <Check className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}
