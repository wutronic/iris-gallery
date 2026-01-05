
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GALLERY_ITEMS } from './constants';
import { GalleryState } from './types';
import GalleryItem from './components/GalleryItem';

const App: React.FC = () => {
  const [galleryState, setGalleryState] = useState<GalleryState>({
    hoveredIndex: null,
  });
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });

  const handleHover = (index: number | null) => {
    setGalleryState({ hoveredIndex: index });
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setCursorPos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="min-h-screen bg-[#0a0a0c] selection:bg-cyan-500/30">
      {/* Custom Global Cursor */}
      <motion.div 
        className="fixed top-0 left-0 w-8 h-8 rounded-full border border-white/30 pointer-events-none z-[100] flex items-center justify-center backdrop-blur-sm"
        animate={{ 
          x: cursorPos.x - 16, 
          y: cursorPos.y - 16,
          scale: galleryState.hoveredIndex !== null ? 2 : 1,
          backgroundColor: galleryState.hoveredIndex !== null ? 'rgba(255,255,255,0.05)' : 'rgba(255,255,255,0)'
        }}
        transition={{ type: 'spring', damping: 30, stiffness: 250, mass: 0.5 }}
      >
        <div className="w-1 h-1 bg-white rounded-full" />
      </motion.div>

      {/* Header */}
      <header className="fixed top-0 left-0 w-full p-8 md:p-12 z-[60] flex justify-between items-start pointer-events-none">
        <div className="pointer-events-auto">
          <h1 className="font-syncopate text-lg md:text-2xl font-bold tracking-[-0.05em] leading-none mb-1">
            IRIS<span className="text-white/20">.</span>GALLERY
          </h1>
          <p className="text-[9px] uppercase tracking-[0.4em] text-white/40">Visual Artifacts Series 01</p>
        </div>

        <nav className="hidden md:flex flex-col items-end gap-2 pointer-events-auto">
          {['Archive', 'Studio', 'About'].map((link) => (
            <a key={link} href="#" className="text-[10px] uppercase tracking-widest text-white/50 hover:text-white transition-colors">
              {link}
            </a>
          ))}
        </nav>
      </header>

      {/* Main Content Area */}
      <main className="relative pt-48 pb-64 px-8 md:px-[15vw]">
        {/* Background Ambient Glows */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none opacity-20">
          <div className="absolute top-[20%] left-[10%] w-[40vw] h-[40vw] bg-violet-600/30 blur-[150px] rounded-full" />
          <div className="absolute bottom-[10%] right-[15%] w-[35vw] h-[35vw] bg-cyan-600/20 blur-[150px] rounded-full" />
        </div>

        {/* Gallery Stack */}
        <div className="flex flex-col items-center gap-16 md:gap-24 perspective-[2000px]">
          {GALLERY_ITEMS.map((item, idx) => (
            <GalleryItem
              key={item.id}
              item={item}
              index={idx}
              galleryState={galleryState}
              onHover={handleHover}
            />
          ))}
        </div>

        {/* Vertical Footer Indicator */}
        <div className="mt-32 text-center">
          <div className="w-px h-32 bg-gradient-to-b from-white/20 to-transparent mx-auto" />
          <p className="mt-8 font-syncopate text-[10px] uppercase tracking-[0.5em] text-white/20">End of Exhibition</p>
        </div>
      </main>

      {/* Decorative Fixed Elements */}
      <div className="fixed bottom-12 left-12 z-[60] hidden lg:block">
        <div className="font-syncopate text-[8px] tracking-[0.2em] text-white/30 rotate-[-90deg] origin-left">
          EST. 2025 // TOKYO // PARIS // NYC
        </div>
      </div>

      <div className="fixed bottom-12 right-12 z-[60] hidden lg:flex flex-col items-end gap-4">
        <div className="flex gap-4">
          <div className="w-8 h-[1px] bg-white/20 self-center" />
          <span className="text-[9px] uppercase tracking-[0.3em] text-white/40">Scroll to Explore</span>
        </div>
      </div>
    </div>
  );
};

export default App;
