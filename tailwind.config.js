/**
 * Tailwind configuration for Yakov Yakubov portfolio.
 *
 * The custom theme defines a neutral palette with a warm accent colour, and
 * includes responsive typography scale.  Dark mode is opt‑in via the
 * `dark` class on the `html` element.
 */
module.exports = {
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx}'
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        background: {
          light: '#F9F7F3',
          dark: '#0E0E0E'
        },
        primary: {
          light: '#1C1C1C',
          dark: '#F9F7F3'
        },
        accent: {
          light: '#C47A2C',
          dark: '#F8B562'
        },
        muted: {
          light: '#6E6E6E',
          dark: '#A6A6A6'
        }
      },
      fontFamily: {
        sans: [ 'Inter', 'ui-sans-serif', 'system-ui', 'Arial', 'sans-serif' ],
        serif: [ 'Playfair Display', 'Georgia', 'serif' ]
      },
      spacing: {
        'header': '4rem'
      },
      keyframes: {
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'pulse-bg': {
          '0%, 100%': { opacity: 0.8 },
          '50%': { opacity: 1 },
        }
      },
      animation: {
        'fade-in': 'fade-in 1s ease-out forwards',
        'pulse-bg': 'pulse-bg 4s ease-in-out infinite'
      }
    }
  },
  plugins: [],
};