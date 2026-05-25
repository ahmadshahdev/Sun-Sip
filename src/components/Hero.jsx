import { motion, useMotionValue, useSpring } from 'framer-motion';
import { ArrowDown, Sparkles } from 'lucide-react';

export default function Hero({ onOpenMatchmaker }) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth spring physics for glow movement
  const springConfig = { damping: 40, stiffness: 150, mass: 0.8 };
  const glowX = useSpring(mouseX, springConfig);
  const glowY = useSpring(mouseY, springConfig);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    // Offset by 250px (half of the 500px wide bubble) to center the bubble directly under the cursor
    mouseX.set(e.clientX - rect.left - 250);
    mouseY.set(e.clientY - rect.top - 250);
  };

  return (
    <section
      onMouseMove={handleMouseMove}
      className="relative min-h-[90vh] flex flex-col justify-center items-center overflow-hidden px-6 md:px-12 py-16 bg-mesh-glow"
    >
      {/* Dynamic interactive glow mesh */}
      <motion.div
        className="hidden md:block pointer-events-none absolute w-[500px] h-[500px] rounded-full blur-[120px] bg-linear-to-tr from-citrus-orange/15 to-leaf-green/15 z-0"
        style={{
          x: glowX,
          y: glowY,
        }}
      />

      {/* Grid overlay for tech/editorial look */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-size-[4rem_4rem] mask-[radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]  z-0 pointer-events-none" />

      {/* Floating particles */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[20%] left-[15%] w-2 h-2 rounded-full bg-citrus-orange/30 animate-pulse" />
        <div className="absolute top-[60%] right-[20%] w-3.5 h-3.5 rounded-full bg-leaf-green/20 animate-bounce [animation-duration:6s]" />
        <div className="absolute bottom-[30%] left-[25%] w-1.5 h-1.5 rounded-full bg-white/20 animate-pulse [animation-duration:4s]" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-4xl text-center flex flex-col items-center">
        {/* Editorial Subtitle */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-2 px-3 py-1 rounded-full border border-white/5 bg-white/3 text-gray-400 text-xs tracking-[0.2em] uppercase mb-8"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-leaf-green animate-pulse" />
          100% Raw Cold-Pressed Elixirs
        </motion.div>

        {/* Main Bold Title */}
        <motion.h1
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="font-display font-black text-5xl md:text-8xl tracking-tight leading-none text-white uppercase"
        >
          LIQUID SUNSHINE.<br />
          <span className="bg-linear-to-r from-citrus-orange via-white to-leaf-green bg-clip-text text-transparent">
            COLD-PRESSED
          </span> DAILY.
        </motion.h1>

        {/* Short Editorial Blurb */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-gray-400 max-w-xl text-base md:text-lg leading-relaxed mt-8 font-light"
        >
          Pure, living nutrients extracted without heat, pasteurization, or added sugar. Custom formulated to align your body's biology with high-impact flavor profiles.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-4 mt-12 w-full sm:w-auto"
        >
          <a href="#products" className="btn-primary btn-orange px-8 py-4 text-sm font-semibold tracking-wider w-full sm:w-auto">
            SHOP THE HARVEST
            <ArrowDown className="w-4 h-4 animate-bounce" />
          </a>
          <button
            onClick={onOpenMatchmaker}
            className="btn-primary btn-outline px-8 py-4 text-sm font-semibold tracking-wider flex items-center justify-center gap-2 w-full sm:w-auto cursor-pointer"
          >
            <Sparkles className="w-4 h-4 text-leaf-green" />
            AI FLAVOR FINDER
          </button>
        </motion.div>
      </div>
    </section>
  );
}
