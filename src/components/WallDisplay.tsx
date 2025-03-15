
import React, { useEffect, useState } from 'react';

interface WallDisplayProps {
  remainingStrength: number;
  dividend: number;
  showWarning: boolean;
}

const WallDisplay: React.FC<WallDisplayProps> = ({ remainingStrength, dividend, showWarning }) => {
  const [impactAnimation, setImpactAnimation] = useState(false);
  const [prevStrength, setPrevStrength] = useState(remainingStrength);
  
  useEffect(() => {
    if (prevStrength !== remainingStrength && prevStrength > remainingStrength) {
      setImpactAnimation(true);
      const timer = setTimeout(() => setImpactAnimation(false), 500);
      return () => clearTimeout(timer);
    }
    setPrevStrength(remainingStrength);
  }, [remainingStrength, prevStrength]);
  
  const progress = 1 - remainingStrength / dividend;
  const wallHeight = `${Math.max(5, 100 - progress * 100)}%`;
  
  return (
    <div className="wall-container relative h-80 w-full max-w-md mx-auto rounded-md overflow-hidden
                    border-2 border-cyber-wall/50 bg-cyber-dark/80 backdrop-blur-sm">
      <div 
        className={`absolute bottom-0 left-0 right-0 transition-all duration-500 ease-out
                    bg-cyber-wall ${showWarning ? 'animate-flash-warning' : 'animate-pulse-wall'}
                    ${impactAnimation ? 'animate-shoot' : ''}`}
        style={{ 
          height: wallHeight,
          backgroundImage: 'repeating-linear-gradient(45deg, rgba(231, 76, 60, 0.8), rgba(231, 76, 60, 0.8) 10px, rgba(192, 57, 43, 0.8) 10px, rgba(192, 57, 43, 0.8) 20px)'
        }}
      >
        {/* Wall integrity indicators */}
        <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-cyber-danger to-transparent"></div>
        <div className="absolute bottom-0 left-0 right-0 h-2 bg-gradient-to-r from-cyber-danger to-transparent"></div>
      </div>
      
      {/* Wall strength indicator */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="bg-black/70 px-6 py-3 rounded-md border border-cyber-wall/50">
          <span className="text-4xl font-bold text-white">{remainingStrength}</span>
        </div>
      </div>
      
      {/* Tech-like grid pattern overlaid on wall */}
      <div className="absolute inset-0 bg-cyber-grid bg-cyber-grid-size opacity-20"></div>
      
      {/* Impact animations */}
      {impactAnimation && (
        <div className="absolute inset-0 bg-white/20 animate-appear"></div>
      )}
    </div>
  );
};

export default WallDisplay;
