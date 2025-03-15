
import React, { useEffect, useState } from 'react';

interface GameMessageProps {
  message: string;
  gameStatus: 'playing' | 'won' | 'lost';
}

const GameMessage: React.FC<GameMessageProps> = ({ message, gameStatus }) => {
  const [isTyping, setIsTyping] = useState(false);
  const [displayedMessage, setDisplayedMessage] = useState("");
  const [prevMessage, setPrevMessage] = useState("");
  
  useEffect(() => {
    if (message !== prevMessage) {
      setIsTyping(true);
      setDisplayedMessage("");
      
      let index = 0;
      const interval = setInterval(() => {
        setDisplayedMessage((prev) => prev + message[index]);
        index++;
        
        if (index >= message.length) {
          clearInterval(interval);
          setIsTyping(false);
        }
      }, 20);
      
      setPrevMessage(message);
      return () => clearInterval(interval);
    }
  }, [message, prevMessage]);
  
  return (
    <div className={`cyber-panel p-4 relative overflow-hidden
      ${gameStatus === 'won' ? 'border-cyber-success' : 
        gameStatus === 'lost' ? 'border-cyber-danger' : 'border-cyber-core/30'}`}>
      <div className="absolute top-0 left-0 w-full h-1 
        ${gameStatus === 'won' ? 'bg-cyber-success' : 
          gameStatus === 'lost' ? 'bg-cyber-danger' : 'bg-cyber-core'}"></div>
      
      <div className="min-h-[80px] flex items-center">
        <p className="font-mono text-lg">
          {displayedMessage}
          {isTyping && <span className="animate-pulse">_</span>}
        </p>
      </div>
      
      <div className="absolute bottom-1 right-1">
        <div className={`w-3 h-3 rounded-full ${isTyping ? 'bg-cyber-warning animate-pulse' : 'bg-cyber-core'}`}></div>
      </div>
    </div>
  );
};

export default GameMessage;
