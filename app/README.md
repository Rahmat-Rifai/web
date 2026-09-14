# Portfolio

A personal portfolio site built with React, TypeScript, Vite, and Three.js.

## Tech

- React 19 + TypeScript
- Vite for dev server and build
- Three.js (`@react-three/fiber`) for WebGL scenes
- GSAP for animation
- Lenis for smooth scrolling
- Tailwind CSS

## Getting started

```bash
cd app
npm install
npm run dev
```

Open the local dev URL printed by Vite.

## Build

```bash
npm run build
```

The production build is emitted to `app/dist`.

## Structure

```
app/
  index.html
  package.json
  vite.config.ts
  src/
    main.tsx
    App.tsx
    components/   # feature sections and shared UI
    index.css     # global styles + Tailwind entry
```
