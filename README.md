# Noesis Parallax Hero

A responsive Next.js hero experience featuring a three-layer parallax scroll inspired by alpine horizons. The hero combines cinematic depth, a sticky adaptive navigation bar, and educational storytelling for the Noesis brand.

## ✨ Highlights

- Multi-layer parallax built with pure React hooks and GPU-accelerated transforms.
- Transparent-to-blurred sticky navigation with desktop and mobile experiences.
- Elegant typography with Instrument Serif for headings and Instrument Sans for supporting copy.
- Responsive layout that preserves the focal point of the foreground climber across devices.

## 🚀 Getting Started

```powershell
echo "Installing dependencies"; npm install
echo "Starting the dev server"; npm run dev
```

Then open [http://localhost:3000](http://localhost:3000) in your browser to explore the hero.

## 📁 Project Structure

```
.
├── components/
│   ├── Hero.jsx            # Parallax hero layers and CTA content
│   └── Navbar.jsx          # Sticky navigation bar with mobile menu
├── pages/
│   ├── _app.js             # Global styles wiring
│   └── index.js            # Home page with hero and supporting sections
├── public/
│   └── images/parallax/    # Hero imagery layers (provided assets)
├── styles/
│   ├── globals.css         # Font imports and design tokens
│   ├── Hero.module.css     # Hero-specific styling
│   ├── Home.module.css     # Page sections and layout
│   └── Navbar.module.css   # Navigation styling
├── next.config.js
└── package.json
```

## 🧪 Quality

- `npm run lint` – Next.js linting rules powered by ESLint.
- Client-side parallax leverages `requestAnimationFrame` for smooth updates.

## 🗺️ Next Steps

- Integrate live content and data sources for the supporting sections.
- Enhance accessibility with skip links and focus outlines tailored to the brand palette.
- Add unit tests for the scroll hooks once stateful logic grows further.
