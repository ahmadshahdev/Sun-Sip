import { ShoppingBag, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { motion } from 'framer-motion';

export default function Navbar({ onOpenMatchmaker }) {
  const { setIsCartOpen, cartCount } = useCart();

  return (
    <motion.header
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="sticky top-0 z-40 w-full glass-nav backdrop-blur-md px-6 md:px-12 py-4 flex items-center justify-between"
    >
      <Link to="/" className="flex items-center group">
        <img
          src="/Logo.svg"
          alt="Sunsip Logo"
          className="h-10 md:h-12 w-auto object-contain transition-transform duration-300 group-hover:scale-[1.03]"
        />
      </Link>

      {/* Nav Links - Editorial/Minimalist */}
      <nav className="hidden md:flex items-center gap-8 text-sm font-medium tracking-widest text-gray-400 uppercase">
        <a href="/#products" className="hover:text-white transition-colors duration-200">
          Products
        </a>
        <a href="/#philosophy" className="hover:text-white transition-colors duration-200">
          Our Philosophy
        </a>
        <Link to="/about" className="hover:text-white transition-colors duration-200">
          About Us
        </Link>
      </nav>

      {/* CTA Actions */}
      <div className="flex items-center gap-4">
        {/* AI Matchmaker Trigger */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onOpenMatchmaker}
          className="relative inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-display font-semibold tracking-wider text-white bg-linear-to-r from-citrus-orange via-citrus-light to-leaf-green shadow-[0_0_20px_rgba(255,107,0,0.2)] hover:shadow-[0_0_30px_rgba(255,107,0,0.4)] transition-all duration-300 cursor-pointer"
        >
          <Sparkles className="w-3.5 h-3.5 animate-pulse" />
          <span>AI MATCHMAKER</span>
        </motion.button>

        {/* Cart Trigger */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsCartOpen(true)}
          className="relative p-2.5 rounded-full border border-white/5 hover:border-white/20 bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white transition-all duration-300 cursor-pointer"
          aria-label="Open Cart"
        >
          <ShoppingBag className="w-5 h-5" />
          {cartCount > 0 && (
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-citrus-orange text-[10px] font-bold text-white flex items-center justify-center shadow-md shadow-citrus-orange/30"
            >
              {cartCount}
            </motion.span>
          )}
        </motion.button>
      </div>
    </motion.header>
  );
}
