import { useEffect, useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import * as THREE from 'three';

gsap.registerPlugin(ScrollTrigger);

// Particle system for about section
function ParticleField() {
  const pointsRef = useRef<THREE.Points>(null);
  const particleCount = 300;

  const [positions, colors] = useMemo(() => {
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount; i++) {
      // Create a tunnel/warp effect
      const angle = Math.random() * Math.PI * 2;
      const radius = Math.random() * 8 + 2;
      const z = (Math.random() - 0.5) * 20;

      positions[i * 3] = Math.cos(angle) * radius;
      positions[i * 3 + 1] = Math.sin(angle) * radius;
      positions[i * 3 + 2] = z;

      // Neon colors: pink, cyan, blue, purple
      const colorChoice = Math.random();
      if (colorChoice < 0.25) {
        colors[i * 3] = 1;
        colors[i * 3 + 1] = 0.2;
        colors[i * 3 + 2] = 0.6;
      } else if (colorChoice < 0.5) {
        colors[i * 3] = 0;
        colors[i * 3 + 1] = 0.9;
        colors[i * 3 + 2] = 1;
      } else if (colorChoice < 0.75) {
        colors[i * 3] = 0.3;
        colors[i * 3 + 1] = 0.3;
        colors[i * 3 + 2] = 1;
      } else {
        colors[i * 3] = 0.9;
        colors[i * 3 + 1] = 0.2;
        colors[i * 3 + 2] = 1;
      }
    }

    return [positions, colors];
  }, []);

  useFrame((state) => {
    if (pointsRef.current) {
      const time = state.clock.elapsedTime;
      
      // Rotate the entire particle system
      pointsRef.current.rotation.z = time * 0.05;
      
      // Update individual particle positions for warp effect
      const positionArray = pointsRef.current.geometry.attributes.position.array as Float32Array;
      
      for (let i = 0; i < particleCount; i++) {
        // Move particles toward camera (increase z)
        positionArray[i * 3 + 2] += 0.05;
        
        // Reset particles that pass the camera
        if (positionArray[i * 3 + 2] > 10) {
          positionArray[i * 3 + 2] = -10;
        }
      }
      
      pointsRef.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
        <bufferAttribute
          attach="attributes-color"
          args={[colors, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.06}
        vertexColors
        transparent
        opacity={0.9}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

// Speed lines for warp effect
function SpeedLines() {
  const linesRef = useRef<THREE.LineSegments>(null);
  const lineCount = 100;

  const positions = useMemo(() => {
    const positions = new Float32Array(lineCount * 6); // 2 points per line, 3 coordinates each

    for (let i = 0; i < lineCount; i++) {
      const angle = Math.random() * Math.PI * 2;
      const radius = Math.random() * 6 + 1;
      
      const x1 = Math.cos(angle) * radius;
      const y1 = Math.sin(angle) * radius;
      const z1 = -10;
      
      const x2 = x1 * 3;
      const y2 = y1 * 3;
      const z2 = 10;

      positions[i * 6] = x1;
      positions[i * 6 + 1] = y1;
      positions[i * 6 + 2] = z1;
      positions[i * 6 + 3] = x2;
      positions[i * 6 + 4] = y2;
      positions[i * 6 + 5] = z2;
    }

    return positions;
  }, []);

  useFrame((state) => {
    if (linesRef.current) {
      const time = state.clock.elapsedTime;
      linesRef.current.rotation.z = time * 0.02;
    }
  });

  return (
    <lineSegments ref={linesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <lineBasicMaterial color="#ff00cc" transparent opacity={0.1} blending={THREE.AdditiveBlending} />
    </lineSegments>
  );
}

function Scene() {
  return (
    <>
      <ambientLight intensity={0.3} />
      <ParticleField />
      <SpeedLines />
    </>
  );
}

export default function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Animate content
    if (contentRef.current) {
      const elements = contentRef.current.querySelectorAll('.animate-item');
      
      gsap.fromTo(
        elements,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.12,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 50%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative min-h-screen bg-[#0a0a0a] overflow-hidden"
    >
      {/* WebGL Background */}
      <div className="absolute inset-0">
        <Canvas
          camera={{ position: [0, 0, 8], fov: 60 }}
          dpr={[1, 1.5]}
          gl={{ antialias: true, alpha: true }}
        >
          <Scene />
        </Canvas>
      </div>

      {/* Content */}
      <div
        ref={contentRef}
        className="relative z-10 min-h-screen flex flex-col items-center justify-center px-6 lg:px-12 py-24"
      >
        <div className="text-center max-w-4xl">
          <p className="animate-item text-sm tracking-[0.3em] text-white/40 mb-8">
            (WE ARE)
          </p>
          
          <h2 className="animate-item text-6xl lg:text-8xl font-medium text-white mb-8 tracking-tight">
            About Lusion
          </h2>
          
          <p className="animate-item text-2xl lg:text-3xl text-white/60 leading-relaxed font-light">
            The place where all real-time magic begins
          </p>

          <div className="animate-item mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
            <div className="p-8 border border-white/10 rounded-2xl hover:border-white/20 transition-colors duration-300">
              <h3 className="text-lg font-medium text-white mb-4">Discovery</h3>
              <ul className="space-y-3 text-sm text-white/50">
                <li className="flex items-center gap-2">
                  <span className="w-1 h-1 bg-[#0066ff] rounded-full" />
                  Technical Direction
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1 h-1 bg-[#0066ff] rounded-full" />
                  Research & Development
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1 h-1 bg-[#0066ff] rounded-full" />
                  Pipeline Discovery
                </li>
              </ul>
            </div>
            
            <div className="p-8 border border-white/10 rounded-2xl hover:border-white/20 transition-colors duration-300">
              <h3 className="text-lg font-medium text-white mb-4">Production</h3>
              <ul className="space-y-3 text-sm text-white/50">
                <li className="flex items-center gap-2">
                  <span className="w-1 h-1 bg-[#ff00cc] rounded-full" />
                  Web Development
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1 h-1 bg-[#ff00cc] rounded-full" />
                  Physical Installation
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1 h-1 bg-[#ff00cc] rounded-full" />
                  WebGL / Unity
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1 h-1 bg-[#ff00cc] rounded-full" />
                  VR / AR
                </li>
              </ul>
            </div>
            
            <div className="p-8 border border-white/10 rounded-2xl hover:border-white/20 transition-colors duration-300">
              <h3 className="text-lg font-medium text-white mb-4">3D Content</h3>
              <ul className="space-y-3 text-sm text-white/50">
                <li className="flex items-center gap-2">
                  <span className="w-1 h-1 bg-[#00d4ff] rounded-full" />
                  Procedural Animation
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1 h-1 bg-[#00d4ff] rounded-full" />
                  Asset Compositing
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1 h-1 bg-[#00d4ff] rounded-full" />
                  Asset Optimization
                </li>
              </ul>
            </div>
          </div>

          <div className="animate-item mt-20">
            <p className="text-white/40 max-w-2xl mx-auto leading-relaxed text-lg">
              Lusion is a real-time, development focussed, creative studio. 
              Founded by a creative technologist Edan Kwan in 2017. 
              We bridge the gap between abstract concept and immersive experience 
              by using the right technology.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
