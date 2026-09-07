import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { X, ArrowUpRight } from 'lucide-react';

interface MenuOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

const menuItems = [
  { label: 'Home', href: '#' },
  { label: 'About', href: '#about' },
  { label: 'Projects', href: '#projects' },
  { label: 'Labs', href: '#labs' },
  { label: 'Contact', href: '#contact' },
];

export default function MenuOverlay({ isOpen, onClose }: MenuOverlayProps) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<(HTMLAnchorElement | null)[]>([]);

  useEffect(() => {
    if (isOpen) {
      // Animate overlay in
      gsap.fromTo(
        overlayRef.current,
        { opacity: 0, scale: 0.95 },
        { opacity: 1, scale: 1, duration: 0.5, ease: 'power3.out' }
      );

      // Animate menu items in with stagger
      gsap.fromTo(
        itemsRef.current.filter(Boolean),
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.5,
          stagger: 0.08,
          delay: 0.2,
          ease: 'power3.out',
        }
      );
    } else {
      // Animate overlay out
      gsap.to(overlayRef.current, {
        opacity: 0,
        scale: 0.95,
        duration: 0.3,
        ease: 'power3.in',
      });
    }
  }, [isOpen]);

  const handleItemClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    onClose();
    
    // Smooth scroll to section after menu closes
    setTimeout(() => {
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }, 300);
  };

  if (!isOpen) return null;

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[100] bg-[#0a0a0a] text-white"
    >
      {/* Close Button */}
      <button
        onClick={onClose}
        className="absolute top-6 right-6 lg:right-12 p-2 text-white hover:opacity-70 transition-opacity"
      >
        <X className="w-8 h-8" />
      </button>

      {/* Menu Content */}
      <div className="flex flex-col justify-center h-full px-8 lg:px-24">
        <nav className="space-y-4">
          {menuItems.map((item, index) => (
            <a
              key={item.label}
              ref={(el) => { itemsRef.current[index] = el; }}
              href={item.href}
              onClick={(e) => handleItemClick(e, item.href)}
              className="group flex items-center justify-between py-4 border-b border-white/10 hover:border-white/30 transition-colors"
            >
              <span className="text-5xl lg:text-7xl font-medium tracking-tight group-hover:translate-x-4 transition-transform duration-300">
                {item.label}
              </span>
              <ArrowUpRight className="w-8 h-8 opacity-0 group-hover:opacity-100 transform translate-x-4 group-hover:translate-x-0 transition-all duration-300" />
            </a>
          ))}
        </nav>

        {/* Footer Info */}
        <div className="absolute bottom-8 left-8 lg:left-24 right-8 lg:right-24">
          <div className="flex flex-col lg:flex-row justify-between gap-8 text-sm text-white/60">
            <div>
              <p className="mb-2">Get in touch</p>
              <a
                href="mailto:hello@lusion.co"
                className="text-white hover:underline"
              >
                hello@lusion.co
              </a>
            </div>
            <div className="flex gap-8">
              <a href="#" className="hover:text-white transition-colors">
                Twitter
              </a>
              <a href="#" className="hover:text-white transition-colors">
                Instagram
              </a>
              <a href="#" className="hover:text-white transition-colors">
                LinkedIn
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
