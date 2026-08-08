# Portfolio Website

A modern, interactive portfolio website built with React and TypeScript, featuring a unique desktop-inspired user interface. This portfolio showcases my work across multiple disciplines including web development, game development, digital art, and 3D modeling.

##  Features

- **Desktop UI Experience**: Navigate through a computer desktop-like interface
- **Project Showcase**: Organized project categories
- **About Me Section**: Personal biography, skills, and a link to my resume
- **Email App**: Send me a message directly from the desktop via EmailJS
- **Responsive Design**: Optimized for various screen sizes
- **Interactive Applications**: Each section opens as a desktop application window

##  Tech Stack

- **Frontend**: React 19.2
- **Language**: TypeScript 5.9
- **Build Tool**: Vite 7.3
- **Styling**: CSS3 with custom styling (semantic color/font custom properties in `src/style/`)
- **Email**: EmailJS (`@emailjs/browser`) for the in-app Email application
- **Linting**: ESLint with React hooks + TypeScript-ESLint support

##  Getting Started

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
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint for code quality

## Project Structure

```
src/
├── main.tsx                  # Application entry point — mounts <Desktop />
├── main.css                  # Global reset (box-sizing, full-height html/body)
├── style/                    # Shared design tokens
│   ├── color.css             #   CSS custom properties for all UI colors
│   └── font.css              #   Google Fonts imports + font-family variables
├── types/                    # Shared TypeScript types (skills, sections, vectors)
├── services/                 # Cross-cutting services (e.g. analyticService.ts)
├── components/                # Reusable, feature-agnostic UI building blocks
│   ├── application/          #   Draggable/resizable app window chrome + controls
│   ├── search_bar/            #   Taskbar search input
│   ├── shortcut/               #   Desktop/taskbar icon shortcuts
│   └── projectSections/        #   Shared project-detail rendering pieces (e.g. images)
├── features/                  # Self-contained app "features", each an installable app
│   ├── desktop/                #   Root desktop surface + taskbar composition
│   ├── app_registry/            #   Registers/opens/searches all installable apps
│   ├── about_me/                 #   About Me app (biography, skills)
│   ├── email/                     #   Email app (EmailJS contact form)
│   └── project_showcase/           #   Project Showcase app (categories, project detail views)
└── assets/
    └── projects/                #   Per-project content (information.ts) + media, grouped
                                  #   by category (video_games/, websites/, 3d_models/, etc.)
```

##  Design Philosophy

This portfolio embraces a nostalgic desktop computing aesthetic while maintaining modern web standards. The interface mimics familiar desktop interactions, making navigation intuitive and engaging for visitors exploring my work.

##  Deployment

The project is configured for easy deployment with Vite:

```bash
npm run build
```

The built files will be in the `dist/` directory, ready for deployment to any static hosting service.

##  Contact

Feel free to explore the portfolio and reach out through my email provided in the email app or through my contact information found on my cover letter or resume.
