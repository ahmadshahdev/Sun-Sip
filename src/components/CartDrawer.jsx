import { motion, AnimatePresence } from 'framer-motion';
import { X, Plus, Minus, Trash2, ShoppingBag, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

export default function CartDrawer() {
  const navigate = useNavigate();
  const {
    isCartOpen,
    setIsCartOpen,
    cartItems,
    updateQuantity,
    removeFromCart,
    cartTotal,
  } = useCart();

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          {/* Overlay backdrop-blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsCartOpen(false)}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm cursor-pointer"
          />

          {/* Cart Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 z-50 h-full w-full sm:w-[450px] glass-drawer flex flex-col"
          >
            {/* Header */}
            <div className="p-6 border-b border-white/5 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ShoppingBag className="w-5 h-5 text-citrus-orange" />
                <h2 className="font-display font-bold text-lg uppercase tracking-wider text-white">Your Cart</h2>
              </div>
              <button
                onClick={() => setIsCartOpen(false)}
                className="p-2 text-gray-400 hover:text-white rounded-full hover:bg-white/5 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Items list */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {cartItems.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
                  <div className="w-16 h-16 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-500">
                    <ShoppingBag className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-display font-medium text-white mb-1">Your cart is empty</h3>
                    <p className="text-sm text-gray-400 max-w-xs">
                      Fill it with cold-pressed sunshine. Browse our products to get started.
                    </p>
                  </div>
                  <button
                    onClick={() => setIsCartOpen(false)}
                    className="btn-primary btn-outline text-xs tracking-wider"
                  >
                    CONTINUE SHOPPING
                  </button>
                </div>
              ) : (
                cartItems.map((item) => (
                  <motion.div
                    layout
                    key={`${item.id}-${item.size}`}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="p-4 rounded-2xl bg-white/2 border border-white/5 flex gap-4 items-center"
                  >
                    {/* Liquid Silhouette Card Icon */}
                    <div
                      className="w-16 h-16 rounded-xl flex items-center justify-center p-1 border border-white/5 relative overflow-hidden"
                      style={{
                        background: `linear-gradient(135deg, rgba(255,255,255,0.02), ${item.color}0c)`
                      }}
                    >
                      <div className="absolute inset-0 bg-radial-gradient from-transparent to-black/30" />
                      <div className={`w-8 h-12 rounded-t-full rounded-b-lg relative overflow-hidden flex items-end shadow-md`}>
                        {/* Juice Content */}
                        <div
                          className="w-full h-[85%] rounded-b-md transition-all duration-500"
                          style={{ backgroundColor: item.color }}
                        />
                        {/* Bottle Cap */}
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-4 h-1 bg-white/30 rounded" />
                      </div>
                    </div>

                    {/* Details */}
                    <div className="flex-1 min-w-0">
                      <h4 className="font-display font-semibold text-sm text-white truncate">
                        {item.name}
                      </h4>
                      <p className="text-xs text-gray-400 mt-0.5">{item.size}</p>
                      <p className="text-xs font-mono font-medium text-white mt-1">
                        ${item.price.toFixed(2)}
                      </p>
                    </div>

                    {/* Quantity Controls & Delete */}
                    <div className="flex flex-col items-end gap-2">
                      <div className="flex items-center border border-white/10 rounded-full bg-white/5 p-1">
                        <button
                          onClick={() => updateQuantity(item.id, item.size, item.quantity - 1)}
                          className="p-1 hover:text-white text-gray-400 transition-colors rounded-full cursor-pointer"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="w-6 text-center text-xs font-mono font-bold text-white">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, item.size, item.quantity + 1)}
                          className="p-1 hover:text-white text-gray-400 transition-colors rounded-full cursor-pointer"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <button
                        onClick={() => removeFromCart(item.id, item.size)}
                        className="text-gray-500 hover:text-rose-500 transition-colors p-1 rounded cursor-pointer"
                        aria-label="Remove item"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </motion.div>
                ))
              )}
            </div>

            {/* Footer Summary */}
            {cartItems.length > 0 && (
              <div className="p-6 border-t border-white/5 bg-black/40 space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-xs text-gray-400 font-medium">
                    <span>Shipping</span>
                    <span className="text-leaf-green font-display uppercase tracking-wider font-semibold">FREE</span>
                  </div>
                  <div className="flex justify-between items-baseline">
                    <span className="font-display font-medium text-sm text-gray-300">Total</span>
                    <span className="font-mono text-2xl font-bold text-white text-glow-orange">
                      ${cartTotal.toFixed(2)}
                    </span>
                  </div>
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    setIsCartOpen(false);
                    navigate('/checkout');
                  }}
                  className="w-full btn-primary btn-orange tracking-widest text-xs py-4 cursor-pointer"
                >
                  <span>PROCEED TO CHECKOUT</span>
                  <ArrowRight className="w-4 h-4" />
                </motion.button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
