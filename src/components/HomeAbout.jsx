import { Link } from 'react-router-dom';
import { Sparkles, ArrowRight } from 'lucide-react';

export default function HomeAbout() {
  return (
    <section className="py-24 px-6 md:px-12 max-w-7xl mx-auto border-t border-white/5 relative overflow-hidden">
      {/* Background radial glow */}
      <div className="absolute bottom-0 right-10 w-96 h-96 rounded-full bg-citrus-orange/5 blur-[120px] pointer-events-none" />
      
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
        
        {/* Left Column - Large Typography */}
        <div className="lg:col-span-7 space-y-6">
          <span className="text-[10px] font-mono tracking-[0.3em] text-citrus-orange uppercase font-semibold flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 animate-pulse" />
            Our Philosophy
          </span>
          <h2 className="font-display font-black text-3xl md:text-5xl text-white uppercase tracking-tight leading-none">
            Engineered for cellular alignment.<br />
            <span className="bg-linear-to-r from-leaf-green to-white bg-clip-text text-transparent">
              Cold-pressed daily.
            </span>
          </h2>
        </div>

        {/* Right Column - Narrative & CTA */}
        <div className="lg:col-span-5 space-y-8">
          <p className="text-gray-400 font-light text-sm leading-relaxed">
            We extract pure liquid nutrients using 15,000 lbs of hydraulic force. By avoiding blades and heat, we lock in active enzymes and vitamins in their rawest, most biological state. Dilution is not in our vocabulary.
          </p>
          <div className="pt-2">
            <Link
              to="/about"
              className="inline-flex items-center gap-2 btn-primary btn-outline text-xs tracking-widest font-semibold px-8 py-4 cursor-pointer"
            >
              <span>VIEW OUR STORY</span>
              <ArrowRight className="w-4 h-4 text-leaf-green" />
            </Link>
          </div>
        </div>

      </div>
    </section>
  );
}
