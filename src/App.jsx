import { useEffect, useState, useRef } from "react";
import "./App.css";
import Sticker from "./components/Sticker";
import StickerBox from "./components/StickerBox";
import MobileNav from "./components/MobileNav";
import { toggleMusic, playSurpriseChime, playStickerPop } from "./utils/audio";

const memories = [
  {
    image: "/images/photo1.jpg",
    title: "My birthday boy",
    text: "Happy birthday to my favorite person in this whole world.Life feels a little more beautiful with you in it. ❤️.",
    sticker: "bear",
    tape: "washi-tape-1"
  },
  {
    image: "/images/photo2.jpg",
    title: "perfect smile❤️",
    text: "You already know this is my favorite photo of you. I could literally stare at it for hours… and yes, I probably do. 😭❤️",
    sticker: "strawberry",
    tape: "washi-tape-2"
  },
  {
    image: "/images/photo3.jpg",
    title: "Our Favorite Moment ❤️",
    text: " One of my fav pic of being us 🥹.. suit mei kya dikh rha thaaa😭",
    sticker: "bow",
    tape: "washi-tape-3"
  },
  {
    image: "/images/photo4.png",
    title: "First photo!",
    text: "Our first Garba — a little nervous, but you still clicked it🥹❤️..And somehow, this little moment became one of my favorite memories. ✨.",
    sticker: "camera",
    tape: "washi-tape-1"
  },
  {
    image: "/images/photo5.jpg",
    title: "Upvan ka memory",
    text: "Just a simple selfie, but somehow you make it look so beautiful. ❤️",
    sticker: "bunny",
    tape: "washi-tape-2"
  },
  {
    image: "/images/photo6.jpg",
    title: "My Favorite Person",
    text: "meri ful wali princess..I LOVE YOU SO MUCHH🥹❤️.",
    sticker: "badge",
    tape: "washi-tape-3"
  }
];

const reasons = [
  {
    text: "You have this beautiful way of making me feel loved, wanted, and chosen every single day. With you, I never have to wonder if I matter. ❤️",
    tag: "You make me feel loved✨",
    sticker: "🌸"
  },
  {
    text: "No matter what happens, you never let me down. You understand me even when I don't know how to explain myself, and somehow you always know exactly what I need. 🥹 ",
    tag: "You never let me feel alone💖",
    sticker: "🍓"
  },
  {
    text: "Sometimes you don't even need to say anything. Just your presence makes my day better. You have this special way of making everything feel a little lighter. ✨",
    tag: "You heal me in your own way🧸",
    sticker: "🎀"
  },
  {
    text: "You care for me like I'm your little baby, and with you, I can be my silliest, most childish, happiest self without feeling embarrassed. You brought out a version of me I didn't even know I had. 🧸💗.",
    tag: "You bring out my little-girl side😊",
    sticker: "⭐"
  },
  {
    text: "You have seen my crying, overthinking, emotional, cry-baby version and still stayed right there. 😭❤️ You make me feel safe enough to be completely myself, and that's something I'll always treasure.",
    tag: "You are my safe place💌",
    sticker: "🌷"
  },
  {
    text: "Thank you for being you — for lAnd then there are the tiny things… like bringing me ice cream when I'm feeling low. 🍦🥹 You probably don't realize how much those little gestures mean to me, but they make me feel so deeply cared for.",
    tag: "To Infinity ♾️",
    sticker: "🎂"
  }
];



