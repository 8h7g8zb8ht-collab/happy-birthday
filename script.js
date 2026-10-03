// ==========================================================================
// EASY EDIT AREA
// Edit Azam's information, messages, and letter here.
// The site automatically uses these values across all 4 scenes.
// ==========================================================================
export const birthdayConfig = {
  name: "Azam",
  nickname: "Kavaler",
  age: 17,

  // Scene 01: Intro
  introMessage: {
    kicker: "hey, Kavaler…",
    headline: "I didn’t know what to give you.",
    subtext1: "And a normal letter would be boring af.",
    subtext2: "So… I made this instead.",
    button: "open it ♡"
  },

  // Scene 02: Birthday Message & Cake
  birthdayMessage: {
    heading: "Happy 17th Birthday, Azam ♡",
    paragraphs: [
      "Happy 17th bday.",
      "I’m genuinely happy that you’re where you wanted to be, and I’m happy that everything somehow turned out this way.",
      "You’re a really important part of my life, and I’m really glad we managed to talk everything through.",
      "I feel like you’re the right person for me… which is probably also why it scares me a little.",
      "But I guess that’s okay for now.",
      "I like you. A lot."
    ],
    button: "okay, there’s more →"
  },

  // Scene 03: The Letter (Personal, teasing, natural text)
  letter: {
    heading: "okay, serious part for a second.",
    paragraphs: [
      "Happy birthday",
      "I don’t really know what to say or how to say it because I’m not exactly a poet or Shakespeare like you 🙄 but I do think you’re a really good person",
      "You’re always asking me why I am the way I am and why I do certain things because you actually understand me. You notice things that other people don’t and somehow you notice the things that actually matter to me",
      "You accept me the way I am and with you it’s just easy because I know you won’t judge me",
      "Well maybe you will judge me sometimes but I think with time I’ll be able to tell you more about myself without overthinking everything",
      "So don’t think this means you can relax now and get too comfortable because apparently I’m complimenting you a lot right now 🙄",
      "Don’t forget I can still tell you to fuck off just because you’re my boyfriend now",
      "But I do want you to know that you’re important to me and if something ever happens you can trust me and text me anytime",
      "That’s it before I start sounding too nice"
    ],
    signature: "— me ♡",
    button: "one last thing…"
  },

  // Scene 04: Final Surprise
  finalMessage: {
    intro: "okay, that’s it.",
    heading: "Happy birthday, Kavaler 🩷",
    subnote: "seventeen looks good on you",
    replayButton: "replay from start ↺"
  },

  // Music File (Local relative path)
  music: "./assets/music/birthday-song.mp3"
};

// ==========================================================================
// APPLICATION LOGIC & INTERACTION ENGINE (4 SCENES)
// ==========================================================================

let currentScene = 1;
const TOTAL_SCENES = 4;
let isTransitioning = false;

// Audio state
let isMusicPlaying = false;
let audioContext = null;
let synthTimer = null;

// DOM Elements cache
const DOM = {
  scenes: [],
  progressText: document.getElementById('progress-text'),
  progressDots: document.querySelectorAll('.progress-dots .dot'),
  btnPrev: document.getElementById('btn-prev'),
  btnMusic: document.getElementById('btn-music'),
  bgAudio: document.getElementById('bg-audio'),
  heartsCanvas: document.getElementById('hearts-canvas'),
  // Scene 02 Cake
  interactiveCake: document.getElementById('interactive-cake'),
  wishHint: document.getElementById('wish-hint'),
  // Scene 04 Final
  finalIntro: document.getElementById('final-intro'),
  finalReveal: document.getElementById('final-reveal'),
  finalActions: document.getElementById('final-actions'),
  btnRestart: document.getElementById('btn-restart')
};

// Cache all scenes 1 through 4
for (let i = 1; i <= TOTAL_SCENES; i++) {
  DOM.scenes[i] = document.getElementById(`scene-${i}`);
}

