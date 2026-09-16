import { useState } from 'react';
import { playStickerPop } from '../utils/audio';

const AVAILABLE_STICKERS = [
  { emoji: '🎂', label: 'Birthday Cake', type: 'cake' },
  { emoji: '🧸', label: 'Teddy Bear', type: 'bear' },
  { emoji: '🐰', label: 'Cute Bunny', type: 'bunny' },
  { emoji: '🍓', label: 'Strawberry', type: 'strawberry' },
  { emoji: '💌', label: 'Love Letter', type: 'stamp' },
  { emoji: '🎀', label: 'Pink Bow', type: 'bow' },
  { emoji: '🌸', label: 'Sakura', type: 'flower' },
  { emoji: '💖', label: 'Sparkle Heart', type: 'sparkle' },
  { emoji: '📸', label: 'Camera', type: 'camera' },
  { emoji: '⭐', label: 'Star', type: 'sparkle' },
  { emoji: '🍰', label: 'Cupcake', type: 'cake' },
  { emoji: '🧁', label: 'Sweet Treat', type: 'strawberry' }
];

let stickerIdCounter = 0;

function getNextSticker(sticker) {
  stickerIdCounter += 1;
  const scrollOffset = typeof window !== 'undefined' ? window.scrollY : 0;
  const viewHeight = typeof window !== 'undefined' ? window.innerHeight : 600;

  const x = 15 + ((stickerIdCounter * 29) % 65);
  const y = scrollOffset + 120 + ((stickerIdCounter * 73) % Math.max(viewHeight - 280, 200));
  const rot = -22 + ((stickerIdCounter * 19) % 45);

  return {
    id: stickerIdCounter,
    emoji: sticker.emoji,
    type: sticker.type,
    x,
    y,
    rot
  };
}

export default function StickerBox({ onAddSticker }) {
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (sticker) => {
    playStickerPop();
    const newSticker = getNextSticker(sticker);
    onAddSticker(newSticker);
  };

  return (
    <div className="sticker-box-wrapper">
      <button
        className="sticker-box-toggle"
        onClick={() => {
          playStickerPop();
          setIsOpen(!isOpen);
        }}
        aria-label="Toggle Sticker Box"
        title="Open Cute Sticker Box!"
      >
        <span className="toggle-icon">🎀</span>
        <span className="toggle-text">Sticker Box</span>
        <span className="sparkle-badge">✨</span>
      </button>

      {isOpen && (
        <div className="sticker-tray-palette">
          <div className="palette-header">
            <h4>Pick a Sticker to Stamp! 🌸</h4>
            <button
              className="palette-close"
              onClick={() => setIsOpen(false)}
            >
              ✕
            </button>
          </div>
          <p className="palette-hint">Tap any cute sticker to place it on the page!</p>
          <div className="palette-grid">
            {AVAILABLE_STICKERS.map((s, idx) => (
              <button
                key={idx}
                className="palette-item"
                onClick={() => handleSelect(s)}
                title={s.label}
              >
                <span className="palette-emoji">{s.emoji}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
