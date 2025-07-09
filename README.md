# Sticker App

A modern interactive web app for creating, dragging, and managing stickers and pins on a customizable board.

## Features

- **Drag & Drop:** Move stickers and pins anywhere on the board (powered by dnd-kit).
- **Edit & Delete:** Edit sticker titles and text, delete stickers and pins.
- **Background Carousel:** Switch board backgrounds with a smooth carousel (embla-carousel-react).
- **Persistent State:** Stickers, pins, and background selection are saved in localStorage.
- **Accessibility:** Keyboard navigation, ARIA labels, and focus management.
- **Responsive UI:** Built with TailwindCSS for a clean, adaptive interface.
- **Unit Tested:** Reliable codebase with Vitest and React Testing Library.

## Tech Stack

- [React](https://react.dev/) + [Vite](https://vitejs.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [TailwindCSS](https://tailwindcss.com/)
- [dnd-kit](https://dndkit.com/)
- [embla-carousel-react](https://www.embla-carousel.com/)
- [Vitest](https://vitest.dev/) & [React Testing Library](https://testing-library.com/)

## Getting Started

```bash
# Install dependencies
npm install

# Start the development server
npm run dev

# Open http://localhost:5173 in your browser
```

## Testing

```bash
# Run all tests
npm run test

# Check code coverage
npm run test -- --coverage
```

- Tests are located in `src/__tests__`
- Coverage summary is shown after tests run

## Project Structure

```
src/
  components/      # React components (Board, Sticker, Pin, Sidebar, etc.)
  assets/          # Images for backgrounds and stickers
  utils/           # Utility functions (localStorage, drag & drop helpers)
  __tests__/       # Unit tests (Vitest + RTL)
  index.css        # TailwindCSS styles
  main.tsx         # App entry point
```

## Scripts

| Command             | Description                      |
|---------------------|----------------------------------|
| `npm run dev`       | Start development server         |
| `npm run build`     | Build for production             |
| `npm run preview`   | Preview production build locally |
| `npm run test`      | Run unit tests                   |

