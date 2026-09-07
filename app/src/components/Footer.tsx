import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Twitter, Instagram, Linkedin, Heart } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null);
  const [email, setEmail] = useState('');
  const [currentTime, setCurrentTime] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(
        now.toLocaleTimeString('en-US', {
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: false,
        })
      );
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (footerRef.current) {
      const elements = footerRef.current.querySelectorAll('.footer-animate');
      
      gsap.fromTo(
        elements,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: footerRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle newsletter subscription
    alert(`Thank you for subscribing with: ${email}`);
    setEmail('');
  };

  return (
    <footer
      ref={footerRef}
      id="contact"
      className="relative bg-[#0a0a0a] text-white py-16 lg:py-24"
    >
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        {/* CTA Section */}
        <div className="footer-animate mb-20">
          <p className="text-sm text-white/50 mb-4">Is Your Big Idea Ready to Go Wild?</p>
          <h2 className="text-4xl lg:text-6xl font-medium tracking-tight mb-8">
            Let's work
            <br />
            together!
          </h2>
          <a
            href="mailto:business@lusion.co"
            className="inline-flex items-center gap-3 px-8 py-4 bg-white text-[#0a0a0a] rounded-full font-medium hover:bg-[#0066ff] hover:text-white transition-colors group"
          >
            <span>Get in touch</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </a>
        </div>

        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 py-12 border-t border-white/10">
          {/* Brand */}
          <div className="footer-animate">
            <h3 className="text-2xl font-semibold mb-4">LUSION</h3>
            <p className="text-sm text-white/60 leading-relaxed">
              Suite 2
              <br />
              9 Marsh Street
              <br />
              Bristol, BS1 4AA
              <br />
              United Kingdom
            </p>
          </div>

          {/* Social Links */}
          <div className="footer-animate">
            <h4 className="text-sm font-medium text-white/50 mb-4 uppercase tracking-wider">
              Follow
            </h4>
            <div className="space-y-3">
              <a
                href="#"
                className="flex items-center gap-2 text-white/80 hover:text-white transition-colors group"
              >
                <Twitter className="w-4 h-4" />
                <span className="link-underline">Twitter / X</span>
              </a>
              <a
                href="#"
                className="flex items-center gap-2 text-white/80 hover:text-white transition-colors group"
              >
                <Instagram className="w-4 h-4" />
                <span className="link-underline">Instagram</span>
              </a>
              <a
                href="#"
                className="flex items-center gap-2 text-white/80 hover:text-white transition-colors group"
              >
                <Linkedin className="w-4 h-4" />
                <span className="link-underline">LinkedIn</span>
              </a>
            </div>
          </div>

          {/* Contact */}
          <div className="footer-animate">
            <h4 className="text-sm font-medium text-white/50 mb-4 uppercase tracking-wider">
              Contact
            </h4>
            <div className="space-y-3">
              <div>
                <p className="text-xs text-white/40 mb-1">General enquiries</p>
                <a
                  href="mailto:hello@lusion.co"
                  className="text-white/80 hover:text-white transition-colors link-underline"
                >
                  hello@lusion.co
                </a>
              </div>
              <div>
                <p className="text-xs text-white/40 mb-1">New business</p>
                <a
                  href="mailto:business@lusion.co"
                  className="text-white/80 hover:text-white transition-colors link-underline"
                >
                  business@lusion.co
                </a>
              </div>
            </div>
          </div>

          {/* Newsletter */}
          <div className="footer-animate">
            <h4 className="text-sm font-medium text-white/50 mb-4 uppercase tracking-wider">
              Newsletter
            </h4>
            <p className="text-xs text-white/40 mb-3">
              Subscribe (you may opt out anytime)
            </p>
            <form onSubmit={handleSubmit} className="relative">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="EMAIL ADDRESS"
                className="w-full bg-transparent border border-white/20 rounded-full px-4 py-3 text-sm text-white placeholder:text-white/40 focus:outline-none focus:border-white/50 transition-colors"
                required
              />
              <button
                type="submit"
                className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-white text-[#0a0a0a] rounded-full flex items-center justify-center hover:bg-[#0066ff] hover:text-white transition-colors"
              >
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="footer-animate flex flex-col lg:flex-row items-center justify-between gap-6 pt-8 border-t border-white/10">
          <div className="flex items-center gap-8 text-sm text-white/40">
            <span>©2025 LUSION Creative Studio</span>
            <a
              href="https://labs.lusion.co"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors"
            >
              R&D: labs.lusion.co
            </a>
          </div>

          <div className="flex items-center gap-2 text-sm text-white/40">
            <span>Built by Lusion with</span>
            <Heart className="w-4 h-4 text-red-500 fill-red-500" />
          </div>

          <div className="flex items-center gap-4">
            <span className="text-sm text-white/60 font-mono">{currentTime}</span>
            <span className="px-3 py-1 bg-white/10 rounded-full text-xs text-white/60">
              GOOD AFTERNOON
            </span>
            <div className="w-8 h-8 border border-white/20 rounded flex items-center justify-center">
              <span className="text-lg font-bold">L</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