// ==========================================================================
// DYNAMIC HYDRATION (Apply birthdayConfig values to DOM)
// ==========================================================================
function hydrateContent() {
  // Scene 01
  const kicker = document.getElementById('intro-kicker');
  const headline = document.getElementById('intro-title');
  const sub1 = document.getElementById('intro-subtext-1');
  const sub2 = document.getElementById('intro-subtext-2');
  const btnStart = document.getElementById('btn-start');
  if (kicker) kicker.textContent = birthdayConfig.introMessage.kicker;
  if (headline) headline.textContent = birthdayConfig.introMessage.headline;
  if (sub1) sub1.textContent = birthdayConfig.introMessage.subtext1;
  if (sub2) sub2.textContent = birthdayConfig.introMessage.subtext2;
  if (btnStart) btnStart.querySelector('span').textContent = birthdayConfig.introMessage.button;

  // Scene 02
  const bdayTitle = document.getElementById('bday-title');
  const bdayMsg = document.getElementById('bday-message');
  const btnScene2Next = document.getElementById('btn-scene-2-next');
  if (bdayTitle) bdayTitle.textContent = birthdayConfig.birthdayMessage.heading;
  if (btnScene2Next) btnScene2Next.querySelector('span').textContent = birthdayConfig.birthdayMessage.button;
  if (bdayMsg && birthdayConfig.birthdayMessage.paragraphs) {
    bdayMsg.innerHTML = birthdayConfig.birthdayMessage.paragraphs.map((p, idx) => {
      let extraClass = '';
      if (idx === 3) extraClass = 'font-serif italic text-accent';
      if (idx === 4) extraClass = 'text-sm';
      if (idx === 5) extraClass = 'font-medium text-dark';
      return `<p class="stagger-line ${extraClass}">${p}</p>`;
    }).join('');
  }

  // Scene 03 Letter
  const letterHeading = document.getElementById('letter-heading');
  const letterBody = document.getElementById('letter-body');
  const letterSig = document.getElementById('letter-signature');
  const btnScene3Next = document.getElementById('btn-scene-3-next');
  if (letterHeading) letterHeading.textContent = birthdayConfig.letter.heading;
  if (letterSig) letterSig.textContent = birthdayConfig.letter.signature;
  if (btnScene3Next) btnScene3Next.querySelector('span').textContent = birthdayConfig.letter.button;
  if (letterBody && birthdayConfig.letter.paragraphs) {
    letterBody.innerHTML = birthdayConfig.letter.paragraphs.map((p, idx) => {
      if (idx === 0) {
        return `<p class="letter-p greeting font-serif">${p}</p>`;
      }
      if (idx === birthdayConfig.letter.paragraphs.length - 1) {
        return `<p class="letter-p font-serif italic text-accent">${p}</p>`;
      }
      return `<p class="letter-p">${p}</p>`;
    }).join('');
  }

  // Scene 04 Final Surprise
  const finalIntro = document.getElementById('final-intro');
  const finalHeading = document.getElementById('final-heading');
  const btnRestart = document.getElementById('btn-restart');
  if (finalIntro) finalIntro.textContent = birthdayConfig.finalMessage.intro;
  if (finalHeading) finalHeading.textContent = birthdayConfig.finalMessage.heading;
  if (btnRestart) btnRestart.querySelector('span').textContent = birthdayConfig.finalMessage.replayButton;

  // Music Source
  if (DOM.bgAudio) {
    DOM.bgAudio.src = birthdayConfig.music;
  }
}

// ==========================================================================
// SCENE TRANSITIONS (Cinematic, Soft Blur, Slight Scale, Fade)
// ==========================================================================
export function goToScene(targetScene) {
  if (isTransitioning || targetScene === currentScene || targetScene < 1 || targetScene > TOTAL_SCENES) {
    return;
  }

  isTransitioning = true;
  const currentEl = DOM.scenes[currentScene];
  const targetEl = DOM.scenes[targetScene];

  // 1. Current scene exits: slight scale down, soft blur, fade out
  currentEl.classList.remove('active');
  currentEl.classList.add('exiting');

  // 2. Prepare target scene
  targetEl.classList.remove('exiting');

  // Atmosphere adjustment for final scene (Scene 04)
  if (targetScene === 4) {
    document.body.classList.add('final-mood');
  } else {
    document.body.classList.remove('final-mood');
  }

  // Back button visibility (Visible on scenes 2 & 3)
  if (targetScene > 1 && targetScene < 4) {
    DOM.btnPrev?.classList.remove('hidden');
  } else {
    DOM.btnPrev?.classList.add('hidden');
  }

  // Progress counter and dots
  updateProgress(targetScene);

  // Transition timing: halfway through exit, bring target scene in
  setTimeout(() => {
    currentEl.classList.remove('exiting');
    targetEl.classList.add('active');

    // Trigger scene-specific staggered reveals
    onSceneEntered(targetScene);

    setTimeout(() => {
      currentScene = targetScene;
      isTransitioning = false;
    }, 450);
  }, 350);
}