function App() {
  const [letterOpen, setLetterOpen] = useState(false);
  const [giftOpen, setGiftOpen] = useState(false);
  const [musicPlaying, setMusicPlaying] = useState(false);
  const [showHearts, setShowHearts] = useState(false);
  const [stampedStickers, setStampedStickers] = useState([]);
  const letterRef = useRef(null);

  useEffect(() => {
    document.title = "Happy Birthday Aary❤️ ";

    const createHeart = () => {
      const heart = document.createElement("div");
      heart.className = "cursor-heart";
      heart.innerHTML = ["♥", "💖", "🌸", "✨", "💕"][Math.floor(Math.random() * 5)];

      heart.style.left = `${Math.random() * 95}vw`;
      heart.style.animationDuration = `${3 + Math.random() * 3}s`;
      heart.style.fontSize = `${12 + Math.random() * 16}px`;

      document.body.appendChild(heart);

      setTimeout(() => heart.remove(), 6000);
    };

    const interval = setInterval(createHeart, 1800);

    return () => clearInterval(interval);
  }, []);

  const handleMusicToggle = () => {
    const isNowPlaying = toggleMusic((playing) => {
      setMusicPlaying(playing);
    });
    setMusicPlaying(isNowPlaying);
  };

  const toggleLetter = () => {
    const nextState = !letterOpen;
    setLetterOpen(nextState);
    if (nextState) {
      playSurpriseChime();
    } else {
      playStickerPop();
    }
  };

  const createConfetti = () => {
    playSurpriseChime();
    setGiftOpen(true);
    setShowHearts(true);

    for (let i = 0; i < 90; i++) {
      const piece = document.createElement("div");

      piece.className = "confetti";
      piece.innerHTML = ["❤️", "💗", "✨", "💕", "🌸", "🎂", "🧸", "🎉", "🍰", "🎀"][
        Math.floor(Math.random() * 10)
      ];

      piece.style.left = `${Math.random() * 95}vw`;
      piece.style.animationDelay = `${Math.random() * 1.5}s`;
      piece.style.fontSize = `${14 + Math.random() * 22}px`;

      document.body.appendChild(piece);

      setTimeout(() => piece.remove(), 5500);
    }

    setTimeout(() => setShowHearts(false), 4000);
  };

  const handleAddSticker = (sticker) => {
    setStampedStickers((prev) => [...prev, sticker]);
  };

  const removeStampedSticker = (id) => {
    playStickerPop();
    setStampedStickers((prev) => prev.filter((s) => s.id !== id));
  };

  return (
    <div className="birthday-page">

      {/* NAVBAR */}
      <nav className="navbar">
        <div className="nav-logo">
          for you <span className="pulsing-heart">♥</span>
        </div>

        <div className="nav-links">
          <a href="#letter" onClick={() => playStickerPop()}>Letter</a>
          <a href="#memories" onClick={() => playStickerPop()}>Memories</a>
          <a href="#reasons" onClick={() => playStickerPop()}>Reasons</a>
          <a href="#story" onClick={() => playStickerPop()}>Our Story</a>
          <a href="#surprise" onClick={() => playStickerPop()}>Surprise</a>
        </div>

        <button
          className={`music-button ${musicPlaying ? "playing" : ""}`}
          onClick={handleMusicToggle}
          title={musicPlaying ? "Pause music box" : "Play sweet music box lullaby"}
          aria-label="Toggle Background Music"
        >
          <span className="music-icon">{musicPlaying ? "♫" : "♪"}</span>
          <span className="music-text">{musicPlaying ? "Playing Love Song" : "Play Music"}</span>
          {musicPlaying && (
            <span className="music-waves">
              <span></span><span></span><span></span>
            </span>
          )}
        </button>
      </nav>

      {/* HERO SECTION */}
      <section className="hero">
        <div className="hero-glow glow-1"></div>
        <div className="hero-glow glow-2"></div>

        {/* CUTE DECORATIVE STICKERS IN HERO */}
        <Sticker type="cake" top="14%" right="8%" rotate={12} className="hero-sticker-cake hide-on-xs" />
        <Sticker type="bear" top="20%" left="5%" rotate={-10} className="hero-sticker-bear hide-on-xs" />
        <Sticker type="sparkle" top="35%" right="22%" rotate={15} />
        <Sticker type="sparkle" top="55%" left="18%" rotate={-8} />
        <Sticker type="stamp" bottom="12%" left="10%" rotate={-6} className="hide-on-xs" />

        {/* FLOATING POLAROIDS WITH WASHI TAPES */}
        <div className="floating-photo photo-a">
          <div className="washi-tape tape-top"></div>
          <img
            src="/images/photo1.jpg"
            alt="Us"
            onError={(e) => {
              e.target.style.display = "none";
              e.target.parentElement.classList.add("fallback-photo");
            }}
          />
          <div className="polaroid-caption">Happy aaly✨</div>
        </div>

        <div className="floating-photo photo-b">
          <div className="washi-tape tape-top-right"></div>
          <img
            src="/images/photo2.jpg"
            alt="That smile"
            onError={(e) => {
              e.target.style.display = "none";
              e.target.parentElement.classList.add("fallback-photo");
            }}
          />
          <div className="polaroid-caption">Fav photo💕</div>
        </div>

        <div className="floating-photo photo-c hide-on-sm">
          <div className="washi-tape tape-top"></div>
          <img
            src="/images/photo3.jpg"
            alt="Us laughing"
            onError={(e) => {
              e.target.style.display = "none";
              e.target.parentElement.classList.add("fallback-photo");
            }}
          />
          <div className="polaroid-caption">us hihi🌸</div>
        </div>

        <div className="hero-content">
          <div className="cute-badge-pill">
            <span className="sparkle-star">✨</span>
            A SPECIAL SCRAPBOOK MADE WITH LOVE
            <span className="sparkle-star">✨</span>
          </div>

          <h1>
            Happy
            <br />
            <span className="hero-highlight">Birthday</span>
            <br />
            My Love.
          </h1>

          <p className="hero-description">
            This isn't just a website.
            <br />
            It's a tiny romantic scrapbook of all the little reasons
            <br />
            why having you in my world is my favorite blessing.
          </p>

          <div className="hero-cta-group">
            <a href="#letter" className="primary-button" onClick={() => playStickerPop()}>
              OPEN YOUR LETTER <span>💌</span>
            </a>
            <a href="#surprise" className="secondary-button" onClick={() => playStickerPop()}>
              SEE SURPRISE <span>🎁</span>
            </a>
          </div>
        </div>

        <div className="scroll-indicator">
          <span></span>
          SCROLL TO EXPLORE
        </div>
      </section>

      {/* LETTER SECTION */}
      <section className="letter-section" id="letter">
        <div className="section-header-centered">
          <div className="section-label">
            <span className="label-dot"></span> 01 — A LETTER FOR YOU <span className="label-dot"></span>
          </div>
          <h2>
            Written from <i>the heart.</i>
          </h2>
          <p className="section-desc">Tap the envelope to break the wax seal & read your letter.</p>
        </div>

        <div className="letter-container" ref={letterRef}>
          <div
            className={`envelope ${letterOpen ? "opened" : ""}`}
            onClick={toggleLetter}
            title={letterOpen ? "Click to close envelope" : "Click to open your letter!"}
            role="button"
            tabIndex={0}
          >
            <div className="envelope-back"></div>

            <div className="letter-paper">
              <div className="letter-tape washi-tape-mini"></div>
              <div className="letter-stamp-corner">
                <span>AIR MAIL</span>
                <span className="stamp-heart">♥</span>
              </div>

              <div className="letter-top">
                <span className="dear-text">Dear My Favorite Human,</span>
                <span className="letter-heart">♥</span>
              </div>

              <div className="letter-body">
                <p>
                  <p>
                    Happy Birthday, Aary, to the person who makes my world feel a
                    little brighter just by being in it. ❤️
                  </p>

                  <p>
                    I don't think I say it enough, but I feel so lucky to have you.
                    You have this beautiful way of making me feel loved, chosen,
                    and cared for, even in the smallest little moments.
                  </p>

                  <p>
                    Thank you for understanding me even when I don't understand myself,
                    for handling my cry-baby moments, listening to all my random talks,
                    and for bringing out the most childish, happiest version of me. 🥹
                  </p>

                  <p>
                    Thank you for all the little things too — the hugs, the silly jokes,
                    the endless conversations, and especially the ice creams you bring
                    whenever I'm feeling low. 🍦❤️
                  </p>

                  <p>
                    You have become my safe place, my comfort person, and one of my
                    favorite parts of every day. I hope this new year of your life brings
                    you all the happiness, love, and beautiful things you deserve.
                  </p>

                  <p>
                    And cutu aaly... I hope you always remember that no matter how many
                    birthdays come and go, I'll always be here cheering for you,
                    annoying you, loving you, and making a million more memories with you. ❤️
                  </p>

                  <p className="signature">
                    Always yours,
                    <br />
                    Nandini❤️
                  </p>
                  <br />

                </p>
              </div>
            </div>

            <div className="envelope-front"></div>

            <div className="envelope-flap">
              <div className="wax-seal">
                <span>♥</span>
              </div>
            </div>
          </div>

          <p className="click-hint" onClick={toggleLetter}>
            {letterOpen
              ? "💌 You opened it! (Tap envelope to close, or keep scrolling for memories...)"
              : "✨ Tap the envelope or wax seal to unfold your letter ✨"}
          </p>
        </div>
      </section>

      {/* MEMORIES SECTION */}
      <section className="memories-section" id="memories">
        <div className="section-header">
          <div>
            <div className="section-label">
              <span className="label-dot"></span> 02 — OUR MEMORIES
            </div>
            <h2>
              Little moments.
              <br />
              <i>Big feelings.</i>
            </h2>
          </div>
          <div className="section-header-right">
            <p>
              A cozy scrapbook gallery of moments that made our story the sweetest adventure.
            </p>
            <div className="scrapbook-badge">
              <span>🧸 Polaroids & Memories</span>
            </div>
          </div>
        </div>

        <div className="photo-grid">
          {memories.map((memory, index) => (
            <div
              className={`memory-card card-${index + 1}`}
              key={memory.title}
              onClick={() => playStickerPop()}
            >
              <div className={`card-washi ${memory.tape}`}></div>

              <div className="image-wrapper">
                <img
                  src={memory.image}
                  alt={memory.title}
                  onError={(e) => {
                    e.target.style.display = "none";
                    e.target.nextElementSibling.style.display = "flex";
                  }}
                />
                <div className="img-fallback-placeholder">
                  <span className="fallback-icon">📸</span>
                  <span className="fallback-text">{memory.title}</span>
                  <span className="fallback-sub">Polaroid Memory</span>
                </div>
              </div>

              <div className="memory-card-bottom">
                <div className="memory-info">
                  <span className="memory-idx">PAGE 0{index + 1}</span>
                  <h3>{memory.title}</h3>
                  <p>{memory.text}</p>
                </div>
                <span className="memory-cute-tag">{memory.sticker === "bear" ? "🧸" : memory.sticker === "strawberry" ? "🍓" : memory.sticker === "bow" ? "🎀" : memory.sticker === "camera" ? "📸" : memory.sticker === "bunny" ? "🐰" : "💖"}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* PHOTO STRIP TICKER */}
      <section className="photo-strip">
        <div className="strip-track">
          {[...memories, ...memories].map((memory, index) => (
            <div className="strip-image" key={index}>
              <img
                src={memory.image}
                alt=""
                onError={(e) => {
                  e.target.src = "/images/photo1.jpg";
                }}
              />
              <span className="strip-heart">♥</span>
            </div>
          ))}
        </div>
      </section>

      {/* REASONS SECTION */}
      <section className="reasons-section" id="reasons">
        <div className="section-header-centered">
          <div className="section-label">
            <span className="label-dot"></span> 03 — THINGS I LOVE ABOUT YOU <span className="label-dot"></span>
          </div>
          <h2>
            Six little reasons.
            <br />
            <i>Out of a million.</i>
          </h2>
          <p className="section-desc">Just a few reasons why you mean everything to me.</p>
        </div>

        <div className="reasons-grid">
          {reasons.map((reason, index) => (
            <div
              className="reason-card"
              key={index}
              onClick={() => playStickerPop()}
            >
              <div className="reason-top-row">
                <span className="reason-number">NO. 0{index + 1}</span>
                <span className="reason-tag-pill">{reason.tag}</span>
                <span className="reason-sticker-icon">{reason.sticker}</span>
              </div>

              <p className="reason-body">{reason.text}</p>

              <div className="reason-footer-line">
                <span className="tiny-heart">♡</span>
                <span className="tiny-divider"></span>
                <span className="tiny-text">with love</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* STORY / TIMELINE SECTION */}


      {/* SURPRISE SECTION */}
      <section className="surprise-section" id="surprise">
        <div className="section-label">
          <span className="label-dot"></span> 04 — ONE LAST THING <span className="label-dot"></span>
        </div>

        {!giftOpen ? (
          <div className="surprise-unopened">
            <h2>
              I have one
              <br />
              <i>more surprise.</i>
            </h2>

            <p className="surprise-subtitle">
              You didn't think that was everything, did you? Tap the gift box! 👀
            </p>

            <button
              className="gift"
              onClick={createConfetti}
              aria-label="Open Birthday Surprise Gift Box"
              title="Click to Open Your Gift!"
            >
              <div className="gift-lid">
                <div className="gift-bow">🎀</div>
                <div className="gift-ribbon"></div>
              </div>

              <div className="gift-box">
                <div className="gift-ribbon"></div>
                <div className="gift-sparkles">✨</div>
              </div>

              <span className="gift-label">
                TAP TO OPEN 🎁
              </span>
            </button>
          </div>
        ) : (
          <div className="final-message">
            <div className="final-heart">♥</div>

            <p className="final-small">
              ✨ HAPPY BIRTHDAY TO MY WHOLE WORLD ✨
            </p>

            <h2>
              I love you.
              <br />
              <i>More than words could ever say.</i>
            </h2>

            <p className="final-text">
              Here's to another beautiful year of laughing until our stomachs hurt,
              comforting each other on hard days, late night talks, silly inside jokes,
              eating good food together, and creating memories that will stay with me forever.
            </p>

            <div className="final-signature">
              With all my love and heart,
              <br />
              <strong>Always Yours Nandu! ♥</strong>
            </div>

            <button
              className="replay-surprise-button"
              onClick={() => {
                createConfetti();
              }}
            >
              🎉 Shower More Confetti! ✨
            </button>
          </div>
        )}
      </section>

      {/* FOOTER */}
      <footer>
        <div className="footer-content">
          <div className="footer-heart">♥</div>
          <p>Made with too much love, hugs, kissies and sweet memories.</p>
          <span>Just for you on your special day. Happy Birthday koka, spiderman , mera boka, cutu aaly! 🎂✨</span>
        </div>
      </footer>

      {/* INTERACTIVE USER STAMPED STICKERS */}
      {stampedStickers.map((s) => (
        <div
          key={s.id}
          className="user-stamped-sticker"
          style={{
            left: `${s.x}vw`,
            top: `${s.y}px`,
            transform: `rotate(${s.rot}deg)`
          }}
          onClick={() => removeStampedSticker(s.id)}
          title="Click to remove sticker"
        >
          <span className="stamped-emoji">{s.emoji}</span>
        </div>
      ))}

      {/* FLOATING STICKER BOX PALETTE */}
      <StickerBox onAddSticker={handleAddSticker} />

      {/* MOBILE BOTTOM NAVIGATION */}
      <MobileNav />

      {/* SCREEN HEARTS BURST OVERLAY */}
      {showHearts && (
        <div className="screen-hearts" aria-hidden="true">
          ❤️ 💕 ✨ 🎂 🌸 🧸 💖
        </div>
      )}
    </div>
  );
}

export default App;