# 📖 LuminaBooks — Immersive Digital Bookstore

LuminaBooks is a state-of-the-art, immersive digital bookstore crafted with a focus on rich aesthetics, premium micro-animations, and fluid transitions. Designed with a dual-theme system (**Midnight Onyx** and **Warm Alabaster**), it offers users a cinematic browsing and shopping experience for curating rare, physical, and digital volumes.

---

## ✨ Features

- **Immersive 3D Book Preview**: Open and flip pages of any book using realistic 3D transitions built with CSS transforms and Framer Motion.
- **Ambient Audio Narrator Player**: Preview audiobooks with a live audio visualizer bar animation and custom narrations.
- **Interactive Book Matcher**: A personalized matching system that acts as an interactive curator, recommending books tailored to the user's current mood and style.
- **Horizontal Curation Tracks**: Browse collections smoothly with custom horizontal-scroll navigation filters featuring a subtle right-edge fade mask.
- **Fluid Sidebar Architecture**: A modern fixed sidebar layout that adapts dynamically to different viewport sizes, pinning critical navigation, search, and theme controls while allowing collection lists to scroll.
- **Global Theme System**: Toggle between a deep, dark glassmorphism theme (*Midnight Onyx*) and a warm, textured vintage paper theme (*Warm Alabaster*).
- **Responsive Acquisition Cart & Wishlist**: Manage purchases and save volumes to a personal reserved sanctuary drawer.

---

## 🛠️ Technology Stack

- **Core**: React 18, JavaScript (ES6+), HTML5, Vanilla CSS
- **Bundler**: Vite
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Hosting**: Vercel (Optimized static deployment)

---

## 🚀 Getting Started

### Prerequisites

Ensure you have **Node.js** (v18.0.0 or higher) and **npm** installed on your machine.

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/rithu-parna/Book_Store.git
   cd Book_Store
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the development server locally:
   ```bash
   npm run dev
   ```
   Open `http://localhost:5173` in your browser.

4. Build the application for production:
   ```bash
   npm run build
   ```

---

## ☁️ Vercel Deployment

When deploying this project to **Vercel**, ensure the following configurations are set in the Vercel dashboard:

- **Framework Preset**: `Vite`
- **Build Command**: `npm run build` *(Do **not** use `npm run dev` as the build command, as it will run indefinitely and cause the deployment to hang.)*
- **Output Directory**: `dist`
- **Install Command**: `npm install`