function updateProgress(sceneNum) {
  if (DOM.progressText) {
    DOM.progressText.textContent = `0${sceneNum} / 0${TOTAL_SCENES}`;
  }
  DOM.progressDots.forEach((dot, idx) => {
    if (idx + 1 === sceneNum) {
      dot.classList.add('active');
    } else {
      dot.classList.remove('active');
    }
  });
}

function onSceneEntered(sceneNum) {
  // Scene 02: reset lines animation if re-entered
  if (sceneNum === 2) {
    const lines = document.querySelectorAll('.stagger-line');
    lines.forEach(l => {
      l.style.animation = 'none';
      void l.offsetHeight; // trigger reflow
      l.style.animation = '';
    });
  }

  // Scene 04: Final Scene with intentional pauses
  if (sceneNum === 4) {
    if (DOM.finalIntro) {
      DOM.finalIntro.style.opacity = '1';
    }
    if (DOM.finalReveal) {
      DOM.finalReveal.classList.add('hidden');
    }
    if (DOM.finalActions) {
      DOM.finalActions.classList.add('hidden');
    }

    // Pause ~1s then reveal the heartfelt final greeting
    setTimeout(() => {
      if (DOM.finalReveal) {
        DOM.finalReveal.classList.remove('hidden');
      }

      // After another 1.2s pause, spawn celebration heart/sparkle burst
      setTimeout(() => {
        spawnCelebrationConfetti();
        if (DOM.finalActions) {
          DOM.finalActions.classList.remove('hidden');
        }
      }, 1200);
    }, 1000);
  }
}

// ==========================================================================
// SCENE SPECIFIC INTERACTIONS
// ==========================================================================

// Scene 02: Interactive Cake (Blow out candles)
if (DOM.interactiveCake) {
  DOM.interactiveCake.addEventListener('click', () => {
    if (!DOM.interactiveCake.classList.contains('blown-out')) {
      DOM.interactiveCake.classList.add('blown-out');
      if (DOM.wishHint) {
        DOM.wishHint.textContent = "wish made ✨";
        DOM.wishHint.style.color = "var(--color-burgundy)";
      }
      // Small celebratory particle burst at the cake
      const rect = DOM.interactiveCake.getBoundingClientRect();
      createHeartBurst(rect.left + rect.width / 2, rect.top + 20, 6);
    }
  });

  // Accessible keyboard enter/space
  DOM.interactiveCake.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      DOM.interactiveCake.click();
    }
  });
}

// Scene 04 Restart
if (DOM.btnRestart) {
  DOM.btnRestart.addEventListener('click', () => {
    // Reset candle state
    if (DOM.interactiveCake) {
      DOM.interactiveCake.classList.remove('blown-out');
      if (DOM.wishHint) {
        DOM.wishHint.textContent = "tap candles to make a wish ✨";
        DOM.wishHint.style.color = "var(--color-gold)";
      }
    }
    goToScene(1);
  });
}

// Previous Scene Navigation Button
if (DOM.btnPrev) {
  DOM.btnPrev.addEventListener('click', () => {
    if (currentScene > 1) {
      goToScene(currentScene - 1);
    }
  });
}

// Forward Navigation Buttons
document.getElementById('btn-start')?.addEventListener('click', () => goToScene(2));
document.getElementById('btn-scene-2-next')?.addEventListener('click', () => goToScene(3));
document.getElementById('btn-scene-3-next')?.addEventListener('click', () => goToScene(4));

// ==========================================================================
// BACKGROUND MUSIC WITH WEB AUDIO API FALLBACK
// ==========================================================================
if (DOM.btnMusic) {
  DOM.btnMusic.addEventListener('click', toggleMusic);
}

function toggleMusic() {
  if (isMusicPlaying) {
    pauseMusic();
  } else {
    playMusic();
  }
}

function playMusic() {
  isMusicPlaying = true;
  DOM.btnMusic?.classList.add('is-playing');
  DOM.btnMusic?.setAttribute('aria-pressed', 'true');
  
  const iconPaused = DOM.btnMusic?.querySelector('.icon-music-paused');
  const soundWave = DOM.btnMusic?.querySelector('.sound-wave');
  if (iconPaused) iconPaused.classList.add('hidden');
  if (soundWave) soundWave.classList.remove('hidden');

  if (DOM.bgAudio) {
    const playPromise = DOM.bgAudio.play();
    if (playPromise !== undefined) {
      playPromise.catch((err) => {
        console.log("Audio file play fallback to Web Audio synth:", err);
        startSynthMelody();
      });
    }
  } else {
    startSynthMelody();
  }
}

