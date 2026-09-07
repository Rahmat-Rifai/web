import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

interface LoadingScreenProps {
  isLoading: boolean;
}

export default function LoadingScreen({ isLoading }: LoadingScreenProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const progressTextRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Animate progress
    const duration = 1800;
    const startTime = Date.now();
    
    const updateProgress = () => {
      const elapsed = Date.now() - startTime;
      const newProgress = Math.min((elapsed / duration) * 100, 100);
      setProgress(Math.floor(newProgress));
      
      if (newProgress < 100) {
        requestAnimationFrame(updateProgress);
      }
    };
    
    requestAnimationFrame(updateProgress);

    // Animate logo
    if (logoRef.current) {
      gsap.to(logoRef.current, {
        opacity: 0.4,
        duration: 0.6,
        repeat: -1,
        yoyo: true,
        ease: 'power1.inOut',
      });
    }

    // Animate progress bar
    if (progressBarRef.current) {
      gsap.to(progressBarRef.current, {
        width: '100%',
        duration: 1.8,
        ease: 'power2.inOut',
      });
    }
  }, []);

  useEffect(() => {
    if (!isLoading && containerRef.current) {
      // Exit animation
      const tl = gsap.timeline();
      
      tl.to(containerRef.current, {
        yPercent: -100,
        duration: 0.8,
        ease: 'power3.inOut',
        delay: 0.1,
      });
    }
  }, [isLoading]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[200] bg-[#f2f2f2] flex flex-col items-center justify-center"
    >
      {/* Logo */}
      <div
        ref={logoRef}
        className="text-4xl font-semibold tracking-tight text-[#1a1a1a] mb-12"
      >
        LUSION
      </div>

      {/* Progress Bar Container */}
      <div className="w-56 h-[3px] bg-[#1a1a1a]/10 rounded-full overflow-hidden mb-6">
        <div
          ref={progressBarRef}
          className="h-full bg-[#1a1a1a] w-0"
        />
      </div>

      {/* Progress Text */}
      <div
        ref={progressTextRef}
        className="flex items-center gap-4 text-xs text-[#666] tracking-wider"
      >
        <span>LOADING EXPERIENCE</span>
        <span className="font-mono">{progress}%</span>
      </div>

      {/* Decorative Elements */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex items-center gap-8 text-[#999]">
        <span className="text-xs tracking-widest">CREATIVE STUDIO</span>
        <span className="w-1 h-1 bg-[#999] rounded-full" />
        <span className="text-xs tracking-widest">BRISTOL, UK</span>
      </div>
    </div>
  );
}
