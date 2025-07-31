/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Colores institucionales de Copa Litoral
        'naranja-arcilla': {
          50: '#fef7ed',
          100: '#fdedd5',
          200: '#fad7aa',
          300: '#f6ba74',
          400: '#f0943c',
          500: '#D2691E', // Color principal naranja arcilla
          600: '#c2571a',
          700: '#a14517',
          800: '#823719',
          900: '#6b2f17',
        },
        'azul-marino': {
          50: '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
          800: '#1e40af',
          900: '#000080', // Color principal azul marino
        },
        primary: {
          50: '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
          800: '#1e40af',
          900: '#000080', // Usando azul marino como primary
        },
        secondary: {
          50: '#fef7ed',
          100: '#fdedd5',
          200: '#fad7aa',
          300: '#f6ba74',
          400: '#f0943c',
          500: '#D2691E', // Usando naranja arcilla como secondary
          600: '#c2571a',
          700: '#a14517',
          800: '#823719',
          900: '#6b2f17',
        }
      }
    },
  },
  plugins: [],
}