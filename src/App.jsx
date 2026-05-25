import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ProductGrid from './components/ProductGrid';
import CartDrawer from './components/CartDrawer';
import FlavorMatchmaker from './components/FlavorMatchmaker';
import About from './components/About';
import Checkout from './components/Checkout';
import Footer from './components/Footer';
import HomeAbout from './components/HomeAbout';

// Layout wrapper to inject Navbar and Footer on target pages
function Layout({ onOpenMatchmaker, children }) {
  return (
    <div className="min-h-screen bg-abyss flex flex-col relative select-none">
      <Navbar onOpenMatchmaker={onOpenMatchmaker} />
      <main className="flex-1">
        {children}
      </main>
      <Footer />
    </div>
  );
}

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function MainApp() {
  const [isMatchmakerOpen, setIsMatchmakerOpen] = useState(false);

  return (
    <>
      <ScrollToTop />
      <Routes>
        {/* Landing Home Route */}
        <Route
          path="/"
          element={
            <Layout onOpenMatchmaker={() => setIsMatchmakerOpen(true)}>
              <Hero onOpenMatchmaker={() => setIsMatchmakerOpen(true)} />
              <ProductGrid />
              <HomeAbout />
            </Layout>
          }
        />

        {/* About Editorial Route */}
        <Route
          path="/about"
          element={
            <Layout onOpenMatchmaker={() => setIsMatchmakerOpen(true)}>
              <About />
            </Layout>
          }
        />

        {/* Distraction-free Checkout Route */}
        <Route path="/checkout" element={<Checkout />} />
      </Routes>

      {/* Global floating cart drawer and matchmaker modal */}
      <CartDrawer />
      <FlavorMatchmaker
        isOpen={isMatchmakerOpen}
        onClose={() => setIsMatchmakerOpen(false)}
      />
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <CartProvider>
        <MainApp />
      </CartProvider>
    </BrowserRouter>
  );
}
