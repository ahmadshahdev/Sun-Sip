/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        abyss: {
          DEFAULT: '#060608',
          deep: '#030304',
          card: '#0c0c0f',
          border: 'rgba(255, 255, 255, 0.08)',
        },
        citrus: {
          orange: '#ff6b00',
          light: '#ff8533',
          glow: 'rgba(255, 107, 0, 0.15)',
        },
        leaf: {
          green: '#10b981',
          light: '#34d399',
          glow: 'rgba(16, 185, 129, 0.15)',
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['Outfit', 'sans-serif'],
      },
      backdropBlur: {
        xs: '2px',
      }
    },
  },
  plugins: [],
}
