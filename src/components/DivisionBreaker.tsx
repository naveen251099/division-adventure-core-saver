import React, { useState, useEffect } from 'react';
import CoreDisplay from './CoreDisplay';
import WallDisplay from './WallDisplay';
import ShooterControls from './ShooterControls';
import GameMessage from './GameMessage';
import CharacterDialogue from './CharacterDialogue';
import CoreExplosion from './CoreExplosion';
import CustomGameSettings from './CustomGameSettings';
import LongDivisionDisplay from './LongDivisionDisplay';
import { Shield, RotateCcw, Settings } from 'lucide-react';
import { soundManager } from '../utils/soundEffects';

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
  const [showExplosion, setShowExplosion] = useState(false);
  const [showSettingsDialog, setShowSettingsDialog] = useState(false);
  const [quotientOptions, setQuotientOptions] = useState([20, 40, 61]);
  
  // Character dialogue
  const [heroText, setHeroText] = useState("We must break that wall to recover the core! Use the quotient cannons to divide 366 by 6!");
  const [villainText, setVillainText] = useState("Your puny attempts will fail! My wall is impenetrable. The core is mine!");
  const [showHero, setShowHero] = useState(true);
  const [showVillain, setShowVillain] = useState(true);

  // Initialize game sounds
  useEffect(() => {
    // Try to play background music on component mount
    const musicButton = document.getElementById('music-toggle-button');
    if (musicButton) {
      setTimeout(() => {
        musicButton.click();
      }, 1000);
    }
    
    return () => {
      soundManager.stopSound('background');
    };
  }, []);
  
  // Update quotient options based on remaining strength
  useEffect(() => {
    const updateQuotientOptions = () => {
      if (gameStatus !== 'playing' || remainingStrength <= 0) return;
      
      // Calculate new quotient options based on remaining strength
      const exactQuotient = Math.floor(remainingStrength / divisor);
      
      // If there's an exact quotient to finish the game, include it
      if (exactQuotient * divisor === remainingStrength && exactQuotient > 0) {
        const options = [
          Math.max(1, Math.floor(exactQuotient / 3)), 
          Math.floor(exactQuotient / 2), 
          exactQuotient
        ];
        setQuotientOptions(options);
      } else {
        // Otherwise provide strategic options
        const maxSafeQuotient = Math.floor(remainingStrength / divisor);
        
        // Create three options: small, medium and large
        const options = [
          Math.max(1, Math.floor(maxSafeQuotient / 4)),
          Math.floor(maxSafeQuotient / 2),
          Math.max(Math.floor(maxSafeQuotient * 0.75), Math.min(maxSafeQuotient, 2))
        ];
        
        // Ensure options are all different
        if (options[0] === options[1]) options[0] = Math.max(1, options[0] - 1);
        if (options[1] === options[2]) options[1] = Math.max(options[0] + 1, options[1] - 1);
        
        setQuotientOptions(options);
      }
    };
    
    updateQuotientOptions();
  }, [remainingStrength, divisor, gameStatus]);

  // Reset the game
  const resetGame = () => {
    setRemainingStrength(dividend);
    setShotHistory([]);
    setGameStatus('playing');
    setMessage("I have your core. Break my wall to save it! Divide 366 by 6 using quotients.");
    setCustomQuotient("");
    setShowCustomInput(false);
    setShowWarning(false);
    setHeroText("We must break that wall to recover the core! Use the quotient cannons to divide 366 by 6!");
    setVillainText("Your puny attempts will fail! My wall is impenetrable. The core is mine!");
    setShowHero(true);
    setShowVillain(true);
  };

  // Start a new game with custom settings
  const startCustomGame = (newDividend: number, newDivisor: number) => {
    setDividend(newDividend);
    setDivisor(newDivisor);
    setRemainingStrength(newDividend);
    setShotHistory([]);
    setGameStatus('playing');
    setMessage(`New mission: Break the wall with strength ${newDividend} using ${newDivisor} power barrels!`);
    setCustomQuotient("");
    setShowCustomInput(false);
    setShowWarning(false);
    setHeroText(`We need to divide ${newDividend} by ${newDivisor} to recover the core!`);
    setVillainText(`Ha! You'll never crack my new ${newDividend} strength wall!`);
    setShowHero(true);
    setShowVillain(true);
  };

  // Handle shot
  const handleShot = (quotient: number) => {
    if (gameStatus !== 'playing') return;
    
    // Convert to number and ensure it's valid
    const numQuotient = parseInt(quotient.toString());
    if (isNaN(numQuotient) || numQuotient <= 0) {
      setMessage("ERROR: Invalid quotient detected. Enter a positive number!");
      setHeroText("That's not a valid quotient! We need a positive number.");
      setShowHero(true);
      setShowVillain(false);
      return;
    }
    
    const damage = numQuotient * divisor;
    
    // Check if impossible quotient (too large)
    if (damage > remainingStrength) {
      setMessage(`WARNING: Quotient ${numQuotient} would cause ${damage} damage and destroy the core!`);
      setHeroText(`Careful! ${numQuotient} × ${divisor} = ${damage} would overpower and destroy the core!`);
      setVillainText("Yes! Destroy your own core! Make my job easier!");
      setShowHero(true);
      setShowVillain(true);
      setShowWarning(true);
      setTimeout(() => setShowWarning(false), 2000);
      return;
    }
    
    // Play sound effect
    soundManager.playSound('break');
    
    const newRemaining = remainingStrength - damage;
    const newShot = { quotient: numQuotient, damage };
    const newHistory = [...shotHistory, newShot];
    
    setShotHistory(newHistory);
    setRemainingStrength(newRemaining);
    setCustomQuotient("");
    
    // Determine if it was a good shot or weak shot
    const remainingPercentage = (newRemaining / dividend) * 100;
    const isWeakShot = damage < (remainingStrength * 0.2); // Less than 20% damage is weak
    
    // Update messages based on progress and shot quality
    if (isWeakShot) {
      setHeroText("That was too weak! We need more power to break through!");
      setVillainText("Haha! Is that all you've got? Just a scratch on my wall!");
      setShowHero(true);
      setShowVillain(true);
      setMessage(`WEAK HIT! ${numQuotient} × ${divisor} = ${damage}. Wall integrity at ${newRemaining}.`);
    } else if (newHistory.length === 1) {
      setHeroText("Good hit! Keep going, we're making progress!");
      setVillainText("Argh! My wall is still standing, but you got lucky!");
      setShowHero(true);
      setShowVillain(true);
      setMessage(`DIRECT HIT! ${numQuotient} × ${divisor} = ${damage}. Wall integrity at ${newRemaining}.`);
    } else if (newHistory.length === 2) {
      setHeroText("The wall is weakening! One more strategic shot!");
      setVillainText("No! My wall is cracking! You won't succeed!");
      setShowHero(true);
      setShowVillain(true);
      setMessage("Wall integrity weakening! Keep firing strategically.");
    } else if (newHistory.length === 3) {
      setHeroText("Almost there! One more precise shot to break through!");
      setVillainText("Impossible! My wall cannot fail me now!");
      setShowHero(true);
      setShowVillain(true);
      setMessage("Almost there! One more precise shot needed to breach the wall.");
    }
    
    // Check win/loss conditions
    if (newRemaining === 0) {
      soundManager.playSound('levelComplete');
      setGameStatus('won');
      setHeroText("Mission accomplished! The core is back in our hands!");
      setVillainText("Nooooo! My beautiful wall! You'll regret this!");
      setShowHero(true);
      setShowVillain(true);
      setMessage("SUCCESS! Wall breached! The core has been recovered safely.");
    } else if (newRemaining < 0) {
      soundManager.playSound('explosion');
      setGameStatus('lost');
      setHeroText("No! The core has been damaged! We need to try again!");
      setVillainText("You fools! You destroyed your own core!");
      setShowHero(true);
      setShowVillain(true);
      setShowExplosion(true);
      setMessage("CRITICAL ERROR! Shot too powerful - core has been damaged in the breach!");
    } else if (newHistory.length >= 4 && newRemaining > 0) {
      soundManager.playSound('gameOver');
      setGameStatus('lost');
      setHeroText("We've run out of shots! The villain has secured the core!");
      setVillainText("Too many attempts! The core is mine now! Victory!");
      setShowHero(true);
      setShowVillain(true);
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
          
          {/* Character Dialogue */}
          <CharacterDialogue 
            heroText={heroText}
            villainText={villainText}
            showHero={showHero}
            showVillain={showVillain}
          />
          
          {/* Game Message */}
          <GameMessage message={message} gameStatus={gameStatus} />
          
          {/* Long Division Display */}
          <LongDivisionDisplay 
            dividend={dividend}
            divisor={divisor}
            shotHistory={shotHistory}
            remainingStrength={remainingStrength}
          />
          
          {/* Reset and settings buttons */}
          <div className="flex gap-4">
            {gameStatus !== 'playing' && (
              <button onClick={resetGame} className="cyber-button flex-1 py-3">
                <div className="flex items-center justify-center gap-2">
                  <RotateCcw size={18} />
                  <span>RESTART MISSION</span>
                </div>
              </button>
            )}
            
            {gameStatus !== 'playing' && (
              <button 
                onClick={() => setShowSettingsDialog(true)} 
                className="cyber-button flex-1 py-3 bg-cyber-accent/70"
              >
                <div className="flex items-center justify-center gap-2">
                  <Settings size={18} />
                  <span>NEW MISSION</span>
                </div>
              </button>
            )}
          </div>
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
            divisor={divisor}
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
      
      {/* Core Explosion Animation */}
      <CoreExplosion 
        show={showExplosion} 
        onAnimationEnd={() => setShowExplosion(false)} 
      />
      
      {/* Custom Game Settings Dialog */}
      <CustomGameSettings
        open={showSettingsDialog}
        onOpenChange={setShowSettingsDialog}
        onSubmit={startCustomGame}
        currentDividend={dividend}
        currentDivisor={divisor}
      />
    </div>
  );
};

export default DivisionBreaker;
