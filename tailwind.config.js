module.exports = {
  darkMode: 'class',
  content: [
    './pages/**/*.{js,jsx}',
    './components/**/*.{js,jsx}',
  ],
  theme: {
    extend: {
      colors: {
        // New Premium Color Palette - Emerald + Gold
        primary: '#10b981',      // Emerald
        secondary: '#f59e0b',    // Amber/Gold
        accent: '#14b8a6',       // Teal
        highlight: '#fbbf24',    // Yellow Gold
        dark: {
          900: '#0a0f0d',        // Deep dark green-black
          800: '#111a16',
          700: '#1a2721',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        heading: ['Space Grotesk', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
    },
  },
  plugins: [],
}