function pauseMusic() {
  isMusicPlaying = false;
  DOM.btnMusic?.classList.remove('is-playing');
  DOM.btnMusic?.setAttribute('aria-pressed', 'false');

  const iconPaused = DOM.btnMusic?.querySelector('.icon-music-paused');
  const soundWave = DOM.btnMusic?.querySelector('.sound-wave');
  if (iconPaused) iconPaused.classList.remove('hidden');
  if (soundWave) soundWave.classList.add('hidden');

  if (DOM.bgAudio) {
    DOM.bgAudio.pause();
  }
  stopSynthMelody();
}

// Built-in Web Audio API Music Box synthesizer fallback
function startSynthMelody() {
  try {
    if (!audioContext) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      audioContext = new AudioCtx();
    }
    if (audioContext.state === 'suspended') {
      audioContext.resume();
    }

    const melody = [
      { f: 392.00, d: 0.5 }, { f: 392.00, d: 0.25 }, { f: 440.00, d: 0.75 }, { f: 392.00, d: 0.75 },
      { f: 523.25, d: 0.75 }, { f: 493.88, d: 1.5 },
      { f: 392.00, d: 0.5 }, { f: 392.00, d: 0.25 }, { f: 440.00, d: 0.75 }, { f: 392.00, d: 0.75 },
      { f: 587.33, d: 0.75 }, { f: 523.25, d: 1.5 },
      { f: 392.00, d: 0.5 }, { f: 392.00, d: 0.25 }, { f: 783.99, d: 0.75 }, { f: 659.25, d: 0.75 },
      { f: 523.25, d: 0.75 }, { f: 493.88, d: 0.75 }, { f: 440.00, d: 1.25 }
    ];

    let noteIdx = 0;
    function playNext() {
      if (!isMusicPlaying || !audioContext) return;
      const n = melody[noteIdx];
      playChime(n.f, n.d * 0.85);
      noteIdx = (noteIdx + 1) % melody.length;
      synthTimer = setTimeout(playNext, n.d * 900);
    }
    playNext();
  } catch (e) {
    console.warn("Web audio unavailable", e);
  }
}

function playChime(freq, dur) {
  if (!audioContext) return;
  const now = audioContext.currentTime;
  const osc = audioContext.createOscillator();
  const gain = audioContext.createGain();

  osc.type = 'sine';
  osc.frequency.setValueAtTime(freq, now);

  gain.gain.setValueAtTime(0, now);
  gain.gain.linearRampToValueAtTime(0.08, now + 0.04);
  gain.gain.exponentialRampToValueAtTime(0.0001, now + dur);

  osc.connect(gain);
  gain.connect(audioContext.destination);

  osc.start(now);
  osc.stop(now + dur + 0.1);
}

function stopSynthMelody() {
  if (synthTimer) {
    clearTimeout(synthTimer);
    synthTimer = null;
  }
}

// ==========================================================================
// FLOATING HEARTS BACKGROUND CANVAS & INTERACTIVE BURSTS
// ==========================================================================
const canvas = DOM.heartsCanvas;
let ctx = canvas ? canvas.getContext('2d') : null;
let hearts = [];
let confetti = [];
let width = window.innerWidth;
let height = window.innerHeight;

function resizeCanvas() {
  if (!canvas || !ctx) return;
  width = window.innerWidth;
  height = window.innerHeight;
  canvas.width = width * window.devicePixelRatio;
  canvas.height = height * window.devicePixelRatio;
  ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
}

window.addEventListener('resize', resizeCanvas);
resizeCanvas();

class AmbientHeart {
  constructor(x, y, isBurst = false) {
    this.x = x !== undefined ? x : Math.random() * width;
    this.y = y !== undefined ? y : height + Math.random() * 40;
    this.size = Math.random() * 8 + 6;
    this.speedY = isBurst ? (Math.random() * -2.5 - 1.5) : (Math.random() * -0.6 - 0.3);
    this.speedX = isBurst ? (Math.random() * 3 - 1.5) : (Math.sin(Math.random() * Math.PI) * 0.4);
    this.opacity = isBurst ? 0.8 : (Math.random() * 0.25 + 0.12);
    this.rotation = Math.random() * Math.PI * 2;
    this.rotSpeed = (Math.random() - 0.5) * 0.02;
    this.isBurst = isBurst;
    this.life = 1.0;
    this.decay = isBurst ? (Math.random() * 0.015 + 0.008) : 0.001;
    
    const tones = ['#7D2E3B', '#9B3D4C', '#D4AF37', '#E5A4AC'];
    this.color = tones[Math.floor(Math.random() * tones.length)];
  }

