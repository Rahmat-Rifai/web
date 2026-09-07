import { useEffect, useState, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MoreHorizontal } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface HeaderProps {
  menuOpen: boolean;
  setMenuOpen: (open: boolean) => void;
}

export default function Header({ menuOpen, setMenuOpen }: HeaderProps) {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Show/hide based on scroll direction
      if (currentScrollY > lastScrollY.current && currentScrollY > 200) {
        setHidden(true);
      } else {
        setHidden(false);
      }
      
      // Add background when scrolled
      setScrolled(currentScrollY > 100);
      
      lastScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (headerRef.current) {
      gsap.fromTo(
        headerRef.current,
        { y: -100, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, delay: 2.2, ease: 'power3.out' }
      );
    }
  }, []);

  return (
    <header
      ref={headerRef}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        hidden ? '-translate-y-full' : 'translate-y-0'
      } ${
        scrolled
          ? 'bg-[#f2f2f2]/90 backdrop-blur-lg shadow-sm'
          : 'bg-transparent'
      }`}
    >
      <div className="flex items-center justify-between h-20 px-6 lg:px-12">
        {/* Logo */}
        <div className="flex-shrink-0">
          <a
            href="#"
            className="text-xl font-semibold tracking-tight text-[#1a1a1a] hover:opacity-70 transition-opacity duration-300"
          >
            LUSION
          </a>
        </div>

        {/* Center Tagline */}
        <div className="hidden md:flex flex-1 justify-center px-8">
          <p className="text-sm lg:text-base text-center text-[#1a1a1a] max-w-md leading-snug font-light">
            We build epic realtime
            <br />
            interactive experience to
            <br />
            blow people's minds
          </p>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3">
          {/* Let's Talk Button */}
          <button className="group relative px-5 py-2.5 bg-[#1a1a1a] text-white text-sm font-medium rounded-full overflow-hidden transition-transform duration-300 hover:scale-105">
            <span className="relative z-10 flex items-center gap-2">
              LET'S TALK
              <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" />
            </span>
            <span className="absolute inset-0 bg-[#0066ff] transform scale-x-0 origin-left transition-transform duration-300 group-hover:scale-x-100" />
          </button>

          {/* Menu Button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="flex items-center gap-2 px-4 py-2.5 border border-[#1a1a1a]/20 rounded-full text-sm font-medium text-[#1a1a1a] hover:bg-[#1a1a1a] hover:text-white hover:border-[#1a1a1a] transition-all duration-300"
          >
            <span>MENU</span>
            <MoreHorizontal className="w-4 h-4" />
          </button>
        </div>
      </div>
    </header>
  );
}
