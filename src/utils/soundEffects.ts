
// Sound manager for the game
class SoundManager {
  private sounds: Map<string, HTMLAudioElement> = new Map();
  private musicPlaying: boolean = false;
  
  constructor() {
    // Pre-load sounds
    this.loadSound('shoot', '/sounds/shoot.mp3');
    this.loadSound('break', '/sounds/break.mp3');
    this.loadSound('explosion', '/sounds/explosion.mp3');
    this.loadSound('background', '/sounds/background.mp3', true);
    this.loadSound('levelComplete', '/sounds/level-complete.mp3');
    this.loadSound('gameOver', '/sounds/game-over.mp3');
    
    // Add event listeners for document interaction to enable audio
    this.enableAudioOnInteraction();
  }
  
  private loadSound(name: string, path: string, loop: boolean = false): void {
    const audio = new Audio(path);
    audio.loop = loop;
    
    // Handle loading errors gracefully
    audio.onerror = () => {
      console.warn(`Failed to load sound: ${path}`);
    };
    
    this.sounds.set(name, audio);
  }
  
  // This helps with browsers that require user interaction before playing audio
  private enableAudioOnInteraction(): void {
    const enableAudio = () => {
      // Create and play a silent audio to unlock audio context
      const silentAudio = new Audio();
      silentAudio.play().catch(() => {});
      
      // Remove event listeners after first interaction
      document.removeEventListener('click', enableAudio);
      document.removeEventListener('touchstart', enableAudio);
      document.removeEventListener('keydown', enableAudio);
    };
    
    document.addEventListener('click', enableAudio);
    document.addEventListener('touchstart', enableAudio);
    document.addEventListener('keydown', enableAudio);
  }
  
  playSound(name: string): void {
    const sound = this.sounds.get(name);
    if (sound) {
      // Clone and play to allow overlapping sounds
      if (name !== 'background') {
        const clone = sound.cloneNode(true) as HTMLAudioElement;
        clone.volume = 0.6;
        clone.play().catch(err => console.warn(`Error playing sound: ${err}`));
      } else {
        // For background music, just play the original
        sound.volume = 0.3;
        sound.currentTime = 0; // Reset to beginning
        sound.play().catch(err => console.warn(`Error playing background music: ${err}`));
      }
    }
  }
  
  stopSound(name: string): void {
    const sound = this.sounds.get(name);
    if (sound) {
      sound.pause();
      sound.currentTime = 0;
    }
  }
  
  toggleBackgroundMusic(): boolean {
    this.musicPlaying = !this.musicPlaying;
    
    if (this.musicPlaying) {
      this.playSound('background');
    } else {
      this.stopSound('background');
    }
    
    return this.musicPlaying;
  }
  
  isMusicPlaying(): boolean {
    return this.musicPlaying;
  }
}

export const soundManager = new SoundManager();
