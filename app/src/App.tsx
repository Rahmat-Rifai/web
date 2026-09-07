import { useEffect, useRef, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

import Header from './components/Header';
import MenuOverlay from './components/MenuOverlay';
import CustomCursor from './components/CustomCursor';
import ScrollProgress from './components/ScrollProgress';
import HeroScene from './components/HeroScene';
import ProjectsSection from './components/ProjectsSection';
import AboutSection from './components/AboutSection';
import Footer from './components/Footer';
import LoadingScreen from './components/LoadingScreen';

gsap.registerPlugin(ScrollTrigger);

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const mainRef = useRef<HTMLDivElement>(null);
  const lenisRef = useRef<Lenis | null>(null);

  // Initialize Lenis smooth scroll
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
    });

    lenisRef.current = lenis;

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    // Connect Lenis to GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
    };
  }, []);

  // Handle loading completion
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  // Initialize scroll animations after loading
  useEffect(() => {
    if (!isLoading) {
      // Refresh ScrollTrigger after content loads
      ScrollTrigger.refresh();
    }
  }, [isLoading]);

  return (
    <>
      {/* Loading Screen */}
      <LoadingScreen isLoading={isLoading} />

      {/* Custom Cursor */}
      <CustomCursor />

      {/* Scroll Progress */}
      <ScrollProgress />

      {/* Header */}
      <Header menuOpen={menuOpen} setMenuOpen={setMenuOpen} />

      {/* Menu Overlay */}
      <MenuOverlay isOpen={menuOpen} onClose={() => setMenuOpen(false)} />

      {/* Main Content */}
      <main
        ref={mainRef}
        className={`relative transition-opacity duration-500 ${
          isLoading ? 'opacity-0' : 'opacity-100'
        }`}
      >
        {/* Hero Section */}
        <section className="relative h-screen w-full bg-[#f2f2f2] overflow-hidden">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-[80vw] h-[60vh] max-w-[1200px]">
              <Canvas
                camera={{ position: [0, 0, 8], fov: 45 }}
                dpr={[1, 2]}
                gl={{ antialias: true, alpha: true }}
              >
                <HeroScene />
              </Canvas>
            </div>
          </div>

          {/* Hero Footer */}
          <div className="absolute bottom-0 left-0 right-0 h-16 flex items-center justify-between px-8 bg-[#f2f2f2]">
            <div className="flex items-center gap-2">
              <span className="text-xl font-light text-[#1a1a1a]">+</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xl font-light text-[#1a1a1a]">+</span>
            </div>
            <div className="flex items-center gap-2 text-sm tracking-wider text-[#666]">
              <span className="scroll-bounce">SCROLL TO EXPLORE</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xl font-light text-[#1a1a1a]">+</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xl font-light text-[#1a1a1a]">+</span>
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <ProjectsSection />

        {/* About Section */}
        <AboutSection />

        {/* Footer */}
        <Footer />
      </main>
    </>
  );
}

export default App;
