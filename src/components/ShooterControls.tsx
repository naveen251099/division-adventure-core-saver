
import React, { useState, useRef, useEffect } from 'react';
import { ArrowDown, Zap, X } from 'lucide-react';

interface ShooterControlsProps {
  onShot: (quotient: number) => void;
  quotientOptions: number[];
  gameStatus: 'playing' | 'won' | 'lost';
  customQuotient: string;
  setCustomQuotient: React.Dispatch<React.SetStateAction<string>>;
  showCustomInput: boolean;
  setShowCustomInput: React.Dispatch<React.SetStateAction<boolean>>;
}

const ShooterControls: React.FC<ShooterControlsProps> = ({
  onShot,
  quotientOptions,
  gameStatus,
  customQuotient,
  setCustomQuotient,
  showCustomInput,
  setShowCustomInput
}) => {
  const [activeShooter, setActiveShooter] = useState<number | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  
  useEffect(() => {
    if (showCustomInput && inputRef.current) {
      inputRef.current.focus();
    }
  }, [showCustomInput]);
  
  const handlePresetShot = (quotient: number) => {
    setActiveShooter(quotient);
    setTimeout(() => {
      onShot(quotient);
      setActiveShooter(null);
    }, 300);
  };
  
  const handleCustomShot = () => {
    if (customQuotient && !isNaN(parseInt(customQuotient))) {
      onShot(parseInt(customQuotient));
      setCustomQuotient("");
    }
  };
  
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleCustomShot();
    }
  };
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (/^\d*$/.test(value)) {
      setCustomQuotient(value);
    }
  };
  
  return (
    <div className="cyber-panel p-4 max-w-md mx-auto">
      <div className="mb-2 text-center">
        <h3 className="text-lg font-bold cyber-text">SHOOTER CONTROLS</h3>
      </div>
      
      {/* Barrel visualization */}
      <div className="relative h-16 mb-8 flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-cyber-grid bg-cyber-grid-size opacity-20"></div>
        <div className="relative z-10 w-full h-8 bg-cyber-dark border-y-2 border-cyber-core/30 flex items-center">
          {Array(6).fill(0).map((_, i) => (
            <div key={i} className="flex-1 flex justify-center">
              <div className="w-4 h-12 bg-cyber-accent/70 rounded-b-sm relative top-2">
                <div className="absolute -top-2 left-0 right-0 h-2 bg-cyber-accent rounded-t-sm"></div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Barrel number indicator */}
        <div className="absolute bottom-0 left-0 right-0 flex justify-center">
          <div className="bg-black/50 px-3 py-1 rounded-md border border-cyber-core/30">
            <span className="text-sm text-cyber-core">×6</span>
          </div>
        </div>
      </div>
      
      {/* Preset quotient buttons */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        {quotientOptions.map((option) => (
          <button
            key={option}
            onClick={() => gameStatus === 'playing' && handlePresetShot(option)}
            disabled={gameStatus !== 'playing'}
            className={`cyber-button rounded-full w-16 h-16 mx-auto flex items-center justify-center
                       ${activeShooter === option ? 'animate-shoot' : ''}`}
          >
            <span className="text-xl font-bold">{option}</span>
          </button>
        ))}
      </div>
      
      {/* Custom quotient control */}
      <div className="flex items-center gap-2">
        <button
          onClick={() => gameStatus === 'playing' && setShowCustomInput(!showCustomInput)}
          disabled={gameStatus !== 'playing'}
          className="cyber-button rounded-full w-12 h-12 flex items-center justify-center"
        >
          {showCustomInput ? <X size={18} /> : <Zap size={18} />}
        </button>
        
        <div className={`flex-1 overflow-hidden transition-all duration-300 ${showCustomInput ? 'max-h-14 opacity-100' : 'max-h-0 opacity-0'}`}>
          <div className="flex gap-2">
            <input
              ref={inputRef}
              type="text"
              value={customQuotient}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              placeholder="Custom quotient"
              className="flex-1 bg-cyber-dark border border-cyber-core/30 text-white p-2 rounded-md"
              disabled={gameStatus !== 'playing'}
            />
            <button
              onClick={handleCustomShot}
              disabled={!customQuotient || gameStatus !== 'playing'}
              className="cyber-button px-3"
            >
              <ArrowDown size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShooterControls;
