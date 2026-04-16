# mac-portfolio

A macOS-inspired interactive portfolio built with React, TypeScript, and Vite. It simulates a desktop OS experience with draggable windows, a customizable dock, and a handful of portfolio-focused apps.

Live demo: https://dhunjadi.github.io/mac-portfolio/

## Features

- Boot, login, sleep, restart, and shutdown flow (`/turn-on` -> `/` -> `/turn-off`)
- Desktop UI with menu bar, control center, dock, draggable windows, and overlays
- Spotlight search from the menu bar and keyboard shortcut (`Mod+B`)
- Launchpad overlay with an app grid for quick window launching (Dock icon + ESC to close)
- Window management with focus, z-index stacking, minimize/restore, maximize, and resizing
- Dock with magnification, drag-to-reorder, active indicators, and left/bottom/right positioning
- Settings window with theme preference (light/dark/auto), accent color, and highlight color controls
- Wallpaper switching with preloaded transitions
- Dock sizing and icon scale controls
- Language toggle (English/Croatian)
- Finder window showing a desktop panel
- About This Dev window with experience, skills, and education accordion
- Calculator app
- Weather app (search, current conditions, hourly + daily forecast)
- Text editor with sample file load, TXT import, and download
- Resume PDF viewer with zoom
- Brightness overlay via Control Center slider
- Persistent UI state via localStorage (settings, dock order, power/login state)

## Tech Stack

- React 19 + TypeScript
- Vite 7
- React Router 7
- Zustand (state management + persistence)
- Framer Motion (dock magnification + animations)
- React RND (draggable/resizable windows and dialogs)
- React Query + Axios (weather data)
- React PDF (resume viewer)
- i18next + react-i18next (EN/HR localization)
- Day.js (menu bar clock)
- Sass (SCSS)
- Vitest + Testing Library
- ESLint + Husky

## Configuration Notes

- Weather data comes from OpenWeatherMap. The API key is currently hardcoded in `src/services/services.ts`. Replace it with your own key if needed.
- The resume PDF is served from `public/resume.pdf`, and the desktop icon preview uses `public/resume-preview.jpg`.
- Desktop personalization values are applied through root CSS custom properties and `data-*` attributes from `src/screens/DesktopScreen.tsx`.

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
