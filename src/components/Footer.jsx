import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

export default function Footer() {
  const handleSubscribe = (e) => {
    e.preventDefault();
    alert('Thank you for subscribing to Sunsip newsletter!');
  };

  return (
    <footer className="border-t border-white/5 py-16 px-6 md:px-12 bg-abyss-deep mt-24">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8 mb-12">
        
        {/* Brand Column */}
        <div className="space-y-4">
          <Link to="/" className="flex items-center group">
            <img
              src="/Logo.svg"
              alt="Sunsip Logo"
              className="h-20 w-auto object-contain transition-transform duration-300 group-hover:scale-[1.03]"
            />
          </Link>
          <p className="text-xs text-gray-500 font-light leading-relaxed max-w-xs">
            Botanical elixirs, hydraulically pressed in small batches. Engineered to optimize cellular energy and clarity daily.
          </p>
        </div>

        {/* Links Column 1 */}
        <div className="space-y-4">
          <h4 className="text-[10px] font-mono tracking-[0.3em] text-gray-400 uppercase font-semibold">SHOP</h4>
          <ul className="space-y-2 text-xs text-gray-500 font-light">
            <li>
              <a href="/#products" className="hover:text-white transition-colors duration-200">
                Core Catalog
              </a>
            </li>
            <li>
              <Link to="/about" className="hover:text-white transition-colors duration-200">
                About Us
              </Link>
            </li>
            <li>
              <a href="#philosophy" className="hover:text-white transition-colors duration-200">
                Press Specs
              </a>
            </li>
          </ul>
        </div>

        {/* Links Column 2 */}
        <div className="space-y-4">
          <h4 className="text-[10px] font-mono tracking-[0.3em] text-gray-400 uppercase font-semibold">SUPPORT</h4>
          <ul className="space-y-2 text-xs text-gray-500 font-light">
            <li>
              <button onClick={() => alert('FAQs coming soon!')} className="hover:text-white transition-colors duration-200 text-left bg-transparent border-none cursor-pointer p-0">
                FAQ & Help
              </button>
            </li>
            <li>
              <button onClick={() => alert('Order tracking coming soon!')} className="hover:text-white transition-colors duration-200 text-left bg-transparent border-none cursor-pointer p-0">
                Track Order
              </button>
            </li>
            <li>
              <button onClick={() => alert('Contact team: contact@sunsip.co')} className="hover:text-white transition-colors duration-200 text-left bg-transparent border-none cursor-pointer p-0">
                Contact Us
              </button>
            </li>
          </ul>
        </div>

        {/* Newsletter Column */}
        <div className="space-y-4">
          <h4 className="text-[10px] font-mono tracking-[0.3em] text-gray-400 uppercase font-semibold">NEWSLETTER</h4>
          <p className="text-xs text-gray-500 font-light leading-relaxed">
            Subscribe to receive fresh batch announcements and wellness research.
          </p>
          <form onSubmit={handleSubscribe} className="relative flex items-center max-w-sm">
            <input
              type="email"
              required
              placeholder="Enter email address"
              className="w-full bg-white/2 border border-white/10 rounded-full py-2.5 pl-4 pr-10 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-citrus-orange transition-colors"
            />
            <button
              type="submit"
              className="absolute right-1 p-1.5 rounded-full bg-citrus-orange text-white hover:bg-citrus-light transition-colors cursor-pointer"
              aria-label="Subscribe"
            >
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </form>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="max-w-7xl mx-auto pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
        <p className="text-gray-500 text-[10px] font-mono tracking-wider uppercase">
          © 2026 Sunsip. All rights reserved.
        </p>

        {/* Social Placeholders */}
        <div className="flex gap-4">
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-full border border-white/5 bg-white/2 hover:bg-white/5 hover:text-white text-gray-400 transition-colors"
            aria-label="Instagram"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
              <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
              <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
            </svg>
          </a>
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-full border border-white/5 bg-white/2 hover:bg-white/5 hover:text-white text-gray-400 transition-colors"
            aria-label="Twitter"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
            </svg>
          </a>
          <a
            href="https://youtube.com"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-full border border-white/5 bg-white/2 hover:bg-white/5 hover:text-white text-gray-400 transition-colors"
            aria-label="YouTube"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"></path>
              <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon>
            </svg>
          </a>
        </div>
      </div>
    </footer>
  );
}
