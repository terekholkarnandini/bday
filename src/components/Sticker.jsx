import { useState } from 'react';
import { playStickerPop } from '../utils/audio';

let burstCounter = 0;

export default function Sticker({
  type = 'sparkle',
  text,
  rotate = 0,
  top,
  left,
  right,
  bottom,
  size = 50,
  className = '',
  zIndex = 10,
  animate = true,
  style = {}
}) {
  const [wobble, setWobble] = useState(false);
  const [bursts, setBursts] = useState([]);

  const handleClick = (e) => {
    e.stopPropagation();
    setWobble(true);
    playStickerPop();

    burstCounter += 1;
    const burstEmojis = ['💖', '✨', '🌸', '💕', '⭐'];
    const newBurst = {
      id: burstCounter,
      emoji: burstEmojis[burstCounter % burstEmojis.length]
    };
    setBursts((prev) => [...prev, newBurst]);

    setTimeout(() => {
      setWobble(false);
    }, 600);

    setTimeout(() => {
      setBursts((prev) => prev.filter((b) => b.id !== newBurst.id));
    }, 1200);
  };

  const renderContent = () => {
    switch (type) {
      case 'cake':
        return (
          <div className="sticker-content sticker-cake">
            <span className="sticker-icon">🎂</span>
            <span className="sticker-tag">B-Day Special!</span>
          </div>
        );
      case 'bear':
        return (
          <div className="sticker-content sticker-bear">
            <span className="sticker-icon">🧸</span>
            <span className="sticker-sub">CUTU AALY</span>
          </div>
        );
      case 'bunny':
        return (
          <div className="sticker-content sticker-bunny">
            <span className="sticker-icon">🐰</span>
            <span className="sticker-sub">Cutie</span>
          </div>
        );
      case 'stamp':
        return (
          <div className="sticker-content sticker-stamp">
            <div className="stamp-inner">
              <span className="stamp-header">AIR MAIL</span>
              <span className="stamp-heart">♥</span>
              <span className="stamp-footer">SPECIAL DELIVERY</span>
            </div>
          </div>
        );
      case 'badge':
        return (
          <div className="sticker-content sticker-badge">
            <div className="badge-inner">
              <span className="badge-star">★</span>
              <span className="badge-text">{text || "100% CUTE"}</span>
              <span className="badge-star">★</span>
            </div>
          </div>
        );
      case 'strawberry':
        return (
          <div className="sticker-content sticker-strawberry">
            <span className="sticker-icon">🍓</span>
            <span className="sticker-sub">Sweet</span>
          </div>
        );
      case 'flower':
        return (
          <div className="sticker-content sticker-flower">
            <span className="sticker-icon">🌸</span>
          </div>
        );
      case 'sparkle':
        return (
          <div className="sticker-content sticker-sparkle">
            <span className="sticker-icon">✨</span>
          </div>
        );
      case 'bow':
        return (
          <div className="sticker-content sticker-bow">
            <span className="sticker-icon">🎀</span>
          </div>
        );
      case 'camera':
        return (
          <div className="sticker-content sticker-camera">
            <span className="sticker-icon">📸</span>
            <span className="sticker-tag">Smile!</span>
          </div>
        );
      case 'tape':
        return (
          <div className="sticker-washi-tape" style={{ width: size * 2.2 }}>
            <span>♥ ♥ ♥</span>
          </div>
        );
      case 'tag':
        return (
          <div className="sticker-content sticker-tag-custom">
            <span>{text || "favorite human ♡"}</span>
          </div>
        );
      default:
        return (
          <div className="sticker-content">
            <span className="sticker-icon">{text || "💖"}</span>
          </div>
        );
    }
  };

  const positionStyle = {
    position: 'absolute',
    top,
    left,
    right,
    bottom,
    zIndex,
    transform: `rotate(${rotate}deg) scale(${wobble ? 1.25 : 1})`,
    ...style
  };

  return (
    <div
      className={`cute-sticker ${animate ? 'floating-sticker' : ''} ${wobble ? 'sticker-wobble' : ''} ${className}`}
      style={positionStyle}
      onClick={handleClick}
      title="Tap me! ✨"
    >
      {renderContent()}

      {bursts.map((b) => (
        <span key={b.id} className="sticker-mini-burst">
          {b.emoji}
        </span>
      ))}
    </div>
  );
}
