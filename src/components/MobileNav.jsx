import { playStickerPop } from '../utils/audio';

export default function MobileNav() {
  const navItems = [
    { label: 'Letter', icon: '💌', href: '#letter' },
    { label: 'Memories', icon: '📸', href: '#memories' },
    { label: 'Reasons', icon: '💖', href: '#reasons' },
    { label: 'Story', icon: '📖', href: '#story' },
    { label: 'Surprise', icon: '🎁', href: '#surprise' }
  ];

  return (
    <nav className="mobile-bottom-dock" aria-label="Mobile Navigation">
      <div className="dock-container">
        {navItems.map((item) => (
          <a
            key={item.label}
            href={item.href}
            className="dock-item"
            onClick={() => playStickerPop()}
          >
            <span className="dock-icon">{item.icon}</span>
            <span className="dock-label">{item.label}</span>
          </a>
        ))}
      </div>
    </nav>
  );
}
