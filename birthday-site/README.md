# Azam's 17th Birthday Gift ♡

A personal, interactive digital birthday gift made for Azam (nickname: Kavaler) for his 17th birthday.

Designed as an intimate, 4-scene interactive gift rather than a traditional scrolling website.

---

## ✨ Features & Flow (4 Scenes)

1. **Scene 01: INTRO**
   - Playful opening card (*"hey, Kavaler… I didn’t know what to give you. And a normal letter would be boring af. So… I made this instead."*) with the **"open it ♡"** button.

2. **Scene 02: BIRTHDAY MESSAGE**
   - Animated birthday cake with glowing candles (*tap candles to make a wish & blow them out!*).
   - Staggered, warm, personal birthday lines (*"Happy 17th bday... I like you. A lot."*).
   - Button: **"okay, there’s more →"**.

3. **Scene 03: LETTER**
   - Real, authentic, teasing late-night letter with natural small paragraphs:
     - *"Happy birthday"*
     - *"I don’t really know what to say or how to say it because I’m not exactly a poet or Shakespeare like you 🙄 but I do think you’re a really good person"*
     - *"You’re always asking me why I am the way I am and why I do certain things because you actually understand me..."*
     - *"You accept me the way I am and with you it’s just easy because I know you won’t judge me..."*
     - *"Well maybe you will judge me sometimes but I think with time I’ll be able to tell you more about myself without overthinking everything"*
     - *"So don’t think this means you can relax now and get too comfortable because apparently I’m complimenting you a lot right now 🙄"*
     - *"Don’t forget I can still tell you to fuck off just because you’re my boyfriend now"*
     - *"But I do want you to know that you’re important to me and if something ever happens you can trust me and text me anytime"*
     - *"That’s it before I start sounding too nice"*
     - Signature: *"— me ♡"*
   - Button: **"one last thing…"**.

4. **Scene 04: FINAL SURPRISE**
   - Atmosphere softly dims into a calm, intimate evening mood.
   - Timed pause (*"okay, that’s it."*), revealing *"Happy birthday, Kavaler 🩷"*, followed by a delicate celebratory burst of floating hearts and confetti.
   - Button: **"replay from start ↺"**.

---

## 🎶 Micro-Interactions & Ambience

- **Smooth Cinematic Transitions**: Soft blur, slight scale, and gentle fade between scenes.
- **Ambient Floating Hearts**: Lightweight background particles drifting upward, plus interactive 3-heart bursts on tap/click.
- **Background Music**: Discreet toggle button in the top corner playing `assets/music/birthday-song.mp3` with animated soundwave indicator and a built-in Web Audio API synthesizer fallback.
- **Progress Counter**: Subtle `01 / 04` indicator with 4 dots.
- **Mobile First**: Hand-crafted for comfortable one-handed use on phones (375px–430px) and clean on desktop.

---

## 📁 File Structure

```text
birthday-site/
│
├── index.html          # Structure and 4 scene containers
├── style.css           # Styling, transitions, animations & responsive layout
├── script.js           # Interactive engine, animations, and easy configuration
│
├── assets/
│   ├── music/
│   │   └── birthday-song.mp3  # Background music
│   │
│   └── icons/
│       ├── favicon.png
│       └── favicon.svg
│
└── README.md
```

---

## ✏️ How to Edit

Open `script.js`. Right at the top in the **EASY EDIT AREA**:
- You can tweak the letter paragraphs, messages, nickname, or music path at any time.

---

## 🚀 How to Run

Simply open `index.html` in any web browser on your phone, tablet, or computer. No server, backend, or database needed!
