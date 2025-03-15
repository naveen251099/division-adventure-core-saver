
import React from 'react';

interface LongDivisionDisplayProps {
  dividend: number;
  divisor: number;
  shotHistory: { quotient: number; damage: number }[];
  remainingStrength: number;
}

const LongDivisionDisplay: React.FC<LongDivisionDisplayProps> = ({
  dividend,
  divisor,
  shotHistory,
  remainingStrength
}) => {
  return (
    <div className="cyber-panel p-3">
      <h3 className="text-center text-sm font-bold mb-2 cyber-text">DIVISION PROGRESS</h3>
      
      <div className="flex items-center justify-center font-mono">
        {/* Division layout */}
        <div className="relative flex">
          {/* Divisor and division symbol */}
          <div className="text-right mr-2">
            <div className="text-cyber-core">{divisor}</div>
            <div className="h-px w-8 bg-cyber-core/70 mt-1"></div>
          </div>
          
          {/* Dividend and calculation */}
          <div className="flex flex-col items-start">
            <div className="text-cyber-wall">{dividend}</div>
            
            {shotHistory.length > 0 && (
              <>
                {shotHistory.map((shot, index) => (
                  <React.Fragment key={index}>
                    <div className="text-cyber-accent">- {shot.damage}</div>
                    <div className="h-px w-full bg-cyber-core/30 my-1"></div>
                  </React.Fragment>
                ))}
                
                {/* Remaining amount */}
                <div className={`${remainingStrength === 0 ? 'text-cyber-success' : 'text-cyber-core'}`}>
                  {remainingStrength}
                </div>
              </>
            )}
          </div>
          
          {/* Quotient display on top */}
          {shotHistory.length > 0 && (
            <div className="absolute -top-6 left-10">
              <div className="text-cyber-success text-sm">
                {shotHistory.map(shot => shot.quotient).join(' + ')}
                {shotHistory.length > 0 ? ' = ' : ''}
                {shotHistory.length > 0 ? shotHistory.reduce((sum, shot) => sum + shot.quotient, 0) : ''}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LongDivisionDisplay;
