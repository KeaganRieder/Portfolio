# Portfolio Website

A modern, interactive portfolio website built with React and TypeScript, featuring a unique desktop-inspired user interface. This portfolio showcases my work across multiple disciplines including web development, game development, digital art, and 3D modeling.

## Features

- **Desktop UI Experience**: Navigate through a computer desktop-like interface
- **Project Showcase**: Projects are organized into folder-style categories, each opening as its own window
- **About Me Section**: Personal biography, skills, and a link to my resume
- **Email App**: Send me a message directly from the desktop via EmailJS
- **Responsive Design**: Optimized for various screen sizes
- **Interactive Applications**: Each section opens as a desktop application window

## Tech Stack

- **Frontend**: React 19.2
- **Language**: TypeScript 5.9
- **Build Tool**: Vite 7.3
- **Styling**: CSS3 with custom styling (semantic color/font custom properties in `src/shared/style/`)
- **Email**: EmailJS (`@emailjs/browser`) for the in-app Email application
- **Linting**: ESLint with React hooks + TypeScript-ESLint support

## Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/KeaganRieder/Portfolio.git
   cd Portfolio
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173` to view the portfolio

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Type-check and build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint for code quality

## Project Structure

```
src/
├── main.tsx                    # Application entry point — mounts the desktop
├── main.css                    # Global reset (box-sizing, full-height html/body)
├── vite-env.d.ts
├── shared/                     # Cross-cutting, feature-agnostic code
│   ├── style/                  #   CSS custom properties (color.css, font.css)
│   └── types/                  #   Shared TS types (skill, sectionType, vectors)
├── system/                     # The "OS" shell that everything else plugs into
│   ├── desktop/                #   Root desktop surface + taskbar composition
│   ├── window/                 #   Draggable/resizable Application window chrome
│   ├── registery/               #   App registry: auto-discovers apps, wires projects
│   │                            #   and categories into one openable-window list
│   ├── shortcut/                #   Desktop/taskbar icon shortcuts
│   ├── search/                   #   Taskbar search input
│   └── services/                  #   analyticService.ts, etc.
├── windows/                    # Hand-written top-level apps (auto-discovered via appEntry.ts)
│   ├── about_me/                #   About Me app (biography, skills)
│   └── email/                    #   Email app (EmailJS contact form)
├── projects/                   # Everything related to the project showcase
│   ├── showcase.tsx             #   "Projects" app — grid of category buttons
│   ├── categories.tsx           #   Category button + category window
│   ├── project.tsx              #   Single project overview card + window
│   ├── models.ts                #   ProjectEntryProperties type (the project data shape)
│   ├── renderer/                 #   Renders a project's `content` sections
│   │   └── sections/              #     image, captionedImage, embed, etc.
│   └── entries/                  #   Per-project content (information.ts) + media,
│                                  #   grouped by category folder (video_games/, websites/, etc.)
│       └── projectsEntries.ts     #     Auto-discovers every information.ts via import.meta.glob
└── assets/                     # Shared, non-project images (icons, buttons, backgrounds)
```

Adding a new project, project category, or top-level app section does not require touching the registry — see [docs/HowToAdd.md](docs/HowToAdd.md) for the walkthrough.

## Design Philosophy

This portfolio embraces a nostalgic desktop computing aesthetic while maintaining modern web standards. The interface mimics familiar desktop interactions, making navigation intuitive and engaging for visitors exploring my work.

## Deployment

The project is configured for easy deployment with Vite:

```bash
npm run build
```

The built files will be in the `dist/` directory, ready for deployment to any static hosting service. The Vite `base` path is set to `/Portfolio/` (see `vite.config.ts`) for GitHub Pages.

## Contact

Feel free to explore the portfolio and reach out through my email provided in the email app or through my contact information found on my cover letter or resume.
