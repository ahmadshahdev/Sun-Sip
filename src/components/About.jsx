import { motion } from 'framer-motion';

export default function About() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: 'easeOut' } }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="min-h-screen bg-abyss text-gray-100 py-16 px-6 md:px-12 relative overflow-hidden"
    >
      {/* Decorative Grids and glows */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff02_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-size-[4rem_4rem] mask-[radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] z-0 pointer-events-none" />
      <div className="absolute top-[10%] left-[20%] w-[300px] h-[300px] rounded-full bg-citrus-orange/5 blur-[100px] pointer-events-none" />
      <div className="absolute bottom-[20%] right-[10%] w-[450px] h-[450px] rounded-full bg-leaf-green/5 blur-[120px] pointer-events-none" />

      <div className="max-w-5xl mx-auto relative z-10 space-y-32">
        {/* HERO SECTION */}
        <motion.div variants={itemVariants} className="text-center pt-12 space-y-6">
          <span className="text-[10px] font-mono tracking-[0.3em] text-citrus-orange uppercase font-semibold">
            THE SUNSIP DIARY
          </span>
          <h1 className="font-display font-black text-5xl md:text-8xl tracking-tight leading-none uppercase text-white">
            OUR ROOTS.<br />
            <span className="bg-linear-to-r from-leaf-green to-white bg-clip-text text-transparent">
              COLD-PRESSED.
            </span>
          </h1>
          <p className="text-gray-400 font-light max-w-xl mx-auto text-sm md:text-base leading-relaxed">
            We started Sunsip with a simple premise: your body deserves high-impact botanical fuel in its rawest, most bio-active state. No pasteurization. No compromises.
          </p>
        </motion.div>

        {/* NARRATIVE ROW 1: Sourcing (Text Left, Image Right) */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col md:flex-row gap-12 items-center"
        >
          <div className="flex-1 space-y-6">
            <span className="text-[9px] font-mono tracking-widest text-leaf-green uppercase">01 / BOTANICAL SOURCING</span>
            <h2 className="font-display font-bold text-3xl md:text-4xl text-white uppercase tracking-tight">
              Sourced from Organic Soils
            </h2>
            <p className="text-gray-400 font-light text-sm leading-relaxed">
              Every drop of Sunsip begins in certified biodynamic orchards and farms. We harvest citrus fruits at the absolute peak of sugar balance, and select deep leafy greens while the dew is still on the leaf. 
            </p>
            <p className="text-gray-400 font-light text-sm leading-relaxed">
              By working exclusively with growers who avoid synthetic chemical pesticides, we guarantee a raw extract that is clean down to the cellular level.
            </p>
          </div>
          <div className="flex-1 w-full relative">
            <div className="absolute inset-0 bg-linear-to-tr from-citrus-orange/10 to-transparent blur-xl opacity-30 rounded-3xl" />
            <img
              src="/organic_harvest.png"
              alt="Organic fruits and vegetables harvest"
              className="w-full h-80 object-cover rounded-3xl border border-white/10 shadow-2xl glass-card relative z-10"
            />
          </div>
        </motion.div>

        {/* NARRATIVE ROW 2: The Process (Image Left, Text Right) */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col md:flex-row-reverse gap-12 items-center"
        >
          <div className="flex-1 space-y-6">
            <span className="text-[9px] font-mono tracking-widest text-citrus-orange uppercase">02 / HYDRAULIC EXTRACTION</span>
            <h2 className="font-display font-bold text-3xl md:text-4xl text-white uppercase tracking-tight">
              15,000 lbs of Pure Force
            </h2>
            <p className="text-gray-400 font-light text-sm leading-relaxed">
              Standard juicing machines use fast-spinning metal blades that generate heat and friction. This oxidizes key vitamins and kills live digestive enzymes within minutes.
            </p>
            <p className="text-gray-400 font-light text-sm leading-relaxed">
              At Sunsip, we extract liquid nutrients using steady hydraulic pressure. By squeezing the organic mash without blades or thermal pasteurization, we deliver living enzymes and vitamins intact, yielding a juice that tastes incredibly crisp.
            </p>
          </div>
          <div className="flex-1 w-full relative">
            <div className="absolute inset-0 bg-linear-to-tr from-leaf-green/10 to-transparent blur-xl opacity-30 rounded-3xl" />
            <img
              src="/cold_press_lab.png"
              alt="Hydraulic cold-press extraction equipment"
              className="w-full h-80 object-cover rounded-3xl border border-white/10 shadow-2xl glass-card relative z-10"
            />
          </div>
        </motion.div>

        {/* NARRATIVE ROW 3: Active Botanicals (Text Left, Image Right) */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col md:flex-row gap-12 items-center"
        >
          <div className="flex-1 space-y-6">
            <span className="text-[9px] font-mono tracking-widest text-leaf-green uppercase">03 / CELLULAR INTEGRITY</span>
            <h2 className="font-display font-bold text-3xl md:text-4xl text-white uppercase tracking-tight">
              Radical Transparency
            </h2>
            <p className="text-gray-400 font-light text-sm leading-relaxed">
              We believe in complete ingredient honesty. We never dilute our recipes with cheap filler juices like apple or pear, and we never add artificial sweeteners or preservation chemicals. 
            </p>
            <p className="text-gray-400 font-light text-sm leading-relaxed">
              Every single bottle of Sunsip features a batch-specific QR code. Scanning it displays the active enzyme analysis, vitamin counts, and sourcing coordinates for that specific harvest's batch.
            </p>
          </div>
          <div className="flex-1 w-full relative">
            <div className="absolute inset-0 bg-linear-to-tr from-citrus-orange/10 to-transparent blur-xl opacity-30 rounded-3xl" />
            <img
              src="/active_botanicals.png"
              alt="Active enzyme laboratory QR code analysis"
              className="w-full h-80 object-cover rounded-3xl border border-white/10 shadow-2xl glass-card relative z-10"
            />
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
