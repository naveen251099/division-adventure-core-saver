
import React, { useEffect } from 'react';
import '../styles/animations.css';

interface CoreExplosionProps {
  show: boolean;
  onAnimationEnd: () => void;
}

const CoreExplosion: React.FC<CoreExplosionProps> = ({ show, onAnimationEnd }) => {
  useEffect(() => {
    if (show) {
      const timer = setTimeout(() => {
        onAnimationEnd();
      }, 2000);
      
      return () => clearTimeout(timer);
    }
  }, [show, onAnimationEnd]);
  
  if (!show) return null;
  
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm"></div>
      
      <div className="relative z-10">
        <div className="explosion-container">
          <div className="explosion-circle"></div>
          <div className="explosion-circle delay-1"></div>
          <div className="explosion-circle delay-2"></div>
          <div className="explosion-particles">
            {Array(20).fill(0).map((_, i) => (
              <div key={i} className="particle" style={{ 
                '--angle': `${i * 18}deg`,
                '--delay': `${i * 0.05}s`
              } as React.CSSProperties}></div>
            ))}
          </div>
        </div>
        
        <div className="mt-6 text-center">
          <h2 className="text-2xl font-bold text-cyber-danger glitch-animation">CORE OVERLOAD</h2>
          <p className="text-white/80 mt-2">Critical System Failure</p>
        </div>
      </div>
    </div>
  );
};

export default CoreExplosion;
