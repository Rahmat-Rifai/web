import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowDownRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface Project {
  id: number;
  title: string;
  tags: string[];
  image: string;
  color: string;
}

const projects: Project[] = [
  {
    id: 1,
    title: 'Devin AI',
    tags: ['concept', '3D illustration', 'mograph', 'video'],
    image: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=800&q=80',
    color: '#8B5CF6',
  },
  {
    id: 2,
    title: 'Porsche: Dream Machine',
    tags: ['web', 'design', 'development', '3d'],
    image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800&q=80',
    color: '#EF4444',
  },
  {
    id: 3,
    title: 'Synthetic Human',
    tags: ['web', 'design', 'development', '3d'],
    image: 'https://images.unsplash.com/photo-1531746790731-6c087fecd65a?w=800&q=80',
    color: '#10B981',
  },
  {
    id: 4,
    title: 'DDD 2024',
    tags: ['web', 'design', 'development', '3d', 'web3'],
    image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800&q=80',
    color: '#F59E0B',
  },
  {
    id: 5,
    title: 'Spaace - NFT Marketplace',
    tags: ['concept', 'web', 'game design', '3d'],
    image: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=800&q=80',
    color: '#EC4899',
  },
  {
    id: 6,
    title: 'Choo Choo World',
    tags: ['web', 'design', 'development', '3d'],
    image: 'https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?w=800&q=80',
    color: '#3B82F6',
  },
  {
    id: 7,
    title: 'Zero Tech',
    tags: ['web', 'design', 'development', '3d'],
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&q=80',
    color: '#06B6D4',
  },
  {
    id: 8,
    title: 'Meta: Spatial Fusion',
    tags: ['api design', 'webgl', '3d'],
    image: 'https://images.unsplash.com/photo-1617802690992-15d93263d3a9?w=800&q=80',
    color: '#6366F1',
  },
  {
    id: 9,
    title: 'Worldcoin Globe',
    tags: ['web', 'design', 'development', '3d'],
    image: 'https://images.unsplash.com/photo-1639322537228-f710d846310a?w=800&q=80',
    color: '#14B8A6',
  },
  {
    id: 10,
    title: 'Lusion Labs',
    tags: ['concept', 'design', 'development', '3d'],
    image: 'https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?w=800&q=80',
    color: '#8B5CF6',
  },
];

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (cardRef.current) {
      gsap.fromTo(
        cardRef.current,
        { y: 80, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: cardRef.current,
            start: 'top 90%',
            toggleActions: 'play none none reverse',
          },
          delay: (index % 2) * 0.15,
        }
      );
    }
  }, [index]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current || !imageRef.current) return;
    
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    
    gsap.to(imageRef.current, {
      x: x * 20,
      y: y * 20,
      duration: 0.5,
      ease: 'power2.out',
    });
  };

  const handleMouseLeave = () => {
    if (!imageRef.current) return;
    
    gsap.to(imageRef.current, {
      x: 0,
      y: 0,
      duration: 0.5,
      ease: 'power2.out',
    });
  };

  return (
    <div
      ref={cardRef}
      className="project-card group relative cursor-pointer"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-[#e5e5e5]">
        <img
          ref={imageRef}
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover scale-110"
        />
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        
        {/* Project info on hover */}
        <div className="absolute inset-0 flex flex-col justify-end p-6">
          <div className="transform translate-y-8 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
            <h3 className="text-white text-2xl font-medium mb-3">
              {project.title}
            </h3>
            <div className="flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs text-white/90 bg-white/20 backdrop-blur-sm px-3 py-1.5 rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Corner accent */}
        <div 
          className="absolute top-4 right-4 w-3 h-3 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{ backgroundColor: project.color }}
        />
      </div>
      
      {/* Title below card */}
      <div className="mt-5 flex items-start justify-between">
        <div>
          <h3 className="text-lg font-medium text-[#1a1a1a] group-hover:text-[#0066ff] transition-colors duration-300">
            {project.title}
          </h3>
          <p className="text-sm text-[#888] mt-1.5">
            {project.tags.slice(0, 3).join(' • ')}
          </p>
        </div>
        <div className="w-10 h-10 rounded-full border border-[#e5e5e5] flex items-center justify-center group-hover:bg-[#1a1a1a] group-hover:border-[#1a1a1a] transition-all duration-300">
          <ArrowDownRight className="w-4 h-4 text-[#999] group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300" />
        </div>
      </div>
    </div>
  );
}

export default function ProjectsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const countRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Animate heading with clip-path
    if (headingRef.current) {
      gsap.fromTo(
        headingRef.current,
        { clipPath: 'inset(0 100% 0 0)' },
        {
          clipPath: 'inset(0 0% 0 0)',
          duration: 1.5,
          ease: 'power4.inOut',
          scrollTrigger: {
            trigger: headingRef.current,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }

    // Animate count
    if (countRef.current) {
      gsap.fromTo(
        countRef.current,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: countRef.current,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
          delay: 0.5,
        }
      );
    }
  }, []);

  return (
    <section
      ref={sectionRef}
      id="projects"
      className="relative py-32 lg:py-40 bg-[#f2f2f2]"
    >
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        {/* Section Header */}
        <div className="flex items-end justify-between mb-20">
          <div ref={headingRef} className="overflow-hidden">
            <h2 className="text-[70px] md:text-[100px] lg:text-[150px] font-medium tracking-[-0.04em] text-[#1a1a1a] leading-[0.85]">
              PROJECTS
            </h2>
          </div>
          
          <div ref={countRef} className="flex items-center gap-3 mb-6">
            <span className="text-5xl lg:text-6xl font-medium text-[#1a1a1a]">
              {projects.length.toString().padStart(2, '0')}
            </span>
            <ArrowDownRight className="w-8 h-8 text-[#1a1a1a]" />
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-14">
          {projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>

        {/* View All Link */}
        <div className="mt-24 text-center">
          <a
            href="#"
            className="inline-flex items-center gap-3 px-8 py-4 bg-[#1a1a1a] text-white rounded-full font-medium hover:bg-[#0066ff] transition-colors duration-300 group"
          >
            <span>View all projects</span>
            <ArrowDownRight className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
          </a>
        </div>
      </div>
    </section>
  );
}