  update() {
    this.y += this.speedY;
    this.x += this.speedX + Math.sin(this.y * 0.02) * 0.3;
    this.rotation += this.rotSpeed;
    if (this.isBurst) {
      this.life -= this.decay;
      this.speedX *= 0.98;
    } else {
      if (this.y < -20) {
        this.y = height + 20;
        this.x = Math.random() * width;
      }
    }
  }

  draw(context) {
    if (!context) return;
    context.save();
    context.translate(this.x, this.y);
    context.rotate(this.rotation);
    context.globalAlpha = Math.max(0, this.opacity * this.life);
    context.fillStyle = this.color;

    const s = this.size;
    context.beginPath();
    context.moveTo(0, s * 0.3);
    context.bezierCurveTo(-s * 0.5, -s * 0.3, -s, s * 0.2, 0, s);
    context.bezierCurveTo(s, s * 0.2, s * 0.5, -s * 0.3, 0, s * 0.3);
    context.fill();
    context.restore();
  }
}

class ConfettiParticle {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.size = Math.random() * 5 + 3;
    this.speedX = (Math.random() - 0.5) * 5;
    this.speedY = Math.random() * -6 - 2;
    this.gravity = 0.12;
    this.opacity = 1.0;
    this.rotation = Math.random() * 360;
    this.rotSpeed = (Math.random() - 0.5) * 8;
    const colors = ['#D4AF37', '#F4DFE1', '#FAF6EE', '#7D2E3B', '#FFE082'];
    this.color = colors[Math.floor(Math.random() * colors.length)];
  }

  update() {
    this.speedY += this.gravity;
    this.x += this.speedX;
    this.y += this.speedY;
    this.rotation += this.rotSpeed;
    this.opacity -= 0.008;
  }

  draw(context) {
    if (this.opacity <= 0) return;
    context.save();
    context.translate(this.x, this.y);
    context.rotate((this.rotation * Math.PI) / 180);
    context.globalAlpha = Math.max(0, this.opacity);
    context.fillStyle = this.color;
    context.fillRect(-this.size / 2, -this.size / 2, this.size, this.size * 0.6);
    context.restore();
  }
}

// Seed initial subtle ambient hearts
const AMBIENT_HEART_COUNT = 16;
for (let i = 0; i < AMBIENT_HEART_COUNT; i++) {
  const h = new AmbientHeart();
  h.y = Math.random() * height;
  hearts.push(h);
}

export function createHeartBurst(x, y, count = 3) {
  for (let i = 0; i < count; i++) {
    hearts.push(new AmbientHeart(x, y, true));
  }
}

function spawnCelebrationConfetti() {
  const centerX = width / 2;
  const centerY = height * 0.45;
  for (let i = 0; i < 40; i++) {
    confetti.push(new ConfettiParticle(centerX, centerY));
  }
  for (let i = 0; i < 15; i++) {
    hearts.push(new AmbientHeart(centerX + (Math.random() - 0.5) * 60, centerY, true));
  }
}

// Interactive tap/click listener for heart bursts
window.addEventListener('pointerdown', (e) => {
  if (e.target.closest('button, .cake-illustration, a')) {
    return;
  }
  createHeartBurst(e.clientX, e.clientY, 3);
});

// Main Canvas Animation Loop
function animateParticles() {
  if (ctx) {
    ctx.clearRect(0, 0, width, height);

    for (let i = hearts.length - 1; i >= 0; i--) {
      const h = hearts[i];
      h.update();
      h.draw(ctx);
      if (h.isBurst && h.life <= 0) {
        hearts.splice(i, 1);
      }
    }

    for (let i = confetti.length - 1; i >= 0; i--) {
      const c = confetti[i];
      c.update();
      c.draw(ctx);
      if (c.opacity <= 0 || c.y > height + 20) {
        confetti.splice(i, 1);
      }
    }
  }
  requestAnimationFrame(animateParticles);
}
requestAnimationFrame(animateParticles);

// ==========================================================================
// INITIALIZATION
// ==========================================================================
document.addEventListener('DOMContentLoaded', () => {
  hydrateContent();
  updateProgress(1);
});
