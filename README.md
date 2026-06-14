# 🌍 Dancing Globe

A browser-based, real-time 3D solar system explorer. Every texture is procedurally generated in JavaScript — no image assets required. Explore all 8 planets, the Sun, and Earth's Moon, each with scientifically accurate stats and unique visual detail.

---

## ✨ Features

- **10 celestial bodies** — Sun, Mercury, Venus, Earth, Moon, Mars, Jupiter, Saturn, Uranus, and Neptune
- **Fully procedural textures** — All surfaces are generated at runtime using fractal Brownian motion (fBm) noise; no external image files needed
- **Per-body atmosphere shaders** — Custom GLSL rim-lighting shaders simulate atmospheric glow for bodies that have one
- **Cloud layer** — Animated, independently drifting cloud mesh for Venus and Earth (togglable)
- **Saturn & Uranus rings** — Procedural ring texture with realistic gap zones and UV-mapped geometry, with a subtle shadow cast on the planet body
- **Real-time rotation stats** — Live latitude, longitude, and zoom readout as you spin the globe
- **Info panel** — Diameter, distance from Sun, day length, year length, moon count, surface temperature, and gravity for every body
- **Star field** — 6,000 randomised stars with slow rotation and subtle camera-follow sway
- **GSAP-powered transitions** — Bodies scale in/out with an elastic spring animation when switching
- **Loading screen** — Animated progress bar and spinner while textures generate

---

## 🕹️ Controls

### Mouse / Touch

| Action | Effect |
|---|---|
| Drag | Spin the globe |
| Scroll wheel | Zoom in / out |
| Two-finger pinch | Zoom in / out (touch) |

### Keyboard

| Key | Action |
|---|---|
| `1` – `0` | Switch body (1=Sun … 0=Neptune) |
| `Space` | Toggle auto-spin |
| `R` | Reset orientation and zoom |
| `+` / `=` | Zoom in |
| `-` | Zoom out |
| `C` | Toggle clouds |
| `←` / `→` | Cycle to previous / next body |

### Toolbar (on-screen)

| Button | Function |
|---|---|
| ↺ Reset | Return to default tilt and zoom |
| ⟳ Auto Spin | Toggle automatic rotation |
| `+` / `−` | Step zoom in / out |
| ☁ Clouds | Show/hide cloud layer |
| ◎ Rings | Show/hide ring system |

---

## 🪐 Celestial Bodies

| Body | Type | Notable Feature |
|---|---|---|
| Sun | Star (G2V) | Animated plasma surface + additive glow shader |
| Mercury | Terrestrial | Heavily cratered grey surface |
| Venus | Terrestrial | Thick banded atmosphere, slow retrograde clouds |
| Earth | Terrestrial | Procedural continents, polar ice, cloud layer |
| Moon | Natural Satellite | Maria, craters, and highland regions |
| Mars | Terrestrial | Polar ice caps, red iron-oxide terrain |
| Jupiter | Gas Giant | Banded atmosphere with storm spots |
| Saturn | Gas Giant | Multi-gap ring system with planet shadow |
| Uranus | Ice Giant | Pale teal methane atmosphere, tilted rings |
| Neptune | Ice Giant | Deep blue, subtle cloud banding |

---

## 📁 File Structure

```
├── index.html   # HTML shell — canvas, loader, UI panels, planet selector
├── style.css    # All styling — dark theme via CSS variables, responsive layout
└── script.js    # Everything else — texture generation, Three.js scene, input, animation loop
```

---

## 🚀 Getting Started

No build step or package manager required. Open `index.html` directly or serve it locally:

```bash
# Simple local server (avoids any file:// quirks with canvas)
npx serve .
# or
python -m http.server 8080
```

Then open `http://localhost:8080` in any modern browser.

> **Note:** Texture generation runs on the main thread and takes ~0.5–1 second on first load. The loading screen tracks progress. Generated textures are cached in memory so switching back to a previously visited body is instant.

---

## 🛠️ How It Works

### Procedural Textures

All surfaces are painted pixel-by-pixel onto `<canvas>` elements using layered fractal Brownian motion (fBm), then handed to Three.js as `CanvasTexture` objects.

- **fBm noise** — 6 octaves of smooth value noise give organic, continent-like shapes
- **Earth** — Elevation threshold separates land from ocean; latitude bands determine biome colour (tropical, temperate, boreal, polar); ice caps grow dynamically
- **Gas giants** — Sinusoidal latitude bands combined with turbulence noise simulate belt/zone structure; fBm "storm" hotspots appear above a threshold
- **Sun** — Two overlapping fBm layers in warm hues create a churning plasma look, animated by a slow time offset in the render loop
- **Rings (Saturn/Uranus)** — 1D texture (512 × 1 px, tiled vertically) with three hardcoded gap regions and fBm density variation; UV-remapped `RingGeometry` applies it radially

### Atmosphere Shader

Bodies with `hasAtmo: true` get two GLSL mesh layers:

1. **Outer glow** — Back-face `ShaderMaterial` with a rim `pow(dot, 3.2)` function and additive blending
2. **Inner rim** — Front-face layer with a tighter `pow(dot, 5)` for a subtle limb glow

### Rendering Pipeline

- **Three.js r128** — WebGL renderer with ACES filmic tone mapping
- **Lighting** — Directional sun light + ambient + hemisphere + fill light for planet shading; a `PointLight` at the Sun's centre when viewing the Sun
- **Inertia** — Drag velocity decays at `0.93×` per frame, giving a natural spin-and-coast feel
- **Camera sway** — Mouse position smoothly offsets the camera with a `0.012` lerp factor

---

## 📦 Dependencies

| Library | Version | Purpose |
|---|---|---|
| [Three.js](https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js) | r128 | 3D rendering (WebGL) |
| [GSAP](https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js) | 3.12.5 | Body switch animations |
| [Google Fonts](https://fonts.google.com) | — | Inter, Space Grotesk, JetBrains Mono |

All loaded via CDN — no `npm install` needed.

---

## 🌐 Browser Support

Requires WebGL 1.0 support. Works in all modern browsers (Chrome, Firefox, Safari, Edge). JavaScript must be enabled.
