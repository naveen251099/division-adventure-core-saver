
import React from 'react';
import { Shield, Skull } from 'lucide-react';

interface CharacterDialogueProps {
  heroText: string;
  villainText: string;
  showHero: boolean;
  showVillain: boolean;
}

const CharacterDialogue: React.FC<CharacterDialogueProps> = ({
  heroText,
  villainText,
  showHero,
  showVillain
}) => {
  return (
    <div className="grid grid-cols-2 gap-4 mb-4">
      {/* Hero side */}
      <div className={`transition-opacity duration-300 ${showHero ? 'opacity-100' : 'opacity-30'}`}>
        <div className="cyber-panel p-2 border-cyber-core">
          <div className="flex items-start">
            <div className="bg-cyber-core/20 p-2 rounded-full mr-2">
              <Shield className="w-6 h-6 text-cyber-core" />
            </div>
            <div className="flex-1">
              <p className="text-xs font-mono text-cyber-core">{heroText}</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Villain side */}
      <div className={`transition-opacity duration-300 ${showVillain ? 'opacity-100' : 'opacity-30'}`}>
        <div className="cyber-panel p-2 border-cyber-wall/50">
          <div className="flex items-start">
            <div className="flex-1 text-right">
              <p className="text-xs font-mono text-cyber-wall">{villainText}</p>
            </div>
            <div className="bg-cyber-wall/20 p-2 rounded-full ml-2">
              <Skull className="w-6 h-6 text-cyber-wall" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CharacterDialogue;
