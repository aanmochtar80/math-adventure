/**
 * Sound Utility for Math Adventure
 * Generates sounds using Web Audio API to avoid external dependency issues.
 */

const audioCtx = new (window.AudioContext || window.webkitAudioContext)();

export const playCorrectSound = async () => {
  if (audioCtx.state === 'suspended') {
    await audioCtx.resume();
  }
  const oscillator = audioCtx.createOscillator();
  const gainNode = audioCtx.createGain();

  oscillator.connect(gainNode);
  gainNode.connect(audioCtx.destination);

  oscillator.type = 'sine';
  oscillator.frequency.setValueAtTime(880, audioCtx.currentTime); // A5 note
  oscillator.frequency.exponentialRampToValueAtTime(440, audioCtx.currentTime + 0.2);

  gainNode.gain.setValueAtTime(0, audioCtx.currentTime);
  gainNode.gain.linearRampToValueAtTime(0.5, audioCtx.currentTime + 0.05);
  gainNode.gain.linearRampToValueAtTime(0, audioCtx.currentTime + 0.3);

  oscillator.start();
  oscillator.stop(audioCtx.currentTime + 0.3);
};

export const playWrongSound = async () => {
  if (audioCtx.state === 'suspended') {
    await audioCtx.resume();
  }
  const oscillator = audioCtx.createOscillator();
  const gainNode = audioCtx.createGain();

  oscillator.connect(gainNode);
  gainNode.connect(audioCtx.destination);

  oscillator.type = 'sawtooth';
  oscillator.frequency.setValueAtTime(220, audioCtx.currentTime); // A3 note
  oscillator.frequency.linearRampToValueAtTime(110, audioCtx.currentTime + 0.2);

  gainNode.gain.setValueAtTime(0, audioCtx.currentTime);
  gainNode.gain.linearRampToValueAtTime(0.5, audioCtx.currentTime + 0.05);
  gainNode.gain.linearRampToValueAtTime(0, audioCtx.currentTime + 0.4);

  oscillator.start();
  oscillator.stop(audioCtx.currentTime + 0.4);
};

export const playLevelUpSound = async () => {
  if (audioCtx.state === 'suspended') {
    await audioCtx.resume();
  }
  const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
  notes.forEach((freq, index) => {
    const oscillator = audioCtx.createOscillator();
    const gainNode = audioCtx.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioCtx.destination);
    
    oscillator.type = 'triangle';
    oscillator.frequency.setValueAtTime(freq, audioCtx.currentTime + (index * 0.1));
    
    gainNode.gain.setValueAtTime(0, audioCtx.currentTime + (index * 0.1));
    gainNode.gain.linearRampToValueAtTime(0.3, audioCtx.currentTime + (index * 0.1) + 0.05);
    gainNode.gain.linearRampToValueAtTime(0, audioCtx.currentTime + (index * 0.1) + 0.3);
    
    oscillator.start(audioCtx.currentTime + (index * 0.1));
    oscillator.stop(audioCtx.currentTime + (index * 0.1) + 0.3);
  });
};
