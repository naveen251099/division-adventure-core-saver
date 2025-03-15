
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
  // Calculate total subtracted so far
  const totalSubtracted = shotHistory.reduce((sum, shot) => sum + shot.damage, 0);
  
  return (
    <div className="cyber-panel p-4">
      <h3 className="text-center text-lg font-bold mb-3 cyber-text">LONG DIVISION</h3>
      
      <div className="flex items-start justify-center font-mono relative">
        {/* Division symbol and divisor */}
        <div className="text-right mr-2 flex flex-col items-end">
          <div className="text-cyber-core">{divisor}</div>
          <div className="h-px w-full bg-cyber-core/50 my-1"></div>
        </div>
        
        {/* Dividend and calculation */}
        <div className="flex flex-col items-start">
          <div className="text-cyber-wall">{dividend}</div>
          
          {shotHistory.map((shot, index) => (
            <React.Fragment key={index}>
              <div className="ml-4 text-cyber-accent">
                - {shot.damage}
                <span className="ml-4 text-sm text-gray-400">
                  {divisor} × {shot.quotient}
                </span>
              </div>
              
              {index < shotHistory.length - 1 && (
                <div className="h-px w-full bg-cyber-core/30 my-1"></div>
              )}
              
              {index === shotHistory.length - 1 && (
                <div className="h-px w-full bg-cyber-core/50 my-1"></div>
              )}
            </React.Fragment>
          ))}
          
          {/* Remaining amount */}
          <div className={`${remainingStrength === 0 ? 'text-cyber-success' : 'text-cyber-core'}`}>
            {remainingStrength}
          </div>
        </div>
        
        {/* Quotient display on top */}
        <div className="absolute -top-6 left-14">
          <div className="text-cyber-success">
            {shotHistory.map(shot => shot.quotient).join(' + ')}
            {shotHistory.length > 0 ? ' = ' : ''}
            {shotHistory.length > 0 ? shotHistory.reduce((sum, shot) => sum + shot.quotient, 0) : ''}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LongDivisionDisplay;
