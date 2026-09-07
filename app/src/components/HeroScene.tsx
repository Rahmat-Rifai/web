import { useRef, useMemo, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { Mesh, Group } from 'three';
import gsap from 'gsap';

// Cross-shaped geometry component
function CrossShape({
  position,
  rotation,
  scale,
  color,
  index,
}: {
  position: [number, number, number];
  rotation: [number, number, number];
  scale: number;
  color: string;
  index: number;
}) {
  const groupRef = useRef<Group>(null);
  const meshRefs = useRef<Mesh[]>([]);

  // Floating animation with different phases for each cross
  useFrame((state) => {
    if (groupRef.current) {
      const time = state.clock.elapsedTime;
      const phase = index * 0.5;
      
      // Gentle floating motion
      groupRef.current.position.y = position[1] + Math.sin(time * 0.4 + phase) * 0.12;
      
      // Slow rotation
      groupRef.current.rotation.x = rotation[0] + Math.sin(time * 0.2 + phase) * 0.03;
      groupRef.current.rotation.y = rotation[1] + time * 0.08 + phase;
      groupRef.current.rotation.z = rotation[2] + Math.cos(time * 0.15 + phase) * 0.02;
    }
  });

  return (
    <group ref={groupRef} position={position} rotation={rotation} scale={scale}>
      {/* Horizontal bar */}
      <mesh
        ref={(el) => {
          if (el) meshRefs.current[0] = el;
        }}
        position={[0, 0, 0]}
        castShadow
        receiveShadow
      >
        <cylinderGeometry args={[0.25, 0.25, 2.2, 32]} />
        <meshStandardMaterial
          color={color}
          roughness={0.2}
          metalness={0.3}
          envMapIntensity={1}
        />
      </mesh>
      {/* Vertical bar */}
      <mesh
        ref={(el) => {
          if (el) meshRefs.current[1] = el;
        }}
        position={[0, 0, 0]}
        rotation={[0, 0, Math.PI / 2]}
        castShadow
        receiveShadow
      >
        <cylinderGeometry args={[0.25, 0.25, 2.2, 32]} />
        <meshStandardMaterial
          color={color}
          roughness={0.2}
          metalness={0.3}
          envMapIntensity={1}
        />
      </mesh>
      {/* Depth bar (Z-axis) */}
      <mesh
        ref={(el) => {
          if (el) meshRefs.current[2] = el;
        }}
        position={[0, 0, 0]}
        rotation={[Math.PI / 2, 0, 0]}
        castShadow
        receiveShadow
      >
        <cylinderGeometry args={[0.25, 0.25, 2.2, 32]} />
        <meshStandardMaterial
          color={color}
          roughness={0.2}
          metalness={0.3}
          envMapIntensity={1}
        />
      </mesh>
      {/* Center sphere */}
      <mesh castShadow receiveShadow>
        <sphereGeometry args={[0.38, 32, 32]} />
        <meshStandardMaterial
          color={color}
          roughness={0.15}
          metalness={0.4}
          envMapIntensity={1.2}
        />
      </mesh>
    </group>
  );
}

export default function HeroScene() {
  const groupRef = useRef<Group>(null);
  const { mouse } = useThree();

  // Define cross shapes with their properties
  const crosses = useMemo(
    () => [
      {
        position: [-2.2, 0.3, 0.5] as [number, number, number],
        rotation: [0.3, 0.5, 0] as [number, number, number],
        scale: 0.85,
        color: '#0066ff', // Blue
      },
      {
        position: [2.3, -0.4, 0.8] as [number, number, number],
        rotation: [0.2, -0.3, 0.4] as [number, number, number],
        scale: 0.95,
        color: '#1a1a1a', // Black
      },
      {
        position: [0, 1.2, -0.3] as [number, number, number],
        rotation: [-0.2, 0.8, 0.2] as [number, number, number],
        scale: 0.75,
        color: '#ffffff', // White
      },
      {
        position: [-1.8, -0.9, 0.5] as [number, number, number],
        rotation: [0.4, -0.5, -0.3] as [number, number, number],
        scale: 0.65,
        color: '#0066ff', // Blue
      },
      {
        position: [1.7, 0.9, -0.2] as [number, number, number],
        rotation: [-0.3, 0.2, 0.5] as [number, number, number],
        scale: 0.8,
        color: '#ffffff', // White
      },
      {
        position: [0.2, -1.1, 0.4] as [number, number, number],
        rotation: [0.5, 0, -0.2] as [number, number, number],
        scale: 0.7,
        color: '#1a1a1a', // Black
      },
      {
        position: [-0.9, 0.4, 1] as [number, number, number],
        rotation: [0.1, 0.6, 0.3] as [number, number, number],
        scale: 0.55,
        color: '#0066ff', // Blue
      },
      {
        position: [0.9, -0.7, -0.4] as [number, number, number],
        rotation: [-0.4, -0.2, 0.4] as [number, number, number],
        scale: 0.6,
        color: '#ffffff', // White
      },
    ],
    []
  );

  // Mouse parallax effect with smooth interpolation
  useFrame(() => {
    if (groupRef.current) {
      const targetX = mouse.x * 0.25;
      const targetY = mouse.y * 0.25;
      
      groupRef.current.rotation.x = gsap.utils.interpolate(
        groupRef.current.rotation.x,
        targetY * 0.08,
        0.04
      );
      groupRef.current.rotation.y = gsap.utils.interpolate(
        groupRef.current.rotation.y,
        targetX * 0.08,
        0.04
      );
    }
  });

  // Entrance animation
  useEffect(() => {
    if (groupRef.current) {
      // Start with scale 0
      groupRef.current.scale.set(0, 0, 0);
      
      // Animate to full scale with elastic effect
      gsap.to(groupRef.current.scale, {
        x: 1,
        y: 1,
        z: 1,
        duration: 1.8,
        delay: 2.1,
        ease: 'elastic.out(1, 0.6)',
      });

      // Subtle continuous rotation
      gsap.to(groupRef.current.rotation, {
        y: Math.PI * 2,
        duration: 120,
        repeat: -1,
        ease: 'none',
      });
    }
  }, []);

  return (
    <>
      {/* Lighting */}
      <ambientLight intensity={0.5} />
      
      {/* Main directional light */}
      <directionalLight 
        position={[5, 8, 5]} 
        intensity={1.2} 
        castShadow 
        shadow-mapSize={[1024, 1024]}
      />
      
      {/* Fill light from opposite side */}
      <directionalLight 
        position={[-5, -3, -5]} 
        intensity={0.4} 
        color="#0066ff"
      />
      
      {/* Rim light for definition */}
      <pointLight 
        position={[0, 5, -5]} 
        intensity={0.6}
        color="#ffffff"
      />
      
      {/* Bottom fill */}
      <pointLight 
        position={[0, -5, 3]} 
        intensity={0.3}
        color="#0066ff"
      />

      {/* Cross shapes group */}
      <group ref={groupRef}>
        {crosses.map((cross, index) => (
          <CrossShape
            key={index}
            position={cross.position}
            rotation={cross.rotation}
            scale={cross.scale}
            color={cross.color}
            index={index}
          />
        ))}
      </group>
    </>
  );
}
