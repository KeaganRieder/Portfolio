# Portfolio Website

A modern, interactive portfolio website built with React and TypeScript, featuring a unique desktop-inspired user interface. This portfolio showcases my work across multiple disciplines including web development, game development, digital art, and 3D modeling.

##  Features

- **Desktop UI Experience**: Navigate through a computer desktop-like interface
- **Project Showcase**: Organized project categories
- **About Me Section**: Personal biography, skills, and artist statement
- **Job Materials**: Direct access to resume and CV
- **Responsive Design**: Optimized for various screen sizes
- **Interactive Applications**: Each section opens as a desktop application window

##  Tech Stack

- **Frontend**: React 19.1.0
- **Language**: TypeScript 5.8.3
- **Build Tool**: Vite 6.3.5
- **Styling**: CSS3 with custom styling
- **Linting**: ESLint with React hooks support

##  Getting Started

### Prerequisites
- Node.js (v14 or higher)
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
├── components/
│   ├── about_me/          # About Me application component
│   ├── application/       # Reusable application window components
│   ├── desktop/          # Desktop interface and taskbar
│   └── projects/         # Project showcase components
├── assets/
│   ├── apps/             # Application icons and UI elements
│   ├── job_mat/          # Resume and CV files
│   ├── main/             # Main UI assets
│   └── projects/         # Project screenshots and media
├── styles/               # CSS styling for all components
└── main.tsx             # Application entry point
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
