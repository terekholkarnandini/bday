// Gentle romantic music box and cute sound effects using Web Audio API

let audioCtx = null;
let isPlaying = false;

function getAudioContext() {
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

// Play a cute soft chime note (like a vintage music box)
export function playMusicBoxNote(freq, duration = 1.2, volume = 0.15) {
  const ctx = getAudioContext();
  if (!ctx) return;

  const now = ctx.currentTime;

  // Primary tone (triangle wave for music box warmth)
  const osc1 = ctx.createOscillator();
  const gain1 = ctx.createGain();
  osc1.type = 'triangle';
  osc1.frequency.setValueAtTime(freq, now);

  // Sparkly overtone (sine wave 2 octaves up, quieter)
  const osc2 = ctx.createOscillator();
  const gain2 = ctx.createGain();
  osc2.type = 'sine';
  osc2.frequency.setValueAtTime(freq * 2, now);

  // Envelope
  gain1.gain.setValueAtTime(0, now);
  gain1.gain.linearRampToValueAtTime(volume, now + 0.02);
  gain1.gain.exponentialRampToValueAtTime(0.0001, now + duration);

  gain2.gain.setValueAtTime(0, now);
  gain2.gain.linearRampToValueAtTime(volume * 0.3, now + 0.02);
  gain2.gain.exponentialRampToValueAtTime(0.0001, now + duration * 0.7);

  osc1.connect(gain1);
  osc2.connect(gain2);
  gain1.connect(ctx.destination);
  gain2.connect(ctx.destination);

  osc1.start(now);
  osc2.start(now);
  osc1.stop(now + duration);
  osc2.stop(now + duration);
}

// Cute soft "pop" for sticker taps
export function playStickerPop() {
  const ctx = getAudioContext();
  if (!ctx) return;

  const now = ctx.currentTime;
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  osc.type = 'sine';
  osc.frequency.setValueAtTime(520, now);
  osc.frequency.exponentialRampToValueAtTime(880, now + 0.08);

  gain.gain.setValueAtTime(0.12, now);
  gain.gain.exponentialRampToValueAtTime(0.001, now + 0.1);

  osc.connect(gain);
  gain.connect(ctx.destination);

  osc.start(now);
  osc.stop(now + 0.12);
}

// Cute fairy chime for opening envelope or gift
export function playSurpriseChime() {
  const notes = [523.25, 659.25, 783.99, 1046.5]; // C5, E5, G5, C6
  notes.forEach((freq, idx) => {
    setTimeout(() => {
      playMusicBoxNote(freq, 1.5, 0.18);
    }, idx * 110);
  });
}

// Sweet romantic melody: Happy Birthday / Sweet lullaby music box loop
const MELODY = [
  { note: 261.63, dur: 400 }, // C4
  { note: 261.63, dur: 350 }, // C4
  { note: 293.66, dur: 700 }, // D4
  { note: 261.63, dur: 700 }, // C4
  { note: 349.23, dur: 700 }, // F4
  { note: 329.63, dur: 1200 }, // E4

  { note: 261.63, dur: 400 }, // C4
  { note: 261.63, dur: 350 }, // C4
  { note: 293.66, dur: 700 }, // D4
  { note: 261.63, dur: 700 }, // C4
  { note: 392.00, dur: 700 }, // G4
  { note: 349.23, dur: 1200 }, // F4

  { note: 261.63, dur: 400 }, // C4
  { note: 261.63, dur: 350 }, // C4
  { note: 523.25, dur: 700 }, // C5
  { note: 440.00, dur: 700 }, // A4
  { note: 349.23, dur: 700 }, // F4
  { note: 329.63, dur: 700 }, // E4
  { note: 293.66, dur: 1100 }, // D4

  { note: 466.16, dur: 400 }, // Bb4
  { note: 466.16, dur: 350 }, // Bb4
  { note: 440.00, dur: 700 }, // A4
  { note: 349.23, dur: 700 }, // F4
  { note: 392.00, dur: 700 }, // G4
  { note: 349.23, dur: 1600 }  // F4
];

export function toggleMusic(callback) {
  if (isPlaying) {
    stopMusic();
    if (callback) callback(false);
    return false;
  } else {
    startMusic();
    if (callback) callback(true);
    return true;
  }
}

let melodyIndex = 0;
let stepTimeout = null;

function playMelodyStep() {
  if (!isPlaying) return;

  const current = MELODY[melodyIndex];
  playMusicBoxNote(current.note, 1.4, 0.12);

  melodyIndex = (melodyIndex + 1) % MELODY.length;
  // Delay slightly between loops
  const pause = (melodyIndex === 0) ? 2000 : current.dur;

  stepTimeout = setTimeout(playMelodyStep, pause);
}

export function startMusic() {
  getAudioContext();
  isPlaying = true;
  melodyIndex = 0;
  playMelodyStep();
}

export function stopMusic() {
  isPlaying = false;
  if (stepTimeout) {
    clearTimeout(stepTimeout);
    stepTimeout = null;
  }
}
