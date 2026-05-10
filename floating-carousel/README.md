# Floating Elliptical Cards Carousel

Reproduction fidèle de l'animation Microsoft Edge Copilot hero section.

## Stack

- **React 18** — composants fonctionnels + hooks
- **Framer Motion** — disponible (non utilisé dans le core pour garder le RAF pur à 60fps, mais prêt pour des transitions de cartes)
- **requestAnimationFrame** — animation GPU-accelerated delta-time
- **Vite** — bundler

## Architecture

```
src/
├── components/
│   ├── HeroCarousel.jsx     ← orchestrateur principal
│   └── FloatingCard.jsx     ← carte individuelle (memo)
├── hooks/
│   ├── useAutoRotate.js     ← RAF loop + idle rotation
│   └── useCarouselPhysics.js ← drag + inertia (mouse + touch)
├── utils/
│   └── math.js              ← ellipsePoint, lerp, mapRange, distributeAngles
├── data/
│   └── mockData.js          ← 10 cartes de contenu
├── constants.js             ← ELLIPSE, CARD, ANIMATION
├── App.jsx
├── main.jsx
└── index.css
```

## Installation

```bash
npm install
npm run dev
```

Ouvre http://localhost:5173

## Personnalisation

### Changer le fond
```jsx
<HeroCarousel bg="#f5f0eb" />
```

### Changer la hauteur
```jsx
<HeroCarousel height={600} />
```

### Changer les textes
```jsx
<HeroCarousel
  title="Que voulez-vous explorer ?"
  subtitle="Glissez pour tourner"
/>
```

### Ajuster la vitesse d'auto-rotation
Dans `constants.js` :
```js
export const ANIMATION = {
  AUTO_SPEED: 0.18,  // radians/s — augmenter pour accélérer
  ...
};
```

### Ajuster la forme de l'ellipse
```js
export const ELLIPSE = {
  RX_DESKTOP: 440,  // rayon horizontal (largeur de l'orbite)
  RY_DESKTOP: 190,  // rayon vertical (profondeur de l'arc)
  CENTER_OFFSET_Y: 260,  // px sous le viewport (plus = arc plus plat)
};
```

### Ajouter / modifier les cartes
Dans `src/data/mockData.js` :
```js
{
  id: 11,
  emoji: "🚀",
  title: "Ma nouvelle carte",
  description: "Sous-titre optionnel",
  bg: "#e8f0fd",  // couleur de fond de l'image
}
```

## Logique mathématique

Chaque carte suit une **ellipse paramétrique** :
```
x = cos(θ) × rx
y = sin(θ) × ry
```

- θ = angle de base + offset cumulé (rotation auto + drag)
- L'ellipse est centrée **sous** le viewport (CENTER_OFFSET_Y)
- Seul l'arc supérieur est visible → effet de "plateau flottant"

**Profondeur pseudo-3D** :
- `depth = (sin(θ) + 1) / 2` → 0 = avant, 1 = arrière
- scale, opacity, blur, zIndex interpolés linéairement sur [front, back]

**Performances** :
- Styles mutés directement sur les refs DOM → zéro re-render React pendant l'animation
- `will-change: transform, opacity, filter` sur chaque carte
- `translate3d()` pour forcer GPU compositing
