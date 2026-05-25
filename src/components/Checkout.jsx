import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, CheckCircle2, CreditCard, ShieldCheck } from 'lucide-react';
import { useCart } from '../context/CartContext';

export default function Checkout() {
  const navigate = useNavigate();
  const { cartItems, cartTotal, clearCart } = useCart();
  
  // Checkout Form States
  const [shipping, setShipping] = useState({
    name: '',
    email: '',
    address: '',
    city: '',
    country: '',
  });
  
  const [payment, setPayment] = useState({
    cardNum: '',
    expiry: '',
    cvv: '',
  });

  const [step, setStep] = useState(1); // 1 = Form, 2 = Order Completed Success
  const [orderId, setOrderId] = useState('');

  const handleInputChange = (e, section) => {
    const { name, value } = e.target;
    if (section === 'shipping') {
      setShipping((prev) => ({ ...prev, [name]: value }));
    } else {
      setPayment((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (cartItems.length === 0) return;

    // Generate mock order number
    const generatedOrder = 'SIP-' + Math.floor(100000 + Math.random() * 900000);
    setOrderId(generatedOrder);
    setStep(2);
    clearCart();
  };

  return (
    <div className="min-h-screen bg-abyss text-gray-100 flex flex-col font-sans select-none relative">
      {/* Background glow overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-size-[4rem_4rem] z-0 pointer-events-none" />

      {/* Simplified Header */}
      <header className="sticky top-0 z-40 w-full glass-nav backdrop-blur-md px-6 md:px-12 py-5 flex items-center justify-between">
        <Link to="/" className="flex items-center">
          <img src="/Logo.svg" alt="Sunsip Logo" className="h-9 w-auto object-contain" />
        </Link>
        <Link
          to="/"
          className="flex items-center gap-1.5 text-xs font-mono tracking-widest text-gray-400 hover:text-white uppercase transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          Back to Shop
        </Link>
      </header>

      {/* Main Body */}
      <main className="flex-1 max-w-7xl w-full mx-auto py-12 px-6 md:px-12 relative z-10 flex items-center justify-center">
        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div
              key="checkout-step-1"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.5 }}
              className="w-full grid grid-cols-1 lg:grid-cols-12 gap-12"
            >
              {/* Form Column */}
              <div className="lg:col-span-7 space-y-8">
                <div className="border-b border-white/5 pb-4">
                  <h1 className="font-display font-black text-2xl md:text-3xl text-white uppercase tracking-tight">
                    Secure checkout
                  </h1>
                </div>

                <form onSubmit={handleSubmit} className="space-y-8">
                  {/* Step 1: Shipping */}
                  <div className="p-6 rounded-2xl bg-white/1 border border-white/5 space-y-4">
                    <h2 className="text-[10px] font-mono tracking-[0.3em] text-citrus-orange uppercase font-bold flex items-center gap-2">
                      <span className="w-4 h-4 rounded-full bg-citrus-orange/10 flex items-center justify-center text-[8px] text-white">1</span>
                      SHIPPING DETAILS
                    </h2>

                    <div className="space-y-3 pt-2">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <input
                          type="text"
                          name="name"
                          required
                          value={shipping.name}
                          onChange={(e) => handleInputChange(e, 'shipping')}
                          placeholder="Full Name"
                          className="p-3 rounded-xl bg-white/2 border border-white/10 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-citrus-orange transition-colors"
                        />
                        <input
                          type="email"
                          name="email"
                          required
                          value={shipping.email}
                          onChange={(e) => handleInputChange(e, 'shipping')}
                          placeholder="Email Address"
                          className="p-3 rounded-xl bg-white/2 border border-white/10 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-citrus-orange transition-colors"
                        />
                      </div>
                      <input
                        type="text"
                        name="address"
                        required
                        value={shipping.address}
                        onChange={(e) => handleInputChange(e, 'shipping')}
                        placeholder="Street Address"
                        className="w-full p-3 rounded-xl bg-white/2 border border-white/10 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-citrus-orange transition-colors"
                      />
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <input
                          type="text"
                          name="city"
                          required
                          value={shipping.city}
                          onChange={(e) => handleInputChange(e, 'shipping')}
                          placeholder="City"
                          className="p-3 rounded-xl bg-white/2 border border-white/10 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-citrus-orange transition-colors"
                        />
                        <input
                          type="text"
                          name="country"
                          required
                          value={shipping.country}
                          onChange={(e) => handleInputChange(e, 'shipping')}
                          placeholder="Country"
                          className="p-3 rounded-xl bg-white/2 border border-white/10 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-citrus-orange transition-colors"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Step 2: Payment Mock */}
                  <div className="p-6 rounded-2xl bg-white/1 border border-white/5 space-y-4">
                    <h2 className="text-[10px] font-mono tracking-[0.3em] text-citrus-orange uppercase font-bold flex items-center gap-2">
                      <span className="w-4 h-4 rounded-full bg-citrus-orange/10 flex items-center justify-center text-[8px] text-white">2</span>
                      PAYMENT METHOD
                    </h2>

                    <div className="space-y-3 pt-2">
                      <div className="relative flex items-center">
                        <input
                          type="text"
                          name="cardNum"
                          required
                          maxLength="19"
                          value={payment.cardNum}
                          onChange={(e) => {
                            // Format with spaces
                            let val = e.target.value.replace(/\s?/g, '').replace(/[^0-9]/g, '');
                            if (val.length > 0) {
                              val = val.match(new RegExp('.{1,4}', 'g')).join(' ');
                            }
                            e.target.value = val;
                            handleInputChange(e, 'payment');
                          }}
                          placeholder="0000 0000 0000 0000"
                          className="w-full p-3 pl-10 rounded-xl bg-white/2 border border-white/10 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-citrus-orange transition-colors"
                        />
                        <CreditCard className="w-4 h-4 text-gray-500 absolute left-3" />
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <input
                          type="text"
                          name="expiry"
                          required
                          maxLength="5"
                          value={payment.expiry}
                          onChange={(e) => {
                            let val = e.target.value.replace(/\s?/g, '').replace(/[^0-9]/g, '');
                            if (val.length > 2) {
                              val = val.substring(0, 2) + '/' + val.substring(2);
                            }
                            e.target.value = val;
                            handleInputChange(e, 'payment');
                          }}
                          placeholder="MM/YY"
                          className="p-3 rounded-xl bg-white/2 border border-white/10 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-citrus-orange transition-colors"
                        />
                        <input
                          type="password"
                          name="cvv"
                          required
                          maxLength="3"
                          value={payment.cvv}
                          onChange={(e) => {
                            e.target.value = e.target.value.replace(/[^0-9]/g, '');
                            handleInputChange(e, 'payment');
                          }}
                          placeholder="CVV"
                          className="p-3 rounded-xl bg-white/2 border border-white/10 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-citrus-orange transition-colors"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Submission and Shield Check */}
                  <div className="space-y-4">
                    <button
                      type="submit"
                      disabled={cartItems.length === 0}
                      className="w-full btn-primary btn-orange tracking-widest text-xs py-4 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
                    >
                      <span>COMPLETE ORDER</span>
                    </button>
                    <div className="flex items-center gap-2 justify-center text-[10px] text-gray-500 font-mono tracking-wider uppercase">
                      <ShieldCheck className="w-4 h-4 text-leaf-green" />
                      Encrypted SSL checkout. Secure server transaction.
                    </div>
                  </div>
                </form>
              </div>

              {/* Order Summary Sidebar Column */}
              <div className="lg:col-span-5 space-y-6">
                <div className="p-6 rounded-3xl bg-white/1 border border-white/5 space-y-6">
                  <h3 className="text-xs font-display font-bold uppercase tracking-wider text-white">Order Summary</h3>

                  {/* Items List */}
                  <div className="space-y-4 max-h-[300px] overflow-y-auto pr-1">
                    {cartItems.length === 0 ? (
                      <p className="text-xs text-gray-500 italic">No botanical elixirs in cart.</p>
                    ) : (
                      cartItems.map((item) => (
                        <div key={`${item.id}-${item.size}`} className="flex gap-4 items-center">
                          {/* Mini Juice Icon */}
                          <div
                            className="w-10 h-10 rounded-lg flex items-center justify-center p-1 border border-white/5 shrink-0"
                            style={{
                              background: `linear-gradient(135deg, rgba(255,255,255,0.02), ${item.color}0c)`
                            }}
                          >
                            <div className="w-4 h-7 rounded-t-md rounded-b-sm relative overflow-hidden flex items-end">
                              <div
                                className="w-full h-[85%] rounded-b-sm"
                                style={{ backgroundColor: item.color }}
                              />
                            </div>
                          </div>

                          {/* Info details */}
                          <div className="flex-1 min-w-0">
                            <h4 className="text-xs font-semibold text-white truncate uppercase">{item.name}</h4>
                            <p className="text-[10px] text-gray-500 font-mono mt-0.5">
                              {item.size} × {item.quantity}
                            </p>
                          </div>

                          {/* Subtotal cost */}
                          <span className="font-mono text-xs font-semibold text-white">
                            ${(item.price * item.quantity).toFixed(2)}
                          </span>
                        </div>
                      ))
                    )}
                  </div>

                  {/* Pricing Breakdown */}
                  <div className="pt-4 border-t border-white/5 space-y-2.5 text-xs text-gray-400">
                    <div className="flex justify-between">
                      <span>Subtotal</span>
                      <span className="font-mono text-white">${cartTotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Cold-Chain Shipping</span>
                      <span className="text-leaf-green font-mono uppercase tracking-wider font-semibold">FREE</span>
                    </div>
                    <div className="flex justify-between pt-2.5 border-t border-white/5 text-sm items-baseline">
                      <span className="font-display text-white font-medium">Total</span>
                      <span className="font-mono text-lg font-bold text-white text-glow-orange">
                        ${cartTotal.toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Success Step Completed */}
          {step === 2 && (
            <motion.div
              key="checkout-step-2"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: 'spring', damping: 20 }}
              className="max-w-md w-full p-8 rounded-3xl bg-white/1 border border-white/5 text-center space-y-6"
            >
              <div className="w-16 h-16 rounded-full bg-leaf-green/10 border border-leaf-green/20 flex items-center justify-center mx-auto text-leaf-green">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <div className="space-y-2">
                <h2 className="font-display font-black text-2xl text-white uppercase tracking-tight">
                  ORDER COMMITTED!
                </h2>
                <p className="text-xs text-gray-400 leading-relaxed">
                  Your harvest allocation has been locked. Cold-chain dispatch coordinates are generating.
                </p>
              </div>

              <div className="p-4 rounded-xl border border-white/5 bg-black/40 space-y-1">
                <span className="block text-[8px] font-mono tracking-widest text-gray-500 uppercase">Order ID</span>
                <span className="block font-mono text-base font-bold text-white">{orderId}</span>
              </div>

              <div className="pt-2">
                <button
                  onClick={() => navigate('/')}
                  className="w-full btn-primary btn-outline text-xs tracking-wider"
                >
                  RETURN TO HOME
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}
