# mac-portfolio

A macOS-inspired interactive portfolio built with React, TypeScript, and Vite.

Live demo: https://dhunjadi.github.io/mac-portfolio/

## Features

- Boot screen flow with route protection (`/turn-on` -> `/`)
- Desktop-style UI with menu bar, dock, draggable windows, and overlays
- Login overlay (type any password to enter)
- Portfolio window (`About This Dev`) with experience and skills
- Functional calculator window
- Settings window with:
  - Wallpaper switching
  - Glass color selection
  - Blur and transparency controls
- Shutdown modal with countdown and shutdown overlay
- Responsive dock behavior for desktop/mobile sizing

## Tech Stack

- React 19 + TypeScript
- Vite 7
- Zustand (state management)
- React Router 7
- Framer Motion (dock interactions)
- React RND (draggable windows/modals)
- Sass (SCSS)
- Vitest + Testing Library
- ESLint + Husky

## Getting Started

### Prerequisites

- Node.js 18+ (Node 20+ recommended)
- npm

### Installation

```bash
npm install
```

### Run Locally

```bash
npm run dev
```
