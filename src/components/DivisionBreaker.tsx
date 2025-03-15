
import React, { useState, useEffect } from 'react';
import CoreDisplay from './CoreDisplay';
import WallDisplay from './WallDisplay';
import ShooterControls from './ShooterControls';
import GameMessage from './GameMessage';
import { Shield, RotateCcw } from 'lucide-react';

const DivisionBreaker: React.FC = () => {
  // Game state
  const [dividend, setDividend] = useState(366);
  const [divisor, setDivisor] = useState(6);
  const [remainingStrength, setRemainingStrength] = useState(366);
  const [shotHistory, setShotHistory] = useState<{ quotient: number; damage: number }[]>([]);
  const [gameStatus, setGameStatus] = useState<'playing' | 'won' | 'lost'>('playing');
  const [message, setMessage] = useState("I have your core. Break my wall to save it! Divide 366 by 6 using quotients.");
  const [customQuotient, setCustomQuotient] = useState("");
  const [showCustomInput, setShowCustomInput] = useState(false);
  const [showWarning, setShowWarning] = useState(false);
  
  // Available quotient options
  const quotientOptions = [20, 40, 61];

  // Reset the game
  const resetGame = () => {
    setRemainingStrength(dividend);
    setShotHistory([]);
    setGameStatus('playing');
    setMessage("I have your core. Break my wall to save it! Divide 366 by 6 using quotients.");
    setCustomQuotient("");
    setShowCustomInput(false);
    setShowWarning(false);
  };

  // Handle shot
  const handleShot = (quotient: number) => {
    if (gameStatus !== 'playing') return;
    
    // Convert to number and ensure it's valid
    const numQuotient = parseInt(quotient.toString());
    if (isNaN(numQuotient) || numQuotient <= 0) {
      setMessage("ERROR: Invalid quotient detected. Enter a positive number!");
      return;
    }
    
    const damage = numQuotient * divisor;
    
    // Check if impossible quotient (too large)
    if (damage > remainingStrength) {
      setMessage(`WARNING: Quotient ${numQuotient} would cause ${damage} damage and destroy the core!`);
      setShowWarning(true);
      setTimeout(() => setShowWarning(false), 2000);
      return;
    }
    
    const newRemaining = remainingStrength - damage;
    const newShot = { quotient: numQuotient, damage };
    const newHistory = [...shotHistory, newShot];
    
    setShotHistory(newHistory);
    setRemainingStrength(newRemaining);
    setCustomQuotient("");
    
    // Update messages based on progress
    if (newHistory.length === 1) {
      setMessage(`DIRECT HIT! ${numQuotient} × ${divisor} = ${damage}. Wall integrity at ${newRemaining}.`);
    } else if (newHistory.length === 2) {
      setMessage("Wall integrity weakening! Keep firing strategically.");
    } else if (newHistory.length === 3) {
      setMessage("Almost there! One more precise shot needed to breach the wall.");
    }
    
    // Check win/loss conditions
    if (newRemaining === 0) {
      setGameStatus('won');
      setMessage("SUCCESS! Wall breached! The core has been recovered safely.");
    } else if (newRemaining < 0) {
      setGameStatus('lost');
      setMessage("CRITICAL ERROR! Shot too powerful - core has been damaged in the breach!");
    } else if (newHistory.length >= 4 && newRemaining > 0) {
      setGameStatus('lost');
      setMessage("LOCKOUT INITIATED! Too many attempts - the villain has secured the core!");
    }
  };

  // Show shots remaining as a visual indicator
  const renderShotsRemaining = () => {
    const maxShots = 4;
    const shotsUsed = shotHistory.length;
    const shotsRemaining = maxShots - shotsUsed;
    
    return (
      <div className="flex justify-center gap-2 mb-2">
        {Array(maxShots).fill(0).map((_, i) => (
          <div 
            key={i} 
            className={`w-3 h-3 rounded-full transition-all duration-300 ${i < shotsUsed ? 'bg-cyber-accent' : 'bg-cyber-core/30'}`}
          ></div>
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-cyber-black text-cyber-text p-4 md:p-6">
      {/* Header */}
      <header className="max-w-4xl mx-auto mb-8 cyber-panel p-4 border-b-2 border-cyber-header">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Shield className="w-8 h-8 mr-3 text-cyber-core" />
            <h1 className="text-3xl font-bold cyber-text">DIVISION BREAKER</h1>
          </div>
          <div className="text-xl font-mono border-2 border-cyber-core/50 p-2 rounded-md bg-cyber-dark">
            <span className="text-cyber-wall">{dividend}</span> ÷ <span className="text-cyber-core">{divisor}</span>
          </div>
        </div>
        
        <div className="mt-2 text-center">
          <p className="text-gray-400">Break the wall using the perfect combination of shots to save the core!</p>
          {renderShotsRemaining()}
        </div>
      </header>
      
      <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8">
        <div className="space-y-6">
          {/* Core Display */}
          <CoreDisplay gameStatus={gameStatus} />
          
          {/* Game Message */}
          <GameMessage message={message} gameStatus={gameStatus} />
          
          {/* Tracker Panel */}
          <div className="cyber-panel p-4">
            <h3 className="text-center text-lg font-bold mb-3 cyber-text">SHOT HISTORY</h3>
            <div className="font-mono space-y-2">
              <div className="flex justify-between">
                <span>Starting:</span>
                <span className="text-cyber-wall">{dividend}</span>
              </div>
              
              {shotHistory.map((shot, index) => (
                <div key={index} className="flex justify-between text-cyber-accent animate-appear" style={{ animationDelay: `${index * 0.1}s` }}>
                  <span>Shot {index + 1}: {shot.quotient} × {divisor}</span>
                  <span>-{shot.damage}</span>
                </div>
              ))}
              
              <div className="border-t border-cyber-core/30 mt-2 pt-2 flex justify-between">
                <span>Remaining:</span>
                <span className={`font-bold ${remainingStrength === 0 ? 'text-cyber-success' : 'text-cyber-core'}`}>{remainingStrength}</span>
              </div>
            </div>
          </div>
          
          {/* Reset button */}
          {gameStatus !== 'playing' && (
            <button onClick={resetGame} className="cyber-button w-full py-3">
              <div className="flex items-center justify-center gap-2">
                <RotateCcw size={18} />
                <span>RESTART MISSION</span>
              </div>
            </button>
          )}
        </div>
        
        <div className="space-y-6">
          {/* Wall Display */}
          <WallDisplay 
            remainingStrength={remainingStrength} 
            dividend={dividend}
            showWarning={showWarning}
          />
          
          {/* Shooter Controls */}
          <ShooterControls
            onShot={handleShot}
            quotientOptions={quotientOptions}
            gameStatus={gameStatus}
            customQuotient={customQuotient}
            setCustomQuotient={setCustomQuotient}
            showCustomInput={showCustomInput}
            setShowCustomInput={setShowCustomInput}
          />
        </div>
      </div>
      
      {/* Instructions/Help */}
      <footer className="max-w-4xl mx-auto mt-8 cyber-panel p-4 border-t-2 border-cyber-footer">
        <h3 className="text-center text-lg font-bold mb-2">MISSION BRIEFING</h3>
        <ul className="text-sm text-gray-300 space-y-1">
          <li>• Break the wall with exactly 0 remaining to save the core.</li>
          <li>• Each quotient you select is multiplied by {divisor} and reduces the wall strength.</li>
          <li>• Complete the mission in 4 shots or less.</li>
          <li>• Use the custom quotient option for precision attacks.</li>
        </ul>
      </footer>
    </div>
  );
};

export default DivisionBreaker;
