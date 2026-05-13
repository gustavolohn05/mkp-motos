/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'mkp-black': '#0a0a0a',
        'mkp-dark': '#111111',
        'mkp-card': '#1a1a1a',
        'mkp-border': '#222222',
        'mkp-red': '#cc0000',
        'mkp-red-hover': '#e60000',
        'mkp-muted': '#888888',
      },
      fontFamily: {
        bebas: ['"Bebas Neue"', 'cursive'],
        barlow: ['"Barlow"', 'sans-serif'],
      },
      fontWeight: {
        '300': '300',
        '400': '400',
        '500': '500',
        '600': '600',
        '700': '700',
        '800': '800',
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'spin-slow': 'spin 8s linear infinite',
      },
    },
  },
  plugins: [],
}
