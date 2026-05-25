import ProductCard from './ProductCard';
import { products } from '../data/products';

export default function ProductGrid() {
  return (
    <section id="products" className="py-24 px-6 md:px-12 max-w-7xl mx-auto relative">

      {/* Header section with clean design */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 relative z-10">
        <div>
          <span className="text-[10px] font-mono tracking-[0.3em] text-citrus-orange uppercase">
            Product Catalog
          </span>
          <h2 className="font-display font-black text-3xl md:text-5xl text-white uppercase tracking-tight mt-2">
            The Daily Harvest
          </h2>
        </div>
        <p className="text-gray-400 font-light max-w-md text-sm leading-relaxed mt-4 md:mt-0">
          Curated botanical elixirs, hydraulically pressed in small batches. Tap a card to configure purchase quantities.
        </p>
      </div>

      {/* Grid wrapper */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {/* Technical specifications callout */}
      <div id="philosophy" className="mt-32 p-8 md:p-12 rounded-3xl bg-white/1 border border-white/5 flex flex-col md:flex-row gap-8 items-center justify-between relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[400px] h-[400px] rounded-full blur-[120px] bg-linear-to-tr from-leaf-green/5 to-transparent z-0 pointer-events-none" />
        <div className="z-10 max-w-lg">
          <span className="text-[10px] font-mono tracking-[0.3em] text-leaf-green uppercase">Specs & Standards</span>
          <h3 className="font-display font-bold text-2xl text-white uppercase tracking-tight mt-2">
            Engineered for Vitality
          </h3>
          <p className="text-xs text-gray-400 font-light mt-3 leading-relaxed">
            Every bottle is pressed using 15,000 lbs of hydraulic force. We operate in a custom nitrogen-infused clean room to prevent oxidation, lock in high-activity enzymes, and keep vitamins stable for up to 5 days without high-pressure processing (HPP).
          </p>
        </div>
        <div className="grid grid-cols-2 gap-4 w-full md:w-auto z-10 shrink-0">
          {[
            { label: 'Pressure', val: '15k PSI' },
            { label: 'Added Sugars', val: '0.00g' },
            { label: 'Oxidation Rate', val: '≈0.01%' },
            { label: 'Cellular Yield', val: '99.4%' },
          ].map((spec) => (
            <div key={spec.label} className="p-4 rounded-xl border border-white/5 bg-black/40">
              <span className="block text-[8px] font-mono tracking-widest text-gray-500 uppercase">{spec.label}</span>
              <span className="block font-mono text-lg font-bold text-white mt-1">{spec.val}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
