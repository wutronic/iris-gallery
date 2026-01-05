
import React from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { GalleryItemData, GalleryState } from '../types';
import IridescentOverlay from './IridescentOverlay';
import { THEME } from '../constants';

interface GalleryItemProps {
  item: GalleryItemData;
  index: number;
  galleryState: GalleryState;
  onHover: (index: number | null) => void;
}

const GalleryItem: React.FC<GalleryItemProps> = ({ item, index, galleryState, onHover }) => {
  const isHovered = galleryState.hoveredIndex === index;
  const isAdjacent = galleryState.hoveredIndex !== null && Math.abs(galleryState.hoveredIndex - index) === 1;

  // Mouse tracking for localized shimmer
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);

  const springConfig = { damping: 20, stiffness: 150 };
  const smoothMouseX = useSpring(mouseX, springConfig);
  const smoothMouseY = useSpring(mouseY, springConfig);

  // Dynamic transforms based on mouse position (subtle tilt)
  const rotateX = useTransform(smoothMouseY, [0, 1], [40, 50]);
  const rotateY = useTransform(smoothMouseX, [0, 1], [-5, 5]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left) / rect.width);
    mouseY.set((e.clientY - rect.top) / rect.height);
  };

  return (
    <motion.div
      className="relative w-full max-w-2xl mx-auto group cursor-none"
      onMouseMove={handleMouseMove}
      onMouseEnter={() => onHover(index)}
      onMouseLeave={() => onHover(null)}
      style={{
        zIndex: isHovered ? 50 : 20 - Math.abs((galleryState.hoveredIndex || 0) - index),
        perspective: '1200px',
      }}
      initial={false}
      animate={{
        y: isHovered ? -20 : isAdjacent ? 0 : 0,
        scale: isHovered ? 1.08 : isAdjacent ? 0.96 : 1,
        filter: isHovered ? 'brightness(1.1) saturate(1.1)' : isAdjacent ? 'brightness(0.7) grayscale(0.2)' : 'brightness(0.85) saturate(0.9)',
      }}
      transition={{
        duration: THEME.animations.popDuration,
        ease: THEME.animations.ease,
      }}
    >
      {/* Label - Vertical alignment for editorial feel */}
      <motion.div 
        className="absolute -left-12 top-0 h-full flex flex-col justify-center pointer-events-none origin-center"
        animate={{
          opacity: isHovered ? 1 : 0,
          x: isHovered ? 0 : -20,
        }}
      >
        <span className="font-syncopate text-[10px] uppercase tracking-[0.3em] rotate-[-90deg] whitespace-nowrap opacity-50">
          {item.category} — 0{index + 1}
        </span>
      </motion.div>

      <motion.div
        className="relative overflow-hidden rounded-xl bg-[#121216] border border-white/5"
        style={{
          // Isometric base state
          rotateX: isHovered ? 0 : 45,
          rotateZ: isHovered ? 0 : -15,
          transformStyle: 'preserve-3d',
          boxShadow: isHovered 
            ? `0 40px 80px rgba(0,0,0,0.8), 0 0 40px ${THEME.colors.cyan}33, 0 0 80px ${THEME.colors.magenta}22` 
            : `0 10px 30px rgba(0,0,0,0.4)`,
        }}
        animate={{
          rotateX: isHovered ? 0 : 45,
          rotateZ: isHovered ? 0 : -15,
          z: isHovered ? 100 : 0,
        }}
        transition={{
          type: 'spring',
          damping: 25,
          stiffness: 120,
        }}
      >
        <img 
          src={item.imageUrl} 
          alt={item.title}
          className="w-full aspect-[16/9] object-cover block select-none pointer-events-none"
        />
        
        {/* Shimmer Effect */}
        <IridescentOverlay isActive={isHovered} />

        {/* Edge Glow Overlay */}
        <motion.div 
          className="absolute inset-0 pointer-events-none border-[1px] border-white/10 rounded-xl"
          animate={{
            borderColor: isHovered ? 'rgba(255,255,255,0.4)' : 'rgba(255,255,255,0.05)',
            boxShadow: isHovered ? `inset 0 0 20px ${THEME.colors.cyan}44` : 'none'
          }}
        />

        {/* Content Overlay */}
        <motion.div 
          className="absolute bottom-0 left-0 p-8 w-full bg-gradient-to-t from-black/80 to-transparent flex justify-between items-end"
          animate={{
            opacity: isHovered ? 1 : 0,
            y: isHovered ? 0 : 20,
          }}
        >
          <div className="flex flex-col gap-1">
            <h3 className="font-syncopate text-xl font-bold tracking-tighter text-white">{item.title}</h3>
            <p className="text-[10px] text-white/50 tracking-widest uppercase">Collection v1.0</p>
          </div>
          <div className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center backdrop-blur-md group-hover:scale-110 transition-transform">
             <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7" />
             </svg>
          </div>
        </motion.div>
      </motion.div>

      {/* Floating reflection/shadow base */}
      {!isHovered && (
        <div 
          className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-[90%] h-4 bg-black/40 blur-xl rounded-[100%] opacity-50"
          style={{ transform: 'rotateX(45deg) scale(1.2)' }}
        />
      )}
    </motion.div>
  );
};

export default GalleryItem;
