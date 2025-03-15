
import React from 'react';

interface CoreDisplayProps {
  gameStatus: 'playing' | 'won' | 'lost';
}

const CoreDisplay: React.FC<CoreDisplayProps> = ({ gameStatus }) => {
  return (
    <div className="relative w-48 h-48 mx-auto">
      <div className={`core-container absolute inset-0 rounded-full animate-float 
        ${gameStatus === 'playing' ? 'animate-glow' : ''}
        ${gameStatus === 'won' ? 'bg-cyber-success/20' : ''}
        ${gameStatus === 'lost' ? 'bg-cyber-danger/20' : ''}
        border-2 ${gameStatus === 'playing' ? 'border-cyber-core' : 
                    gameStatus === 'won' ? 'border-cyber-success' : 'border-cyber-danger'}`}>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className={`w-28 h-28 rounded-full transition-all duration-500
            ${gameStatus === 'playing' ? 'bg-cyber-core/30' : 
              gameStatus === 'won' ? 'bg-cyber-success/30' : 'bg-cyber-danger/30'}`}>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className={`w-20 h-20 rounded-full transition-all duration-500
                ${gameStatus === 'playing' ? 'bg-cyber-core/50' : 
                  gameStatus === 'won' ? 'bg-cyber-success/50' : 'bg-cyber-danger/50'}`}>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className={`w-12 h-12 rounded-full transition-all duration-500
                    ${gameStatus === 'playing' ? 'bg-cyber-core' : 
                      gameStatus === 'won' ? 'bg-cyber-success' : 'bg-cyber-danger'}`}>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className={`w-6 h-6 rounded-full bg-white/80 animate-pulse`}></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Tech-like patterns */}
      <div className="absolute top-1/4 left-1/4 w-1/2 h-1/2 border-t-2 border-l-2 rounded-tl-full 
        border-white/20 rotate-45"></div>
      <div className="absolute bottom-1/4 right-1/4 w-1/2 h-1/2 border-b-2 border-r-2 rounded-br-full 
        border-white/20 rotate-45"></div>
      
      {/* Core Status Text */}
      <div className="absolute -bottom-10 left-0 right-0 text-center text-sm font-bold tracking-wider">
        {gameStatus === 'playing' ? (
          <span className="text-cyber-core cyber-text animate-pulse">CORE ACTIVE</span>
        ) : gameStatus === 'won' ? (
          <span className="text-cyber-success animate-appear">CORE SAVED</span>
        ) : (
          <span className="text-cyber-danger animate-appear">CORE COMPROMISED</span>
        )}
      </div>
    </div>
  );
};

export default CoreDisplay;
