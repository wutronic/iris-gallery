
import React from 'react';

interface IridescentOverlayProps {
  isActive: boolean;
}

const IridescentOverlay: React.FC<IridescentOverlayProps> = ({ isActive }) => {
  return (
    <div 
      className={`absolute inset-0 z-10 pointer-events-none transition-opacity duration-700 mix-blend-color-dodge ${
        isActive ? 'opacity-40' : 'opacity-0'
      }`}
      style={{
        background: `linear-gradient(135deg, 
          rgba(0, 245, 255, 0.4) 0%, 
          rgba(255, 0, 255, 0.4) 25%, 
          rgba(255, 215, 0, 0.4) 50%, 
          rgba(139, 92, 246, 0.4) 75%, 
          rgba(0, 245, 255, 0.4) 100%)`,
        backgroundSize: '200% 200%',
        animation: isActive ? 'shimmer-flow 4s linear infinite' : 'none'
      }}
    />
  );
};

export default IridescentOverlay;
